import caller from "../utils/helpFunctions";
import axios from "axios";

export const getAllProducts = async (params) => {
  let data = await caller("get", "products/all", null);
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
  axios.get("https://fakestoreapi.com/products").then(({ data }) => {
    data.forEach((ele) => {
      createNewProduct({
        title: ele.title,
        id: "",
        description: ele.description,
        price: ele.price,
        rating: ele.rating.rate,
        category: ele.category,
        images: [ele.image, ele.image, ele.image],
        stock: ele.rating.count - 20,
        numberOfReviews: ele.rating.count,
      });
    });
  });
};
// add20products()
