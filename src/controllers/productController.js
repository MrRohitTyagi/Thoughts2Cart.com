import caller from "../utils/helpFunctions";
import axios from "axios";
import { data } from "./sampledata";

export const getAllProducts = async (params) => {
  let data = await caller("get", "products/all", null);
  return data;
};
export const getSingleProduct = async (id) => {
  let data = await caller("get", `products/GetDetails/${id}`, null);
  return data;
};
export const getCategorisedProducts = async (params, page = 1) => {
  let data = await caller(
    "get",
    `products/category/${params}?page=${page}`,
    null
  );
  return data;
};
export const deletProduct = async (id) => {
  let data = await caller("delete", `products/delete`, {
    data: { id: id },
  });
  return data;
};

export const createNewProduct = async ({
  title,
  id,
  description,
  price,
  rating,
  images,
  category,
  stock,
  numberOfReviews,
  offers,
  discount,
  deliveryTime,
  warranty,
}) => {
  let data = await caller("post", "products/new", {
    id,
    title,
    description,
    price,
    rating,
    images: images || [],
    category,
    stock,
    numberOfReviews,
    offers,
    discount,
    deliveryTime,
    warranty,
  });
  return data;
};
const add20products = () => {
  try {
    data.forEach((ele) => {
      createNewProduct({
        title: ele.product_title.slice(0, 20),
        category: "mobiles",
        description: ele.product_title,
        price: Math.ceil(Number(ele?.product_price?.replace("$", ""))) || 850,
        rating: ele?.product_star_rating || 3,
        images: [ele.product_photo, ele.product_photo, ele.product_photo],
        stock: ele.product_num_offers || 5,
        discount: Math.floor(Math.random() * 50) || 15,
        offers: "",
        deliveryTime: Math.floor(Math.random() * 10) || 1,
        numberOfReviews: Math.floor(Math.random() * 100) || 50,
        warranty: 1,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
// add20products();
