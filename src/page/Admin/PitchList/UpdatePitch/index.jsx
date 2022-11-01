import { useEffect } from "react";
import { Button, Form, Input, Card, notification } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPitchDetailAction } from "../../../../redux/actions/pitch.action";
import ReactQuill from "react-quill";

import * as S from "./styles";

import "antd/dist/antd.css";
import "react-datepicker/dist/react-datepicker.css";
import "antd-notifications-messages/lib/styles/style.css";

import { updatePitchAction } from "../../../../redux/actions/";

const UpdatePitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pitchDetail } = useSelector((state) => state.product);
  const [updateForm] = Form.useForm();

  useEffect(() => {
    dispatch(getPitchDetailAction({ id: id }));
  }, [id]);
  useEffect(() => {
    if (pitchDetail.data.id) {
      updateForm.resetFields();
    }
  }, [pitchDetail.data]);

  const showNotification = (type) => {
    notification({
      type,
      title: "This is a Title",
      message: `This is a notification type ${type}`,
    });
  };

  const handleUpdatePitch = (values) => {
    dispatch(
      updatePitchAction({
        values: values,
        id: id,
      })
    );
    navigate(-1);
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
            {/*  <Form.Item
              label="Tiêu đề"
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
            </Form.Item> */}
            <Form.Item
              label="Giá"
              name="price"
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
                  console.log(value);
                  updateForm.setFieldsValue({ content: value });
                }}
              />
            </Form.Item>

            {/*   <Form.Item name="Upload" label="Upload">
              <input
                type="file"
                name="screenshot"
                  onChange={() => handleChangeImage}
              />
            </Form.Item> */}
          </Form>
        </Card>
      </S.FormWrapper>
    </S.Wrapper>
  );
};

export default UpdatePitch;
