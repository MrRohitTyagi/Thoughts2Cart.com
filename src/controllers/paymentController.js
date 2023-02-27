import caller from "../utils/helpFunctions";
let base = "payment/";

export const processpayment = async (paymentData) => {
  let url = base + "payment-session";
  let data = await caller("post", url, paymentData);
  return data;
};
