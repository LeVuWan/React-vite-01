import { Table, message, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { UpdateUserModal } from "./update.user.modal";
import { useEffect, useState } from "react";
import { DetailUser } from "./view.user.detail";
import { deleteUserAPI } from "../../service/apiService";

const UserTable = (props) => {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isOpenModalDetailUser, setIsOpenModalDetailUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [userDetail, setUserDetail] = useState(null);

  const { dataUser, loadUser } = props;

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",

      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              // alert("Click me");
              setUserDetail(record);
              setIsOpenModalDetailUser(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Full name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            style={{ cursor: "pointer", color: "orange" }}
            onClick={() => {
              console.log("Check: ", record);
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
          />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => confirm(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => {
                console.log("Check");
              }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  // loadUser();

  // console.log("check: ", isOpenModalDetailUser);

  const confirm = async (record) => {
    try {
      await deleteUserAPI(record._id);
      message.success("User deleted successfully");
      loadUser();
    } catch (error) {
      message.error("Failed to delete user");
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  return (
    <>
      <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
      <UpdateUserModal
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        loadUser={loadUser}
      />
      <DetailUser
        userDetail={userDetail}
        isOpenModalDetailUser={isOpenModalDetailUser}
        setIsOpenModalDetailUser={setIsOpenModalDetailUser}
        setUserDetail={setUserDetail}
      />
    </>
  );
};

export default UserTable;
