import React, { useState } from "react";
import { Button, Drawer } from "antd";

export const DetailUser = (props) => {
  const {
    isOpenModalDetailUser,
    setIsOpenModalDetailUser,
    userDetail,
    setUserDetail,
  } = props;

  // const [open, setOpen] = useState(false);
  // const showDrawer = () => {
  //   isOpenModalDetailUser;
  // };

  // const onClose = () => {
  //   setIsOpenModalDetailUser(false);
  //   setUserDetail(null);
  // };

  return (
    <Drawer
      title="User detail"
      onClose={() => {
        setIsOpenModalDetailUser(false);
        setUserDetail(null);
      }}
      open={isOpenModalDetailUser}
    >
      {userDetail ? (
        <>
          <p>Id: {userDetail._id}</p>
          <p>Full name: {userDetail.fullName}</p>
          <p>Email: {userDetail.email}</p>
          <p>Phone: {userDetail.phone}</p>
        </>
      ) : (
        <>
          <p>Not data</p>
        </>
      )}
    </Drawer>
  );
};
