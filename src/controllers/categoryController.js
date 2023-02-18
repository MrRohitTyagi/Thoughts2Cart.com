import caller from "../utils/helpFunctions";
let base = "category/";

export const regestercategory = async (userdata) => {
  let url = base + "create-category";
  let data = await caller("post", url, userdata);
  return data;
};

export const deletecategory = async (id) => {
  let url = base + "delete-category";
  let data = await caller("delete", url, {
    data: { id: id },
  });
  return data;
};
export const getAllcategory = async (id) => {
  let url = base + "getAll-category";

  let data = await caller("get", url, {});
  return data;
};
