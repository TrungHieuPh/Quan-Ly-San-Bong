import { useState, useEffect } from "react";
import { Button, Form, Input, Card, notification, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import "antd/dist/antd.css";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles";
import "antd-notifications-messages/lib/styles/style.css";

import { createPitchAction } from "../../../../redux/actions";

const CreatePitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());

  const handleCreatePitch = (values) => {
    dispatch(createPitchAction({ values: values }));
    navigate(-1);
  };
  const { createPitchData } = useSelector((state) => state.product);
  /* Notifi */
  const showNotification = (type) => {
    notification({
      type,
      title: "This is a Title",
      message: `This is a notification type ${type}`,
    });
  };

  /* upload image */
  /*  var someDate = new Date();
  var date = someDate.getDate(); */
  /*  var date = someDate.getDate(someDate.getDate()); */
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
              address: "",
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
            {/* <Form.Item
              label="Ngay Tao san"
              name="date"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Required!",
                },
              ]}
            >
              <input
                id="dateRequired"
                type="hidden"
                name="dateRequired"
                defaultValue={date}
              />
            </Form.Item> */}
            <Form.Item name="Upload" label="Upload">
              <Input type="file" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              onClick={() => showNotification("success")}
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
