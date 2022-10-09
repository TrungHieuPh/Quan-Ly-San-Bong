import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Input, Card, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles";
import "antd-notifications-messages/lib/styles/style.css";

import { createPitchAction } from "../../../redux/actions";

const CreatePitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());

  const handleCreatePitch = (values) => {
    dispatch(createPitchAction({ values: values }));
  };
  const { createPitchData } = useSelector((state) => state.product);
  /* Notifi */
  const show = (type) => {
    notification({
      type,
      title: "This is a Title",
      message: `This is a notification type ${type}`,
    });
  };

  return (
    <S.Wrapper>
      <S.TopWrapper>
        <h3>Create Task</h3>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </S.TopWrapper>
      <S.FormWrapper>
        <Card size="small">
          <Form
            name="createTask"
            layout="vertical"
            initialValues={{
              name: "",
              title: "",
              price: "",
              adress: "",
              content: "",
              date: "",
            }}
            onFinish={(values) => handleCreatePitch(values)}
          >
            <Form.Item
              label="San"
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
              label="Title"
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
              label="gia"
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
              label="dia chi"
              name="adress"
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
              label="noi dung san"
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
            <Form.Item label="Ngay Tao san" name="date">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                value={startDate}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              onClick={() => show("success")}
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
