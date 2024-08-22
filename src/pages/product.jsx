import { ProductTable } from "../components/product/productTable";
import { ProductForm } from "../components/product/productForm";
import { useEffect, useState } from "react";
import { fetchAllProductApi } from "../service/apiService";

const ProductPage = () => {
  const [current, setCurrent] = useState(1); // Chuyển đổi thành số
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    loadProduct();
  }, [current, pageSize]);

  const loadProduct = async () => {
    try {
      const res = await fetchAllProductApi(current, pageSize);
      if (res.data) {
        setDataProduct(res.data.result);
        setCurrent(res.data.meta.current);
        setPageSize(res.data.meta.pageSize);
        setTotal(res.data.meta.total);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <ProductForm loadProduct={loadProduct} />
      <ProductTable
        loadProduct={loadProduct}
        setDataProduct={setDataProduct}
        dataProduct={dataProduct}
        pageSize={pageSize}
        setPageSize={setPageSize}
        current={current}
        setCurrent={setCurrent}
        total={total}
      />
    </div>
  );
};

export default ProductPage;
