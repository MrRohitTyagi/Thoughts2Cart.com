import caller from "../utils/helpFunctions";

export async function getDataforHomeScreen(discount) {
  let {data} = await caller("get", "products/home-page-products", {
    params: { discount: discount },
  });
    console.log('%c data ', 'color: red;border:1px solid red',data);
  return data;
}
