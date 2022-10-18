import { useEffect } from "react";
import { Button, Form, Input, Card, notification } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPitchDetailAction } from "../../../../redux/actions/pitch.action";

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
  console.log(pitchDetail, "action");

  useEffect(() => {
    dispatch(getPitchDetailAction({ id: id }));
  }, []);

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
      </S.TopWrapper>
      <S.FormWrapper>
        <Card size="small">
          <Form
            name="createTask"
            layout="vertical"
            initialValues={{
              name: pitchDetail.data?.name,
              title: pitchDetail.data?.title,
              price: pitchDetail.data?.price,
              content: pitchDetail.data?.content,
              date: pitchDetail.data?.date,
            }}
            onFinish={(values, id) => handleUpdatePitch(values, id)}
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
            <Form.Item
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
            </Form.Item>
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
              <Input />
            </Form.Item>

            {/*   <Form.Item name="Upload" label="Upload">
              <input
                type="file"
                name="screenshot"
                  onChange={() => handleChangeImage}
              />
            </Form.Item> */}

            <Button
              type="primary"
              htmlType="submit"
              block
              onClick={() => showNotification("success")}
              loading={pitchDetail.loading}
            >
              Sửa
            </Button>
          </Form>
        </Card>
      </S.FormWrapper>
    </S.Wrapper>
  );
};

export default UpdatePitch;
