import Input from "antd/es/input/Input";
import "./user.css";
import { Button } from "antd/es/radio";
import { useState } from "react";
import { notification } from "antd";
import { createUserApi } from "../../service/apiService";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handClickButton = async () => {
    const res = await createUserApi(fullName, email, password, phone);

    if (res.data) {
      notification.success({
        message: "Create user",
        description: "Tạo mới user thành công",
      });
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify(res.message),
      });
    }
    console.log("Check res: ", res.data);
  };

  return (
    <div className="userForm">
      <div className="">
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

        <div>
          <Button type="primary" onClick={handClickButton}>
            Create user
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
