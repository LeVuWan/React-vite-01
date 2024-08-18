// import "./header.css";
import { Link } from "react-router-dom";
import { UserOutlined, MailOutlined, ProductOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";

const Header = () => {
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <MailOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "user",
      icon: <UserOutlined />,
    },
    {
      label: <Link to={"/products"}>Product</Link>,
      key: "Product",
      icon: <ProductOutlined />,
    },
  ];

  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
