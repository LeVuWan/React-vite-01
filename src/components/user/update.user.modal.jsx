import { useEffect, useState } from "react";
import { notification, Modal } from "antd";
import Input from "antd/es/input/Input";
import { updateUserAPI } from "../../service/apiService";

export const UpdateUserModal = (props) => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    setDataUpdate,
    dataUpdate,
    loadUser,
  } = props;

  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    console.log("Check data update: ", dataUpdate);
    if (dataUpdate) {
      setId(dataUpdate._id),
        setFullName(dataUpdate.fullName),
        setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handSubmitBtn = async () => {
    const res = await updateUserAPI(id, fullName, phone);

    if (res.data) {
      notification.success({
        message: "Update user",
        description: "Cập nhập user thành công",
      });
      await loadUser();
      resetAndCloseModel();
      //   await loadUser();
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetAndCloseModel = () => {
    setIsModalUpdateOpen(false);
    setFullName("");
    setPhone("");
    setId("");
    setDataUpdate(null);
  };

  return (
    <Modal
      title="Update User"
      open={isModalUpdateOpen}
      onOk={() => {
        handSubmitBtn();
      }}
      onCancel={() => {
        setIsModalUpdateOpen(false);
      }}
      maskClosable={false}
    >
      <div className="">
        <span>Id:</span>
        <Input value={id} type="text" disabled />
      </div>
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
        <span>Phone:</span>
        <Input
          value={phone}
          type="text"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />
      </div>
    </Modal>
  );
};
