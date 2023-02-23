import { toast } from "react-hot-toast";
import { regesterUser } from "./userController";

const handleAddtoCart = async (ele, userDetails, setuserDetails) => {
  if (!userDetails._id) {
    toast.error("Sign Up required !");
    return;
  }
  let productId = ele._id ? ele._id : ele.id;
  let { data } = await regesterUser({
    ...userDetails,
    id: userDetails._id,
    wishlist: [
      ...(userDetails.wishlist || []),
      {
        id: productId,
        description: ele.description,
        discount: ele.discount,
        images: [ele.images[0]],
        numberOfReviews: ele.numberOfReviews,
        price: ele.price,
        rating: ele.rating,
      },
    ],
  });
  setuserDetails(data);
  toast.success("Item Added to cart !");
};

function removeFirstOccurrence(arr, item) {
  let uid = item.id;
  let newArr = [];
  for (const ele of arr) {
    if (ele.id !== uid) {
      newArr.push(ele);
    } else {
      uid = null;
    }
  }
  return newArr;
}
const handleRemoveFromCart = async (ele, userDetails, setuserDetails) => {
  if (!userDetails._id) {
    toast.error("Sign Up required !");
    return;
  }
  let updatedUserDetails = {
    ...userDetails,
    wishlist: removeFirstOccurrence(userDetails.wishlist, ele),
    id: userDetails._id,
  };
  console.log(updatedUserDetails);
  let { data } = await regesterUser(updatedUserDetails);
  setuserDetails(data);
  toast.success("Item removed !");
};

function countUnique(arr) {
  const occurrence = new Set();
  const result = [];

  arr.forEach((ele, i) => {
    if (!occurrence.has(ele.id)) {
      occurrence.add(ele.id);
      result.push({ ...ele, count: 1 });
    } else {
      const index = result.findIndex((item) => item.id === ele.id);
      result[index].count += 1;
    }
  });
  return result;
}
export { handleAddtoCart, handleRemoveFromCart, countUnique };
