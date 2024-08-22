import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table } from "antd";
import { DetailProduct } from "./viewProductDetail";
import { useState } from "react";
import { UpdateProduct } from "./updateProduct";
import { deleteProductAPI } from "../../service/apiService";

export const ProductTable = (props) => {
  const {
    loadProduct,
    dataProduct,
    pageSize,
    setPageSize,
    current,
    setCurrent,
    total,
  } = props;

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const [isOpenProductDetail, setIsOpenProductDetail] = useState(false);

  const [productDetail, setProductDetail] = useState(null);

  const [dataUpdate, setDataUpdate] = useState(null);

  const onChange = (pagination) => {
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }

    if (pagination && pagination.pageSize) {
      if (pagination.pageSize !== pageSize) {
        setPageSize(pagination.pageSize);
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await deleteProductAPI(id);

      if (res.data) {
        notification.success({
          message: "Delete book",
          description: "Xóa book thành công",
        });
        await loadProduct();
      }
    } catch (error) {
      notification.error({
        message: "Error delete book",
        description:
          error.response?.data?.message || "Xóa sách không thành công",
      });
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "Id",
      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              setIsOpenProductDetail(true);
              setProductDetail(record);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Tiểu sử",
      dataIndex: "mainText",
      key: "mainText",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        if (text)
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text);
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ cursor: "pointer", color: "orange" }}
            onClick={() => {
              setIsModalUpdateOpen(true);
              setDataUpdate(record);
            }}
          />

          <Popconfirm
            title="Xóa book"
            description="Bạn chắc chắn xóa sản phẫm này ?"
            onConfirm={() => handleDeleteProduct(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataProduct}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return `${range[0]}-${range[1]} trên ${total} rows`;
          },
        }}
        onChange={onChange}
      />
      <DetailProduct
        isOpenProductDetail={isOpenProductDetail}
        setIsOpenProductDetail={setIsOpenProductDetail}
        productDetail={productDetail}
        setProductDetail={setProductDetail}
      ></DetailProduct>
      <UpdateProduct
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadProduct={loadProduct}
      ></UpdateProduct>
    </div>
  );
};
