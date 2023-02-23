import { toast } from "react-hot-toast";
import { regesterUser } from "./userController";

const handleAddtoCart = async (ele, userDetails, setuserDetails) => {
  let { data } = await regesterUser({
    ...userDetails,
    id: userDetails._id,
    wishlist: [
      ...(userDetails.wishlist || []),
      {
        id: ele._id,
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
  let index = arr.indexOf(item);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}
const handleRemoveFromCart = async (ele, userDetails, setuserDetails) => {
  let updatedUserDetails = {
    ...userDetails,
    wishlist: removeFirstOccurrence(userDetails.wishlist, ele),
    id: userDetails._id,
  };
  let { data } = await regesterUser(updatedUserDetails);
  setuserDetails(data);
  toast.success("Item removed !");
};

function countUnique(arr) {
  const occurrence = new Set();
  const result = [];

  arr.forEach((ele, i) => {
    if (!occurrence.has(ele._id)) {
      occurrence.add(ele._id);
      result.push({ ...ele, count: 1 });
    } else {
      const index = result.findIndex((item) => item._id === ele._id);
      result[index].count += 1;
    }
  });

  return result;
}
export { handleAddtoCart, handleRemoveFromCart, countUnique };
