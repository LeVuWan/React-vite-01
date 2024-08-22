import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createProductApi, handleUploadFile } from "../../service/apiService";

export const ProductForm = (props) => {
  const { loadProduct } = props;

  const [isOpenModal, setIsModelOpen] = useState(false);

  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleOk = async () => {
    if (!selectedFile) {
      notification.error({
        message: "Error create product",
        description: "Vui lòng upload thumbnail",
      });
      return;
    }

    // Assume `handleUploadFile` returns the entire response object
    const uploadResponse = await handleUploadFile(selectedFile, "book");

    // Extract the file name or URL from the response
    const newThumbnail = uploadResponse.data.fileUploaded; // Only send the file name or URL

    // Call the API to create the product with the correct thumbnail value
    const res = await createProductApi(
      newThumbnail, // Ensure this is a string
      mainText,
      author,
      price,
      quantity,
      category
    );

    if (res.data) {
      resetAndCloseModal();
      await loadProduct();
      notification.success({
        message: "Create product",
        description: "Tạo mới sản phẩm thành công",
      });
    } else {
      notification.error({
        message: "Error create product",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetAndCloseModal = () => {
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setPreview("");
    setSelectedFile("");
    setIsModelOpen(false);
  };

  const handleCancel = () => {
    setIsModelOpen(false);
  };

  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="userForm">
      <div className="">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Table Product</h3>
          <Button
            type="primary"
            onClick={() => {
              setIsModelOpen(true);
            }}
          >
            Create product
          </Button>
          <Modal
            title="Create product"
            open={isOpenModal}
            onOk={handleOk}
            okText={"Create"}
            onCancel={handleCancel}
          >
            <div className="">
              <span>Tiêu đề </span>
              <Input
                value={mainText}
                onChange={(event) => {
                  setMainText(event.target.value);
                }}
                type="text"
              />
            </div>
            <div className="">
              <span>Tác giả</span>
              <Input
                value={author}
                onChange={(event) => {
                  setAuthor(event.target.value);
                }}
                type="text"
              />
            </div>
            <div className="">
              <span>Giá </span>
              <InputNumber
                style={{ width: "100%" }}
                value={price}
                addonAfter={"đ"}
                onChange={(event) => {
                  setPrice(event);
                }}
              />
            </div>
            <div className="">
              <span>Số lượng </span>
              <InputNumber
                style={{ width: "100%" }}
                value={quantity}
                onChange={(event) => {
                  setQuantity(event);
                }}
              />
            </div>
            <div>
              <div>Thể loại</div>
              <Select
                style={{ width: "100%" }}
                value={category}
                onChange={(value) => {
                  setCategory(value);
                }}
                options={[
                  { value: "Arts", label: "Arts" },
                  { value: "Business", label: "Business" },
                  { value: "Comics", label: "Comics" },
                  { value: "Cooking", label: "Cooking" },
                  { value: "Entertainment", label: "Entertainment" },
                  { value: "History", label: "History" },
                  { value: "Music", label: "Music" },
                  { value: "Sports", label: "Sports" },
                  { value: "Teen", label: "Teen" },
                  { value: "Travel", label: "Travel" },
                ]}
              />
            </div>
            <div>
              <div>Ảnh thumbnail</div>
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
                  Upload
                </label>
                <input
                  type="file"
                  hidden
                  id="btnUpload"
                  onChange={(event) => handleOnChangeFile(event)}
                  onClick={(event) => (event.target.value = null)}
                />
              </div>
              {preview && (
                <>
                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "15px",
                      height: "100px",
                      width: "150px",
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
                </>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
