import React, { memo, useState } from "react";
import { Box, Text, Layer, Spinner as OnlySpinner } from "grommet";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Button, Avatar, TextField } from "@mui/material";
import { Formik } from "formik";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { getUser, regesterUser } from "../../controllers/userController";
import Spinner from "../../assets/Spinner";

import { deleteUser } from "../../controllers/userController";
import { matchPasswords } from "../../utils/helpFunctions";
import { encodeImageFileAsURL, uploadImage } from "../../utils/helpFunctions";
import { useEffect } from "react";

const ProfileOptions = ({ navigate, toast }) => {
  const [userDetails, setuserDetails] = useState("");
  const [changepasswordlayer, setchangepasswordlayer] = useState(false);
  const [profileData, setprofileData] = useState("");
  const [validationMsg, setvalidationMsg] = useState("pending");

  const handleProfileUpdate = async (
    { name, phone, email, id, profile, editable, password, role, wishlist },
    setFieldValue
  ) => {
    let profileUrl = "";
    if (editable === false) return;
    if (profileData) {
      let url = await uploadImage(profileData);
      profileUrl = url;
    }

    let { data } = await regesterUser({
      password,
      role,
      name,
      phone,
      email,
      id,
      profile: profileUrl || profile,
      wishlist,
    });
    setuserDetails(data);
    setprofileData();
    setFieldValue("editable", false);
    toast.success("Profile updated successfully");
  };
  const handleChangePassword = async (data, setFieldValue) => {
    if (data.newPassword === "" || data.confirmPass === "") {
      toast.error("Both the fields are required");
      return;
    }
    setvalidationMsg("inprogress");
    let res = await matchPasswords(data);
    if (res.success) {
      setvalidationMsg("verified");
      setTimeout(() => {
        setchangepasswordlayer(false);
        setvalidationMsg(false);
        toast.success(res.msg);
        setvalidationMsg("pending");
        setFieldValue("NewPASS", "");
        setFieldValue("CurrentPASS", "");
      }, 2000);
    } else {
      setTimeout(() => {
        setvalidationMsg("pending");
        toast.error(res.msg);
      }, 2000);
    }
  };
  useEffect(() => {
    // setuserDetails("LOADING");
    let id = localStorage.getItem("userId");

    (async function fetchUser() {
      let { data } = await getUser({ id: id });
      if (data.success) {
        setuserDetails(data.user);
      } else {
        // setuserDetails("NOT_FOUND");
      }
    })();
  }, []);
  return userDetails ? (
    <Box animation={{ duration: 400, type: "fadeIn" }} pad={"large"}>
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        direction="row"
        gap="40px"
      >
        <Box animation={{ duration: 400, type: "fadeIn" }}>
          <Formik
            initialValues={{
              email: userDetails.email || "",
              password: userDetails.password || "",
              name: userDetails.name || "",
              profile: userDetails.profile || "",
              wishlist: userDetails.wishlist || [],
              phone: userDetails.phone || "",
              role: userDetails.role || "user",
              profileData: "",
              id: userDetails._id || "",
              editable: false,
              deleteAccount: false,
            }}
            onSubmit={() => {}}
          >
            {({
              values,
              handleSubmit,
              setFieldValue,
              setFieldError,
              errors,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Box
                    animation={{ duration: 400, type: "fadeIn" }}
                    direction="row"
                    gap="40px"
                  >
                    <Box
                      animation={{ duration: 400, type: "fadeIn" }}
                      direction="column"
                      align="center"
                      justify="center"
                      gap="10px"
                    >
                      <Avatar
                        sx={{
                          border: "1px solid #5C4033",
                          height: "200px",
                          width: "200px",
                        }}
                        src={userDetails.profile}
                      />

                      <Box
                        animation={{ duration: 400, type: "fadeIn" }}
                        gap="10px"
                        direction="column"
                        align="center"
                      >
                        {!values.editable === false ? (
                          <Button
                            variant="contained"
                            component="label"
                            startIcon={<CameraAltIcon />}
                          >
                            Change profile
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={(event) => {
                                let data = encodeImageFileAsURL(event.target);
                                setprofileData(data);
                              }}
                            />
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            component="label"
                            startIcon={<CameraAltIcon />}
                            sx={{ opacity: "50%" }}
                          >
                            Change profile
                          </Button>
                        )}
                      </Box>
                    </Box>

                    <Box
                      animation={{ duration: 400, type: "fadeIn" }}
                      direction="column"
                      justify="evenly"
                      gap="20px"
                      pad={{ horizontal: "small" }}
                      style={{ color: "#5C4033" }}
                    >
                      <TextField
                        disabled={values.editable === false}
                        placeholder="Name*"
                        onChange={(e) => {
                          setFieldValue("name", e.target.value);
                        }}
                        type="text"
                        label="Name"
                        value={values.name}
                        sx={{ color: "#5C4033" }}
                      />

                      <TextField
                        disabled={values.editable === false}
                        onChange={(e) => {
                          setFieldValue("email", e.target.value);
                        }}
                        type="email"
                        label="Email"
                        value={values.email}
                      />

                      <TextField
                        disabled={values.editable === false}
                        onChange={(e) => {
                          setFieldValue("phone", e.target.value);
                        }}
                        type="phone"
                        label="Phone"
                        value={values.phone}
                      />
                    </Box>
                    <Box
                      animation={{ duration: 400, type: "fadeIn" }}
                      direction="row"
                      gap="10px"
                      alignSelf="end"
                      style={{
                        position: "absolute",
                        bottom: "50px",
                        right: "40px",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setchangepasswordlayer(values.password);
                        }}
                        variant="contained"
                        color="warning"
                      >
                        Change Password
                      </Button>
                      <Button
                        onClick={() => {
                          setFieldValue("editable", !values.editable);
                        }}
                        variant="contained"
                        color="info"
                      >
                        Edit Profile
                      </Button>
                      <Button
                        onClick={() => {
                          handleProfileUpdate(values, setFieldValue);
                        }}
                        variant="contained"
                        color="success"
                      >
                        Save Profile
                      </Button>
                      {values.deleteAccount ? (
                        <Button
                          onClick={async () => {
                            await deleteUser(userDetails._id);
                            toast.success("Account Deleted Successfully!");
                            setuserDetails("");
                            localStorage.removeItem("userId");
                            setTimeout(() => {
                              navigate("/");
                            }, 2000);
                          }}
                          endIcon={<SentimentVeryDissatisfiedIcon />}
                          variant="contained"
                          color="warning"
                        >
                          Confirm delete
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setFieldValue("deleteAccount", true);
                          }}
                          variant="contained"
                          color="error"
                        >
                          Delete Account
                        </Button>
                      )}{" "}
                    </Box>
                  </Box>
                  {changepasswordlayer && (
                    <Layer
                      onClickOutside={() => {
                        setchangepasswordlayer(false);
                      }}
                      onEsc={() => {
                        setchangepasswordlayer(false);
                      }}
                      style={{
                        height: "300px",
                        width: "400px",
                        background: "#F2F2F2",
                      }}
                    >
                      <Box
                        animation={{ duration: 400, type: "fadeIn" }}
                        direction="column"
                        gap="20px"
                        pad="small"
                        style={{ color: "#5C4033" }}
                      >
                        <Text alignSelf="center">Change Password</Text>
                        <TextField
                          onChange={(e) => {
                            setFieldValue("CurrentPASS", e.target.value);
                          }}
                          type="phone"
                          label="Enter Current Password"
                          value={values.CurrentPASS}
                        />
                        <TextField
                          // disabled={values.editable === false}
                          onChange={(e) => {
                            setFieldValue("NewPASS", e.target.value);
                          }}
                          type="phone"
                          label="Enter New Password"
                          value={values.NewPASS}
                        />
                        <Button
                          onClick={async () => {
                            handleChangePassword(
                              {
                                confirmPass: values.CurrentPASS || "",
                                newPassword: values.NewPASS || "",
                                id: values.id,
                              },
                              setFieldValue
                            );
                          }}
                          color="success"
                          variant="contained"
                        >
                          Change Password
                        </Button>
                        {validationMsg === "inprogress" ? (
                          <Box
                            animation={{ duration: 400, type: "fadeIn" }}
                            direction="row"
                            gap="20px"
                            alignSelf="center"
                          >
                            <OnlySpinner color={"red"} />
                            <Text>Verifying Password ...</Text>
                          </Box>
                        ) : validationMsg === "verified" ? (
                          <Box
                            animation={{ duration: 400, type: "fadeIn" }}
                            direction="row"
                            gap="20px"
                            alignSelf="center"
                          >
                            <Text>Validation Successfull</Text>
                            <DoneAllIcon color={"green"} />
                          </Box>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </Layer>
                  )}
                </form>
              );
            }}
          </Formik>
        </Box>
      </Box>
    </Box>
  ) : (
    <Spinner center msg="Fetching profile details" />
  );
};

export default memo(ProfileOptions);
