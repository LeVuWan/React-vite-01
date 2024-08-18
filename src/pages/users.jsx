import UserTable from "../components/user/userTable";
import UserForm from "../components/user/userForm";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAllUserApi } from "../service/apiService";

const UserPage = () => {
  const [current, setCurrent] = useState([1]);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    loadUser();
  }, [current, pageSize]);

  const loadUser = async () => {
    const res = await fetchAllUserApi(current, pageSize);
    if (res.data) {
      setDataUser(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  console.log("Check pagesize: ", pageSize);

  return (
    <div style={{ padding: "20px" }}>
      <UserForm loadUser={loadUser}></UserForm>
      <UserTable
        dataUser={dataUser}
        loadUser={loadUser}
        pageSize={pageSize}
        current={current}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
        total={total}
      ></UserTable>
    </div>
  );
};
export default UserPage;
