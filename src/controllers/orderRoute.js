import caller from "../utils/helpFunctions";
let base = "order/";

export const generateOrder = async (orderData) => {
  let url = base + "new";
  let { data } = await caller("post", url, orderData);
  return data;
};

export const getAllUserorders = async (orders) => {
  let url = base + "get-user-orders";
  let { data } = await caller("get", url, { params: { data: orders } });
  return data;
};

export const getAllorders = async (orders) => {
  let url = base + "get-all-orders";
  let { data } = await caller("get", url, {});
  return data;
};
export const updateOrder = async (order) => {
  let url = base + "update-order";
  let { data } = await caller("post", url, { order: order });
  return data;
};
export const deleteOrder = async (id) => {
  let url = base + "delete-order";
  let { data } = await caller("delete", url, {
    data: { id: id },
  });
  return data;
};
