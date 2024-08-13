import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { fetchAllUserApi } from "../../service/apiService";
import { useState } from "react";

const UserTable = () => {
  const [dataUser, setDataUser] = useState([
    { _id: "01", fullName: "Quang Vu", email: "A@gamil.com" },
  ]);
  useEffect(() => {
    console.log("Run useEffect 111");
    loadUser();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",

      render: (text) => <a>{text}</a>,
    },
    {
      title: "Full name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  const loadUser = async () => {
    const res = await fetchAllUserApi();
    setDataUser(res.data);
  };
  // loadUser();
  console.log("Run render 000");

  return <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />;
};

export default UserTable;
