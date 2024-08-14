import UserTable from "../components/user/userTable";
import UserForm from "../components/user/userForm";
import { useState } from "react";
import React, { useEffect } from "react";
import { fetchAllUserApi } from "../service/apiService";

const UserPage = () => {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await fetchAllUserApi();
    setDataUser(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <UserForm loadUser={loadUser}></UserForm>
      <UserTable dataUser={dataUser} loadUser={loadUser}></UserTable>
    </div>
  );
};
export default UserPage;
