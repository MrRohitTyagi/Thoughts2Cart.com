import React, { useState } from "react";
import { Box, Layer, Text, Grid, Spinner } from "grommet";
import ForwardIcon from "@mui/icons-material/Forward";
import { useFormik } from "formik";
import * as yup from "yup";

import { Button, IconButton, TextField, Avatar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  encodeImageFileAsURL,
  uploadImage,
} from "../../../../utils/helpFunctions";
import { StyledButton } from "../../../../assets/StyledItems";
import {
  regesterUser,
  deleteUser,
} from "../../../../controllers/userController";

const validationSchema = yup.object({
  name: yup.string().max(20, "Name too long").required("name is required"),
  email: yup.string().required("email is required"),
  password: yup.string(),
  address: yup.string(),
  phone: yup
    .string()
    .max(10, "Invalid Phone Number")
    .min(10, "Invalid Phone Number")
    .required("Phone is required"),
  role: yup.string().required("role is required"),
  profile: yup.string(),
});
const EditUserForm = ({
  userEditLayer,
  setuserEditLayer,
  fetchAllUsers,
  toast,
}) => {
  const [profilePicData, setprofilePicData] = useState("");
  const formik = useFormik({
    initialValues: {
      name: userEditLayer?.name || "",
      email: userEditLayer?.email || "",
      phone: userEditLayer?.phone || "",
      role: userEditLayer?.role || "",
      profile: userEditLayer?.profile || "",
      password: userEditLayer?.password || "",
      address: userEditLayer?.address || "",
      id: userEditLayer?._id || "",
      isPassChanded: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      return handleProfileUpdate(values);
    },
  });
  async function handleProfileUpdate({ password, profile }) {
    try {
      toast.loading(
        <Box direction="row">
          <Text>Submitting Please wait</Text>
        </Box>
      );
      let url = "";
      if (password === "") {
        return toast.error("password is required");
      }

      if (profilePicData) {
        url = await uploadImage(profilePicData);
        setprofilePicData(null);
      }
      await regesterUser({ ...arguments[0], profile: url ? url : profile });
      formik.setFieldValue("isPassChanded", false);
      await fetchAllUsers();
      setuserEditLayer(false);
      toast.success("Profile updated successfully");
    } catch ({ response }) {
      toast.error(response?.data || "Something went wrong");
      console.log(response);
    }
  }

  return (
    <Layer
      onEsc={() => {
        setuserEditLayer(false);
      }}
      onClickOutside={() => {
        setuserEditLayer(false);
      }}
      position="right"
      style={{ height: "100vh", width: "600px", background: "#ded5bf" }}
    >
      <StyledButton
        onClick={() => {
          setuserEditLayer(false);
        }}
        variant="contained"
        color="info"
        sx={{
          left: "-5%",
          top: "50%",
          position: "absolute",
          zIndex: 0,
        }}
        startIcon={<ForwardIcon />}
      ></StyledButton>

      <Box
        style={{ position: "relative" }}
        background={"#F9F6EE"}
        round="small"
        margin={"small"}
        elevation={"large"}
        border
        height={"100%"}
        pad="small"
      >
        <Text weight={"bold"}>
          User {userEditLayer?._id ? "Edit" : "Create"} Form
        </Text>
        <Avatar
          style={{ position: "absolute", top: "5px", right: "5px" }}
          src={userEditLayer.profile}
        />

        <form onSubmit={formik.handleSubmit}>
          <Box direction="column" gap="20px" margin={{ top: "30px" }}>
            <TextField
              type={"text"}
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={(e) => {
                formik.setFieldValue("password", e.target.value);

                if (formik.values.isPassChanded === false)
                  formik.setFieldValue("isPassChanded", true);
              }}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={(e) => {
                formik.setFieldValue("address", e.target.value);

                if (formik.values.isPassChanded === false)
                  formik.setFieldValue("isPassChanded", true);
              }}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <Box style={{ position: "relative" }} direction="row">
              <TextField
                fullWidth
                id="profile"
                name="profile"
                label="profile URL"
                value={formik.values.profile}
                onChange={formik.handleChange}
                error={formik.touched.profile && Boolean(formik.errors.profile)}
                helperText={formik.touched.profile && formik.errors.profile}
              />
              <IconButton
                sx={{
                  scale: "1.5",
                  margin: "0 10px",
                }}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    let data = encodeImageFileAsURL(e.target);
                    setprofilePicData(data);
                  }}
                />
                <CloudUploadIcon />
              </IconButton>
            </Box>
            <Grid
              columns={[
                ["small", "large"],
                ["small", "large"],
              ]}
              gap="10px"
            >
              <TextField
                type={"number"}
                id="phone"
                name="phone"
                label="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              <TextField
                id="role"
                name="role"
                label="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              />
            </Grid>
          </Box>

          <Box
            alignSelf="end"
            direction="row"
            style={{ position: "absolute", bottom: "5px", right: "5px" }}
            gap="20px"
          >
            {userEditLayer?._id && (
              <Button
                onClick={async () => {
                  await deleteUser(formik.values.id);
                  await fetchAllUsers();
                  setuserEditLayer(false);
                  toast.success("User Deleted");
                }}
                variant="contained"
                color="error"
              >
                Delete User
              </Button>
            )}
            <Button
              // onClick={() => handleProfileUpdate(formik.values)}
              type="submit"
              variant="contained"
              color="success"
            >
              {userEditLayer?._id ? "Update" : "Create"} User
            </Button>
          </Box>
        </form>
      </Box>
    </Layer>
  );
};

export default EditUserForm;
