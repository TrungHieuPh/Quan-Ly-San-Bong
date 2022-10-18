import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Card,
  notification,
  DatePicker,
  Upload,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import "antd/dist/antd.css";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles";
import "antd-notifications-messages/lib/styles/style.css";

import { createPitchAction } from "../../../../redux/actions";

const CreatePitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /* const { RangePicker } = DatePicker; */

  const dateFormat = "YYYY-MM-DD";
  const today = new Date();
  console.log(today, "today");
  const handleCreatePitch = (values) => {
    dispatch(
      createPitchAction({
        values: values,
      })
    );
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

  const handleChangeImage = (e) => {
    const file = e.target.files;
    const data = new FormData();
    data.append("file", file[0]);
    data.append("upload", "darwin");
    file.preview = URL.createObjectURL(file);
    console.log(URL.createObjectURL(file));
  };
  /*  */
  return (
    <S.Wrapper>
      <S.TopWrapper>
        <h3>Tạo Mới Sân</h3>
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
              content: "",
              date: moment(today, dateFormat),
            }}
            onFinish={(values) => handleCreatePitch(values)}
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
              label="Tiêu đề Sân"
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
              label="Nội dung Sân"
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

            <Form.Item label="Ngày Tạo" name="date">
              <DatePicker defaultValue={moment(today, dateFormat)} />
            </Form.Item>
            <Form.Item name="Upload" label="Upload">
              <input
                type="file"
                name="screenshot"
                onChange={() => handleChangeImage}
              />
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
