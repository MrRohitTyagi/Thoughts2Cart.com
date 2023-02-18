import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

async function addressFinder({ lat, long }) {
  let data = await axios.get(
    `http://api.positionstack.com/v1/reverse?access_key=fb8fe06f48f2714c4e9f4198ac1b8481&query=${lat},${long}`
  );
  return data;
}
const exportPDF = ({ title, headers, data }) => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);
  try {
    doc.setFontSize(15);
    const dataToConvert = data.map((ele, i) => {
      return Object.values(ele);
    });

    // return;
    let content = {
      startY: 50,
      head: headers,
      body: dataToConvert,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  } catch (error) {
    console.log(error);
  }
};
// example

// exportPDF({
//   title: "my pfd",
//   dataToConvert: [
//     { name: "a", email: "1@t.com", sn: 1 },
//     { name: "b", email: "2@t.com", sn: 1 },
//     { name: "c", email: "3@t.com", sn: 1 },
//   ],
//   headers: [["name", "email", "sn"]],
// });

const RandomProfileGenerator = async () => {
  let { data } = await axios.get("https://randomuser.me/api/");
  let profile = data.results[0];
  return profile.picture.large;
};
export {
  matchPasswords,
  RandomProfileGenerator,
  uploadImage,
  encodeImageFileAsURL,
  addressFinder,
  exportPDF,
};
export default caller;
