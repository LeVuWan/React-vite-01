import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateProductAPI } from "../../service/apiService";

export const UpdateProduct = (props) => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadProduct,
  } = props;

  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id),
        setMainText(dataUpdate.mainText),
        setAuthor(dataUpdate.author);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCategory(dataUpdate.category);
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdate.thumbnail
        }`
      );
    }
  }, [dataUpdate]);

  const updateProduct = async (newThumbnail) => {
    const res = await updateProductAPI(
      id,
      newThumbnail,
      mainText,
      author,
      price,
      quantity,
      category
    );
    if (res.data) {
      resetAndCloseModal();
      await loadProduct;
      notification.success({
        message: "Update product",
        description: "Cập nhập sản phẩm thành công",
      });
    } else {
      notification.error({
        message: "Error update product",
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
    setSelectedFile(null);
    setPreview(null);
    setId("");
    setDataUpdate(null);
    setIsModalUpdateOpen(false);
  };

  const handleOk = async () => {
    if (!selectedFile && !preview) {
      notification.error({
        message: "Error update product",
        description: "Vui lòng upload thumbnail",
      });
      return;
    }
    let newThumbnail = "";

    if (!selectedFile && preview) {
      newThumbnail = dataUpdate.thumbnail;
    } else {
      const resUpload = await handleUploadFile(selectedFile, "book");
      if (resUpload.data) {
        newThumbnail = resUpload.data.fileUploaded;
      } else {
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(resUpload.message),
        });
        return;
      }
    }
    await updateProduct(newThumbnail);
    await loadProduct();
  };
  const handleCancel = () => {
    setIsModalUpdateOpen(false);
  };
  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalUpdateOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Update product"}
      >
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <div>
            <span>Id</span>
            <Input value={id} disabled />
          </div>
          <div>
            <span>Tiêu đề</span>
            <Input
              value={mainText}
              onChange={(event) => {
                setMainText(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Tác giả</span>
            <Input
              value={author}
              onChange={(event) => {
                setAuthor(event.target.value);
              }}
            />
          </div>
          <div>
            <div>Giá tiền</div>
            <InputNumber
              style={{ width: "100%" }}
              addonAfter={" đ"}
              value={price}
              onChange={(event) => {
                setPrice(event);
              }}
            />
          </div>
          <div>
            <div>Số lượng</div>
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
        </div>
      </Modal>
    </>
  );
};
