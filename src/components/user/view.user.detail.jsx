import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import {
  handleUploadFile,
  updateUserAvatarAPI,
} from "../../service/apiService";

export const DetailUser = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const {
    isOpenModalDetailUser,
    setIsOpenModalDetailUser,
    userDetail,
    setUserDetail,
    loadUser,
  } = props;

  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateUserAvatar = async () => {
    const resUpload = await handleUploadFile(selectedFile, "avatar");
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded;

      const resUpdateAvatar = await updateUserAvatarAPI(
        newAvatar,
        userDetail._id,
        userDetail.fullName,
        userDetail.phone
      );
      if (resUpdateAvatar.data) {
        setIsOpenModalDetailUser(false);
        setPreview(null);
        setSelectedFile(null);
        loadUser();
        notification.success({
          message: "Update user avatar",
          description: "Cap nhap avatar thanh cong",
        });
      } else {
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(resUpdateAvatar.message),
        });
      }
    } else {
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
    }
  };

  return (
    <Drawer
      width={"40vw"}
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
          <br />
          <p>Avatar:</p>
          <div
            style={{
              margin: "10px",
              height: "104px",
              width: "140px",
              border: "1px solid, #ccc",
            }}
          >
            <img
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                userDetail.avatar
              }`}
            />
          </div>
          <div>
            <label
              htmlFor="btnUpload"
              style={{
                display: "block",
                width: "fit-content",
                marginTop: "15px",
                padding: "5px 10px",
                background: "orange",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Upload Avatar
            </label>
            <input
              type="file"
              hidden
              id="btnUpload"
              onChange={(event) => handleOnChangeFile(event)}
            />
          </div>
          {preview && (
            <>
              <div
                style={{
                  margin: "10px",
                  height: "104px",
                  width: "140px",
                  border: "1px solid, #ccc",
                }}
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={preview}
                />
              </div>
              <Button type="primary" onClick={() => handleUpdateUserAvatar()}>
                Save
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <p>Not data</p>
        </>
      )}
    </Drawer>
  );
};
