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
import { PlusOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import slug from "slug";

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

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCreatePitch = async (values) => {
    const { images, ...pitchValues } = values;
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      console.log(imgBase64, "aaa");
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
        images: newImages,
      })
    );
    navigate(-1);
  };
  const { createPitchData } = useSelector((state) => state.product);
  /* Notifi */

  /* upload image */

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
              price: undefined,
              content: "",
              date: moment(today, dateFormat),
              images: [],
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
