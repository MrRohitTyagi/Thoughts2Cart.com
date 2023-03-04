import caller from "../utils/helpFunctions";

export async function getDataforHomeScreen(discount) {
  return await caller("get", "products/home-page-products", {
    params: { discount: discount },
  });
}
