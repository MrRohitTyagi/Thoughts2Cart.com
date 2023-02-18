import caller from "../utils/helpFunctions";
let base = "user/";

export const regesterUser = async (userdata) => {
  let url = base + "regester";
  let data = await caller("post", url, userdata);
  return data;
};

export const getUser = async ({ id, email, password }) => {
  let url = base + "getUserDetails";
  let userDetails = {
    id: id || "",
    email: email || "",
    password: password || "",
  };
  let data = await caller("get", url, { params: userDetails });
  return data;
};

export const deleteUser = async (id) => {
  let url = base + "deleteUser";
  let data = await caller("delete", url, {
    data: { id: id },
  });
  return data;
};
export const getAllUsers = async (id) => {
  let url = base + "getAllUsers";

  let data = await caller("get", url, {});
  return data;
};
