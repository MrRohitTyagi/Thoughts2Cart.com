import caller from "../utils/helpFunctions";

export async function fetchAdminSettinsg(id) {
  let { data } = await caller("get", `get-siteSettings/${id}`);
  return data;
}

export async function saveAdminSettinsg(body) {
    console.log(body);
  let { data } = await caller("post", `save-siteSettings`,body);
  return data;
}

// USER 
export async function fetchUserSettinsg(id) {
  return await caller("get", "get-siteSettings", { id: id });
}
