import Input from "antd/es/input/Input";
import "./user.css";
import { Button } from "antd/es/radio";
import { useState } from "react";
import { notification, Modal } from "antd";
import { createUserApi } from "../../service/apiService";

const UserForm = (props) => {
  const { loadUser } = props;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [isModalOpen, setIsModelOpen] = useState(false);

  const handSubmitBtn = async () => {
    const res = await createUserApi(fullName, email, password, phone);

    if (res.data) {
      notification.success({
        message: "Create user",
        description: "Tạo mới user thành công",
      });
      resetAndCloseModel();
      await loadUser();
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetAndCloseModel = () => {
    setIsModelOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  return (
    <div className="userForm">
      <div className="">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Table Users</h3>
          <Button
            type="primary"
            onClick={() => {
              setIsModelOpen(true);
            }}
          >
            Create user
          </Button>
        </div>
      </div>
      <Modal
        title="Create Users"
        open={isModalOpen}
        onOk={() => {
          handSubmitBtn();
        }}
        onCancel={() => {
          setIsModelOpen(false);
        }}
        maskClosable={false}
      >
        <div className="">
          <span>Full name:</span>
          <Input
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
            type="text"
          />
        </div>
        <div className="">
          <span>Email:</span>
          <Input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="">
          <span>Phone:</span>
          <Input
            value={phone}
            type="text"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
        <div className="">
          <span>Password:</span>
          <Input.Password
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default UserForm;
