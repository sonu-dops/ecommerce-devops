import API from "./api";

export const placeOrder = async (order) => {
  const res = await API.post("/orders", order);
  return res.data;
};

export const getOrders = async () => {
  const res = await API.get("/orders");
  return res.data.orders;
};

export const getAllOrders = async () => {
  const res = await API.get("/orders/admin");
  return res.data.orders;
};

export const updateOrderStatus = async (id, status) => {
  const res = await API.patch(
    `/orders/${id}/status`,
    { status }
  );

  return res.data.order;
};