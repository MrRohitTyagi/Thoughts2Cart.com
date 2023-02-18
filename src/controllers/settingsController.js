import caller from "../utils/helpFunctions";

export async function fetchAdminSettinsg() {
  let { data } = await caller(
    "get",
    `get-siteSettings/${"63f03b189619f30d7dec1def"}`
  );
  return data;
}

export async function saveAdminSettinsg(body) {
  console.log(body);
  let { data } = await caller("post", `save-siteSettings`, body);
  return data;
}

// USER
export async function fetchUserSettinsg(id) {
  return await caller("get", "get-siteSettings", { id: id });
}
