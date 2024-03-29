import { Layer, Box, Text, Spinner } from "grommet";
import Divider from "@mui/material/Divider";
import { Button, TextField } from "@mui/material";
import { getUser } from "../../controllers/userController";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useContext, memo } from "react";
import { Formik } from "formik";
import { UserDetailsContext } from "../../App";
import { regesterUser } from "../../controllers/userController";
import { uploadImage } from "../../utils/helpFunctions";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const validationSchema = yup.object({
  name: yup
    .string()
    .max(20, "Username too long")
    .when("type", {
      is: (type) => type === "SIGNUP",
      then: (schema) => schema.required("Name is required"),
    }),
  type: yup.string(),
  email: yup.string().required("Email is required"),

  phone: yup.string().when("type", {
    is: (type) => type === "SIGNUP",
    then: (schema) =>
      schema
        .max(10, "Invalid Phone Number")
        .min(10, "Invalid Phone Number")
        .required("Phone is required"),
  }),
  password: yup.string().when("type", {
    is: (type) => type === "SIGNUP",
    then: (schema) =>
      schema
        .max(20, "Invalid Phone Number")
        .min(5, "Password too short")
        .required("Password is required"),
  }),
});

const StyledButton = styled(Button)`
  background: #5c4033 !important;
`;

const SignupForm = ({ setSigninLayer, toast }) => {
  const [buttonDisabler, setbuttonDisabler] = useState({
    signIn: false,
    signUp: false,
  });
  const [loggin, setloggin] = useState(false);
  const { userDetails, setuserDetails } = useContext(UserDetailsContext);
  const { name, email, _id: id } = userDetails;
  const [passVisibility, setpassVisibility] = useState("");

  async function handleLogin(values, setFieldError) {
    if (values.email === "" || values.password === "") {
      toast.error("All fields are Required");
      return;
    }
    try {
      setbuttonDisabler({
        signIn: true,
        signUp: false,
      });
      let { data } = await getUser({
        email: values.email,
        password: values.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data.user._id);
        setSigninLayer(false);
        toast.success("Login Successfull !");
        setuserDetails(data.user);
        setbuttonDisabler({
          signIn: false,
          signUp: false,
        });
      } else {
        toast.warn("Something went Wrong");
      }
    } catch (error) {
      console.log(error);
      setbuttonDisabler({
        signIn: false,
        signUp: false,
      });
      toast.error("Incorrect email or password");
    }
  }

  const handlesubmit = async (values, { setFieldError, setFieldValue }) => {
    if (values.type === "LOGIN") {
      handleLogin(values, setFieldError);
      return;
    }
    try {
      setbuttonDisabler({
        signIn: false,
        signUp: true,
      });
      if (values.profileData) {
        let url = await uploadImage(values.profileData);
        let { data } = await regesterUser({
          name: values.name,
          email: values.email,
          password: values.password,
          profile: url,
          phone: values.phone,
          id: values.id,
        });
        if (data._id) toast.success("Account Created Successfully!");
        localStorage.setItem("userId", data._id);
        setuserDetails(data);
        setSigninLayer(false);
        setbuttonDisabler({
          signIn: false,
          signUp: false,
        });
        return;
      }

      let { data } = await regesterUser(values);
      if (data._id) toast.success("Account Created Successfully!");
      localStorage.setItem("userId", data._id);
      setuserDetails(data);
      setSigninLayer(false);
      setbuttonDisabler({
        signIn: false,
        signUp: false,
      });
    } catch ({ response }) {
      toast.error(response?.data?.message || "Something went wrong");
      setbuttonDisabler({
        signIn: false,
        signUp: false,
      });
    }
  };

  function encodeImageFileAsURL(element, setFieldValue) {
    var file = element.files[0];
    setFieldValue("tempimg", file);
    var data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "tpteieaa");
    setFieldValue("profileData", data);
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: email || "",
        password: "",
        name: name || "",
        profile: "",
        phone: userDetails.phone || "",
        tempimg: "",
        type: "SIGNUP",
      }}
      onSubmit={handlesubmit}
    >
      {({
        values,
        handleSubmit,
        setFieldValue,
        setFieldError,
        errors,
        handleChange,
        touched,
      }) => {
        return (
          <Layer
            position="right"
            onEsc={() => {
              setSigninLayer(false);
            }}
            onClickOutside={() => {
              setSigninLayer(false);
            }}
            style={{
              background: "#F2F2F2",
              minWidth: "600px",
              maxWidth: "600px",
              height: "100vh",
              border: "4px solid #5C4033",
            }}
          >
            <StyledButton
              onClick={() => {
                setSigninLayer(false);
              }}
              variant="contained"
              sx={{
                left: "-3%",
                width: "15px",
                position: "absolute",
                zIndex: 0,
                top: "-5px",
                background: "#5C4033",
                color: "#F2F2F2",
              }}
              startIcon={<CloseIcon />}
            ></StyledButton>
            <form onSubmit={handleSubmit}>
              <Box
                animation={{ duration: 400, type: "fadeIn" }}
                overflow={{ vertical: "auto" }}
                background={"#F2F2F2"}
                direction="column"
                justify="evenly"
                gap="20px"
                pad={"small"}
                style={{ color: "#5C4033" }}
                margin="small"
                elevation="large"
                round="small"
              >
                <Text
                  alignSelf="center"
                  size="large"
                  weight="bold"
                  style={{ color: "#5C4033" }}
                >
                  {!id && loggin === false ? "Sign Up" : "Sign In"}
                </Text>

                <Divider sx={{ border: "1px solid #5C4033" }} />
                <Box
                  animation={{ duration: 400, type: "fadeIn" }}
                  direction="column"
                  columns={[["xsmall", "xlarge"]]}
                  gap="10px"
                >
                  {!id && loggin === false && (
                    <TextField
                      type={"text"}
                      fullWidth
                      id="name"
                      name="name"
                      label="Name*"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  )}

                  <TextField
                    type={"text"}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email*"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  {!id && loggin === false && (
                    <TextField
                      type={"number"}
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Phone*"
                      value={values.phone}
                      onChange={handleChange}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  )}
                  <Box
                    animation={{ duration: 400, type: "fadeIn" }}
                    direction="row"
                    align="center"
                    style={{ position: "relative" }}
                  >
                    <TextField
                      type={passVisibility ? "password" : "text"}
                      fullWidth
                      id="password"
                      name="password"
                      label="Password*"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />

                    {passVisibility ? (
                      <VisibilityIcon
                        sx={{
                          position: "absolute",
                          right: "10px",
                          top: "15px",
                        }}
                        onClick={(e) => {
                          setpassVisibility((prev) => !prev);
                        }}
                      />
                    ) : (
                      <VisibilityOffIcon
                        sx={{
                          position: "absolute",
                          right: "10px",
                          top: "15px",
                        }}
                        onClick={(e) => {
                          setpassVisibility((prev) => !prev);
                        }}
                      />
                    )}
                  </Box>
                </Box>
                {!id && loggin === false && (
                  <Box
                    animation={{ duration: 400, type: "fadeIn" }}
                    gap="10px"
                    direction="column"
                    align="center"
                  >
                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        width: "80%",
                      }}
                      startIcon={<CameraAltIcon />}
                    >
                      Upload profile picture
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(event) => {
                          encodeImageFileAsURL(event.target, setFieldValue);
                        }}
                      />
                    </Button>
                  </Box>
                )}
                <Box
                  animation={{ duration: 400, type: "fadeIn" }}
                  gap="5px"
                  direction="column"
                  align="center"
                >
                  {!id && loggin === false ? (
                    <>
                      {buttonDisabler.signUp ? (
                        <StyledButton
                          sx={{
                            width: "80%",
                            background: "#5C4033",
                            color: "#F2F2F2",
                          }}
                          variant="contained"
                        >
                          <Spinner color={"#F2F2F2"} />
                        </StyledButton>
                      ) : (
                        <StyledButton
                          sx={{
                            width: "80%",
                            background: "#5C4033",
                            color: "#F2F2F2",
                          }}
                          variant="contained"
                          type="submit"
                        >
                          Create Account
                        </StyledButton>
                      )}
                    </>
                  ) : (
                    <>
                      {buttonDisabler.signIn ? (
                        <StyledButton
                          sx={{
                            width: "80%",
                            background: "#5C4033",
                            color: "#F2F2F2",
                          }}
                          variant="contained"
                        >
                          <Spinner color={"#F2F2F2"} />
                        </StyledButton>
                      ) : (
                        <StyledButton
                          sx={{
                            width: "80%",
                            background: "#5C4033",
                            color: "#F2F2F2",
                          }}
                          variant="contained"
                          type="submit"
                        >
                          LogIn
                        </StyledButton>
                      )}
                    </>
                  )}
                  <Divider />
                  {!id && loggin === false ? (
                    <Text style={{ color: "#5C4033" }} size="small">
                      Already have an account ?
                    </Text>
                  ) : (
                    <Text style={{ color: "#5C4033" }} size="small">
                      New to Thoughts2Cart ?
                    </Text>
                  )}
                  {!id && loggin === false ? (
                    <StyledButton
                      onClick={() => {
                        setFieldValue("type", "LOGIN");
                        setloggin(true);
                      }}
                      sx={{
                        scale: values.type === "SIGNUP" ? "0.8" : "1",
                        width: "80%",
                        background: "#5C4033",
                        color: "#F2F2F2",
                      }}
                      variant="contained"
                    >
                      Sign In
                    </StyledButton>
                  ) : (
                    <StyledButton
                      onClick={() => {
                        setFieldValue("type", "SIGNUP");
                        setloggin(false);
                      }}
                      sx={{
                        scale: values.type === "SIGNUP" ? "1" : "0.8",
                        width: "80%",
                        background: "#5C4033",
                        color: "#F2F2F2",
                      }}
                      variant="contained"
                    >
                      Create Account
                    </StyledButton>
                  )}
                </Box>
              </Box>
            </form>
          </Layer>
        );
      }}
    </Formik>
  );
};

export default memo(SignupForm);
