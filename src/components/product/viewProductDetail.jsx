import { Drawer } from "antd";

export const DetailProduct = (props) => {
  const { isOpenProductDetail, setIsOpenProductDetail, productDetail } = props;
  const onClose = () => {
    setIsOpenProductDetail(false);
  };

  return (
    <Drawer title="Product detail" onClose={onClose} open={isOpenProductDetail}>
      {productDetail ? (
        <>
          <p>Id: {productDetail._id}</p>
          <p>Tiêu đề: {productDetail._id}</p>
          <p>Tác giả: {productDetail.author}</p>
          <p>Thể loại: {productDetail.category}</p>
          <p>Giá tiền: {productDetail.price}</p>
          <p>Số lượng {productDetail.quantity}</p>
          <p>Đã bán {productDetail.sold}</p>
          <p>Thumbnail: </p>
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
              src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                productDetail.thumbnail
              }`}
            />
          </div>
        </>
      ) : (
        <p>Not data</p>
      )}
    </Drawer>
  );
};
