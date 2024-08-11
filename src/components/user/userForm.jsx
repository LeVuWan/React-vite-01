import Input from "antd/es/input/Input";
import "./user.css";
import { Button } from "antd/es/radio";
import { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handClickButton = () => {
    const URL_Backend = "http://localhost:8080/api/v1/user";
    const data = {
      fullName: fullName,
      phone: phone,
      email: email,
      password: password,
    };
    axios.post(URL_Backend, data);
    console.log("Check form: ", { fullName, phone, email, password });
  };

  //   const handOnChange = (value) => {
  //     setFullName(value);
  //   };
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
            onChange={(event) => {
              setPhoneNumber(event.target.value);
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
