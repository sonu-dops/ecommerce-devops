import API from "./api";

export const getProducts = async () => {
  const res = await API.get("/products");
  return res.data.products;
};

export const addProduct = async (product) => {
  const res = await API.post("/products", product);
  return res.data.product;
};

export const getProduct = async (id) => {
    const res = await API.get(`/products/${id}`);
    return res.data.product;
};