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
