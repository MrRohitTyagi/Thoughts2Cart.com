import caller from "../utils/helpFunctions";

export async function sendEmailtoServer(edata) {
  console.log("%c data ", "color: red;border:1px solid red", edata);

  let { data } = await caller("post", "sendemail", edata);

  return data;
} 

