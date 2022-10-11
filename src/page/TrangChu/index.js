import { Space, Card, Button, Descriptions, Table, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "../TrangChu/style.module.css";
import video from "../../videobg.mp4";
import gif from "../../Images/gif2.gif";
import checklist from "../../Images/checklist.gif";
import { getPitchListAction } from "../../redux/actions/";

function TrangChu() {
  const { pitch } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPitchListAction());
  }, []);

  /* ================================ */
  const columns = [
    {
      title: "Tên Sân",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Tiêu đề ",
      dataIndex: "title",
      defaultSortOrder: "descend",
    },

    {
      title: "Giá tiền",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Địa chỉ",
      dataIndex: "adress",
      filters: [],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Chọn",
      dataIndex: "operation",

      /* onClick: () => navigate(`/datsan/${id}/setPitch`), */
    },
  ];

  const onChange = (filters, sorter, extra) => {
    console.log("params", filters, sorter, extra);
  };
  /* ================================= */
  /* const renderPitch = () => {
    if (pitch.loading) return <div>Loading...</div>;
    return pitch.data.map((item, index) => {
      return (
        <Card>
          <Button
            type="link"
            onClick={() => navigate(`/datsan/${item.id}/setPitch`)}
            block
            primary
          >
            {item.name}
          </Button>
          <Descriptions.Item label="Ngày đăng: ">{item.date}</Descriptions.Item>
          <Descriptions.Item label="Địa điểm: ">
            {item.adress}
          </Descriptions.Item>
        </Card>
      );
    });
  }; */
  const [current, setCurrent] = useState(3);

  return (
    <div className="wrapper">
      <div id="banner">
        <div className={styles.main}>
          <a href="/datsan" className={styles.gifs}>
            <img src={gif} title="Đặt"></img>
            <h3>Đặt Sân Ngay</h3>
          </a>
          <video src={video} autoPlay loop muted></video>
        </div>
      </div>
      <div className={styles.content}>
        <div className="main">
          <div className={styles.contentCenter}>
            <div className={styles.titlePitch}>
              <img src={checklist} className={styles.imgList} />
              <h2>Danh sách Sân</h2>
            </div>
          </div>
          {/* 
          <div className="right">
            <h2>right</h2>
          </div> */}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={pitch.data}
        onChange={onChange}
        pagination={false}
      />
    </div>
  );
}
export default TrangChu;
