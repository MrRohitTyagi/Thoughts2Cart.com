import caller from "../utils/helpFunctions";

export const deleteImage = async (url) => {
  await caller("delete", `delete-image/?url=${url}`, {});
};
