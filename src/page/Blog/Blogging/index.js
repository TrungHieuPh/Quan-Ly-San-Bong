import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { Form, Input, Upload, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";

import { createBlogAction } from "../../../redux/actions";

import * as S from "../style";

const Blogging = () => {
  const [updateForm] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCreateBlog = async (values) => {
    const { images, ...blogValues } = values;
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
      createBlogAction({
        values: { ...blogValues },
        images: newImages,
        userId: userInfo.data.id,
      })
    );
    navigate(-1);
  };

  return (
    <S.Wrapper>
      <S.TopWrapper>
        <h1>Viết Blog</h1>
        <Button type="primary" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </S.TopWrapper>
      <Form onFinish={(values) => handleCreateBlog(values)}>
        <Form.Item
          label="Tiêu đề Blog"
          name="title"
          rules={[
            {
              required: true,
              message: "Chưa nhập tiêu đề!",
            },
            { max: 255, message: "Bạn đã nhập quá số ký tự!" },
          ]}
        >
          <Input />
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
        <Form.Item
          label="Nội dung sân"
          name="content"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Chưa nhập nội dung!",
            },
            {
              min: 10,
              message: "Bạn chưa nhập đủ số ký tự bắt buộc!",
            },
            {
              max: 2500,
              message: "Bạn đã nhập quá số ký tự!",
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
        <Button danger block htmlType="submit">
          Tạo Bài Viết
        </Button>
      </Form>
    </S.Wrapper>
  );
};

export default Blogging;
