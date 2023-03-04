import axios from "axios";
import toast from "react-hot-toast";
import { Country, State, City } from "country-state-city";

// const URL = "https://thoughts2-cart-backend.vercel.app/api/v1/";
const URL = "http://localhost:4000/api/v1/";

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

function getAllstatesByCountry(code) {
  return State.getStatesOfCountry(code);
}
function getAllCountries(code) {
  return Country.getAllCountries();
}
function getCitiesOfState(countrycode, statecode) {
  return City.getCitiesOfState(countrycode, statecode);
}
function generateRandomString() {
  const alphanumeric =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += alphanumeric.charAt(
      Math.floor(Math.random() * alphanumeric.length)
    );
  }
  return result;
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setCookie(name, value) {
  const expires = new Date(Date.now() + 60 * 60 * 1000); // Set expiration time to 1 hour from now
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    ";expires=" +
    expires.toUTCString() +
    ";path=/";
}
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
function convertDatetime(datetimeString) {
  // Parse the datetime string into a Date object
  const dt = new Date(datetimeString);
  // Format the Date object into a readable date string
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const readableDate = dt.toLocaleDateString("en-US", options);
  return readableDate;
}
function addAllPrices(data) {
  let sum = 0;
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty("price")) {
        sum += data[i].price;
      }
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (data[key].hasOwnProperty("price")) {
        sum += data[key].price;
      }
    }
  }
  return sum;
}
function toTitleCase(str) {
  const words = str.toLowerCase().split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  const titleCaseStr = words.join(" ");
  return titleCaseStr;
}

function getDateNDaysAheadOfAGivenDate(dateString, N) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + N);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

export {
  getDateNDaysAheadOfAGivenDate,
  toTitleCase,
  addAllPrices,
  convertDatetime,
  deleteCookie,
  setCookie,
  getCookie,
  generateRandomString,
  getCitiesOfState,
  getAllCountries,
  getAllstatesByCountry,
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
