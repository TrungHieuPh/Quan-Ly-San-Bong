import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Route } from "antd";

function Breadcrumbs() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="">
        <UserOutlined />
        <span>Application List</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Application</Breadcrumb.Item>
    </Breadcrumb>
  );
}
export default Breadcrumbs;
