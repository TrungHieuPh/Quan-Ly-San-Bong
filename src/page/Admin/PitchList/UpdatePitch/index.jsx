import { useEffect, useMemo } from "react";
import {
  Button,
  Form,
  Input,
  Card,
  notification,
  InputNumber,
  Space,
  Upload,
  Select,
  TimePicker,
} from "antd";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPitchDetailAction } from "../../../../redux/actions/pitch.action";
import ReactQuill from "react-quill";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

import * as S from "./styles";

import "antd/dist/antd.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "antd-notifications-messages/lib/styles/style.css";
import {
  convertBase64ToImage,
  convertImageToBase64,
} from "../../../../utils/file";
import {
  updatePitchAction,
  getTeamListAction,
  getTimeShootListAction,
} from "../../../../redux/actions/";

const UpdatePitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pitchDetail } = useSelector((state) => state.product);
  const { teamList } = useSelector((state) => state.team);
  const { timeShootList } = useSelector((state) => state.timeShoot);

  const [updateForm] = Form.useForm();

  useEffect(() => {
    dispatch(getPitchDetailAction({ id: id }));
    dispatch(getTeamListAction({}));
    dispatch(getTimeShootListAction({ id: id }));
  }, [id]);
  useEffect(() => {
    if (pitchDetail.data.id) {
      updateForm.resetFields();
      setImagesField(pitchDetail.data.images);
    }
  }, [pitchDetail.data]);

  const setImagesField = async (images) => {
    const newImages = [];

    for (let i = 0; i < images.length; i++) {
      const imageFile = await convertBase64ToImage(
        images[i].url,
        images[i].name,
        images[i].type
      );
      await newImages.push({
        id: images[i].id,
        lastModified: imageFile.lastModified,
        lastModifiedDate: imageFile.lastModifiedDate,
        name: imageFile.name,
        size: imageFile.size,
        type: imageFile.type,
        thumbUrl: images[i].thumbUrl,
        originFileObj: imageFile,
      });
    }
    await updateForm.setFieldValue("images", newImages);
  };
  const renderTeamOptions = useMemo(() => {
    return teamList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [teamList.data]);
  const renderPitchOptions = useMemo(() => {
    return timeShootList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [timeShootList.data]);
  /*   const handleUpdatePitch = (values) => {
    dispatch(
      updatePitchAction({
        values: values,
        id: id,
      })
    );
    navigate(-1);
  }; */
  const handleUpdatePitch = async (values) => {
    const { options, images, ...productValues } = values;
    console.log(
      "🚀 ~ file: index.jsx ~ line 114 ~ handleUpdateProduct ~ images",
      images
    );
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      await newImages.push({
        ...(images[i].id && { id: images[i].id }),
        name: images[i].name,
        type: images[i].type,
        thumbUrl: images[i].thumbUrl,
        url: imgBase64,
      });
    }
    console.log(
      "🚀 ~ file: index.jsx ~ line 108 ~ handleUpdateProduct ~ newImages",
      newImages
    );
    dispatch(
      updatePitchAction({
        id: id,
        values: productValues,
        options: options,
        initialOptionIds: pitchDetail.data.times.map((item) => item.id),
        images: newImages,
        initialImageIds: pitchDetail.data.images.map((item) => item.id),
        /*  callback: {
         goToList: () => navigate(ROUTES.ADMIN.PRODUCT_LIST),
       }, */
      })
    );
    /*   console.log(values, "await"); */
  };
  return (
    <S.Wrapper>
      <S.TopWrapper>
        <h1>Sửa sân</h1>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button
          type="primary"
          htmlType="submit"
          block
          onClick={() => updateForm.submit()}
          loading={pitchDetail.loading}
        >
          Sửa
        </Button>
      </S.TopWrapper>
      <S.FormWrapper>
        <Card size="small">
          <Form
            form={updateForm}
            name="createTask"
            layout="vertical"
            initialValues={{
              name: pitchDetail.data?.name,
              price: pitchDetail.data?.price,
              content: pitchDetail.data?.content,
              date: pitchDetail.data?.date,
              teamId: pitchDetail.data?.teamId,
              /*   options: pitchDetail.data?.times, */
            }}
            onFinish={(values) => handleUpdatePitch(values)}
          >
            <Form.Item
              label="Tên Sân"
              name="name"
              validateFirst
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Required!",
                },
                {
                  type: "string",
                  min: 4,
                  message: "Min is 4!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Lựa chọn sân" name="teamId">
              <Select>{renderTeamOptions}</Select>
            </Form.Item>
            <Space>
              <Form.Item label="Giá" name="price">
                <InputNumber
                  formatter={(value) =>
                    value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  style={{ width: 200 }}
                />
              </Form.Item>
              <span>VND</span>
            </Space>
            <Form.Item label="Thêm khung Giờ">
              <Form.List name="options">
                {(fields, callback) => (
                  <>
                    {fields.map((field) => {
                      return (
                        <Card
                          key={`card-${field.key}`}
                          size="small"
                          style={{ marginBottom: 16 }}
                        >
                          <Form.Item
                            {...field}
                            label="Tên khung giờ"
                            name={[field.name, "name"]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            label="Khung thời gian bắt đầu"
                            name={[field.name, "timestart"]}
                          >
                            <TimePicker
                              minuteStep={30}
                              secondStep={60}
                              defaultValue={moment()}
                            />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            label="Khung thời gian kết thúc"
                            name={[field.name, "timeend"]}
                          >
                            <TimePicker minuteStep={30} secondStep={60} />
                          </Form.Item>

                          <Button
                            ghost
                            danger
                            onClick={() => callback.remove(field.name)}
                          >
                            Xóa
                          </Button>
                        </Card>
                      );
                    })}
                    <Button
                      type="dashed"
                      block
                      icon={<PlusOutlined />}
                      onClick={() => callback.add()}
                    >
                      Thêm
                    </Button>
                  </>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item
              label="Hình ảnh sân"
              name="images"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) return e;
                return e?.fileList;
              }}
            >
              <Upload listType="picture-card" beforeUpload={Upload.LIST_IGNORE}>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Nội dung sân"
              name="content"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Required!",
                },
              ]}
            >
              <ReactQuill
                theme="snow"
                onChange={(value) => {
                  updateForm.setFieldsValue({ content: value });
                }}
              />
            </Form.Item>
          </Form>
        </Card>
      </S.FormWrapper>
    </S.Wrapper>
  );
};

export default UpdatePitch;
