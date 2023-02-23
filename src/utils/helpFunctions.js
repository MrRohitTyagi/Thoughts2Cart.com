import axios from "axios";
import toast from "react-hot-toast";

const URL = "https://thoughts2-cart-backend.vercel.app/api/v1/";
// const URL = "http://localhost:4000/api/v1/";

async function caller(type, extendexURL, body) {
  switch (type) {
    case "get":
      return await axios.get(URL + extendexURL, body);
    case "delete":
      return await axios.delete(URL + extendexURL, body);
    case "post":
      return await axios.post(URL + extendexURL, body);
    default:
      break;
  }
}
async function matchPasswords(pass) {
  let { data } = await caller("get", "user/matchPass/", { params: pass });
  return data;
}

async function uploadImage(profiledata) {
  let imageData = await axios.post(
    "https://api.cloudinary.com/v1_1/derplm8c6/upload",
    profiledata
  );
  return imageData.data.url;
}
function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "tpteieaa");
  return data;
}
function encodeImageFileAsURLForMultiupload(element) {
  var data = new FormData();
  data.append("file", element);
  data.append("upload_preset", "tpteieaa");
  return data;
}

async function multiupload(files) {
  if (files === "") return;
  if (files.length > 4) {
    toast.error("Cannot upload more than 4 images");
    return;
  }
  let imageArray = [];

  for (let i = 0; i < files.length; i++) {
    const image = files[i];
    let profileData = encodeImageFileAsURLForMultiupload(image);
    if (profileData) {
      let url = await uploadImage(profileData);
      imageArray.push(url);
    }
  }
  return imageArray;
}

async function addressFinder({ lat, long }) {
  let data = await axios.get(
    `http://api.positionstack.com/v1/reverse?access_key=fb8fe06f48f2714c4e9f4198ac1b8481&query=${lat},${long}`
  );
  return data;
}

const RandomProfileGenerator = async () => {
  let { data } = await axios.get("https://randomuser.me/api/");
  let profile = data.results[0];
  return profile.picture.large;
};
function dateNDaysAhead(n) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + n);

  const year = futureDate.getFullYear();
  const month = months[futureDate.getMonth()];
  const day = futureDate.getDate().toString().padStart(2, "0");
  const weekday = weekdays[futureDate.getDay()];

  return `(${weekday}) ${day}, ${month}`;
}

function productUrlCopy(id) {
  navigator.clipboard.writeText(
    `https://thoughts2-cart-com.vercel.app/product/${id}`
  );
  toast.success("Product URL copied to clipboard");
}

export {
  productUrlCopy,
  dateNDaysAhead,
  matchPasswords,
  RandomProfileGenerator,
  uploadImage,
  encodeImageFileAsURL,
  addressFinder,
  multiupload,
};
export default caller;
