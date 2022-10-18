import { Table, Button, Space, Pagination, Avatar, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate, generatePath } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

import { ADMIN_TABLE_LIMIT } from "../../../constants/paginations";
import * as S from "./styles";
import { getPitchListAction, deletePitchAction } from "../../../redux/actions";
import pitchReducers from "../../../redux/reducers/pitch.reducer";
import { ROUTES } from "../../../constants/routers";

function AdminPitchList() {
  const { pitch } = useSelector((state) => state.product);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPitchListAction({
        params: {
          page: 1,
          limit: ADMIN_TABLE_LIMIT,
        },
      })
    );
  }, []);

  const handleChangePage = (page) => {
    dispatch(
      getPitchListAction({
        params: {
          page: page,
          limit: ADMIN_TABLE_LIMIT,
        },
      })
    );
  };

  const tableColumn = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <Space>
            <Avatar />
            <h3>{record.name}</h3>
          </Space>
        );
      },
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${parseInt(price).toLocaleString()} VND`,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
    
    },
    {
      title: "Chức năng",
      dataIndex: "id",
      key: "action",
      render: (id) => {
        return (
          <Space>
            <Link to={generatePath(ROUTES.ADMIN.UPDATE_PITCH, { id: id })}>
              Update
            </Link>
            <Popconfirm
              title="Bạn có chắc muốn xóa sản phẩm này không?"
              onConfirm={() => dispatch(deletePitchAction({ id: id }))}
              okText="Có"
              cancelText="Không"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
          /* pitch.data.map((item, index) => {
            return (
              <Link
                to={generatePath(ROUTES.ADMIN.UPDATE_PITCH, { id: item.id })}
              >
                Update
              </Link>
            );
          }) */
        );
      },
    },
  ];

  const tableData = pitch.data.map((item) => ({ ...item, key: item.id }));
  return (
    <S.Wrapper>
      <S.TopWrapper>
        <h3>Danh sách Sân</h3>
        <Button type="primary" onClick={() => navigate(`/pitch/createpitch`)}>
          Thêm mới
        </Button>
      </S.TopWrapper>
      <Table
        columns={tableColumn}
        dataSource={tableData}
        pagination={false}
        style={{ flex: 1 }}
      />
      <Pagination
        current={pitch.meta.page}
        pageSize={ADMIN_TABLE_LIMIT}
        total={pitch.meta.total}
        onChange={(page) => handleChangePage(page)}
        style={{ margin: "16px auto 0" }}
      />
    </S.Wrapper>
  );
}
export default AdminPitchList;
