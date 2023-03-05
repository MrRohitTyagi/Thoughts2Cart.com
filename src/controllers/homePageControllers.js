import caller from "../utils/helpFunctions";

export async function getDataforHomeScreen(discount) {
  let {data} = await caller("get", "products/home-page-products", {
    params: { discount: discount },
  });
  return data;
}
