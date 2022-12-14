import { useState, useEffect, useMemo } from "react";
import {
  Button,
  Form,
  Input,
  Card,
  Space,
  DatePicker,
  Upload,
  Select,
  InputNumber,
  TimePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import slug from "slug";

import "antd/dist/antd.min.css";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles";
import "antd-notifications-messages/lib/styles/style.css";

import {
  createPitchAction,
  getPitchDetailAction,
  getTeamListAction,
} from "../../../../redux/actions";

const CreatePitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /* const { RangePicker } = DatePicker; */
  const { pitchDetail } = useSelector((state) => state.product);
  const { teamList } = useSelector((state) => state.team);
  const { createPitchData } = useSelector((state) => state.product);
  const dateFormat = "YYYY-MM-DD";
  const today = new Date();

  useEffect(() => {
    dispatch(getTeamListAction());
  }, []);
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCreatePitch = async (values) => {
    const { images, options, ...pitchValues } = values;
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      await newImages.push({
        name: images[i].name,
        type: images[i].type,
        thumbUrl: images[i].thumbUrl,
        url: imgBase64,
      });
    }
    await dispatch(
      createPitchAction({
        values: {
          ...pitchValues,
          slug: slug(pitchValues.name),
        },
        options: options,
        images: newImages,
      })
    );
    navigate(-1);
    console.log(moment.utc());
    console.log(images, "aaaa");
  };

  const renderTeamList = useMemo(() => {
    return teamList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [teamList.data]);

  return (
    <S.Wrapper>
      <S.TopWrapper>
        <h3>T???o M???i S??n</h3>
        <Button onClick={() => navigate(-1)}>Quay l???i</Button>
      </S.TopWrapper>
      <S.FormWrapper>
        <Card size="small">
          <Form
            name="createTask"
            layout="vertical"
            initialValues={{
              name: "",
              title: "",
              price: undefined,
              content: "",
              date: moment(today, dateFormat),
              images: [],
            }}
            onFinish={(values) => handleCreatePitch(values)}
          >
            <Form.Item
              label="T??n S??n"
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
            <Form.Item
              label="Ti??u ????? S??n"
              name="title"
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
            <Form.Item
              label="N???i dung S??n"
              name="content"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Space>
              <Form.Item
                label="Gi??"
                name="price"
                rules={[
                  {
                    required: true,
                    /*  whitespace: true, */
                    message: "Required!",
                  },
                ]}
              >
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
            <Form.Item
              label="?????a ch??? S??n"
              name="address"
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

            <Form.Item label="L???a ch???n s??n" name="teamId">
              <Select>{renderTeamList}</Select>
            </Form.Item>
            <Form.Item label="Khung gi???">
              <Form.List name="options">
                {(fields, callback) => (
                  <>
                    {fields.map((field) => (
                      <Card
                        key={field.key}
                        size="small"
                        style={{ marginBottom: 16 }}
                      >
                        <Form.Item
                          {...field}
                          label="T??n khung gi???"
                          name={[field.name, "name"]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          label="Khung th???i gian b???t ?????u"
                          name={[field.name, "timestart"]}
                        >
                          <TimePicker minuteStep={30} secondStep={60} />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="Khung th???i gian k???t th??c"
                          name={[field.name, "timeend"]}
                        >
                          <TimePicker minuteStep={30} secondStep={60} />
                        </Form.Item>

                        <Button
                          ghost
                          danger
                          onClick={() => callback.remove(field.name)}
                        >
                          X??a
                        </Button>
                      </Card>
                    ))}
                    <Button
                      type="dashed"
                      block
                      icon={<PlusOutlined />}
                      onClick={() => callback.add()}
                    >
                      Th??m Khung gi???!
                    </Button>
                  </>
                )}
              </Form.List>
            </Form.Item>

            <Form.Item
              label="images"
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
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={createPitchData.loading}
            >
              Them San
            </Button>
          </Form>
        </Card>
      </S.FormWrapper>
    </S.Wrapper>
  );
};

export default CreatePitch;
