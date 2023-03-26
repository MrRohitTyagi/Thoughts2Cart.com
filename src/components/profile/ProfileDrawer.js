import React, { memo } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { Layer, Text } from "grommet";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const TemporaryDrawer = ({
  toast,
  setprofileDrawerlayer,
  setuserDetails,
  userDetails,
}) => {
  let navigate = useNavigate();
  return (
    <>
      <Layer
        position="right"
        onClickOutside={() => {
          setprofileDrawerlayer(false);
        }}
        onEsc={() => {
          setprofileDrawerlayer(false);
        }}
        style={{ height: "100vh" }}
      >
        <Box
          animation={{ duration: 400, type: "fadeIn" }}
          sx={{ width: 350, background: "#F2F2F2", height: "100%" }}
          role="presentation"
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={<Text>Profile Options</Text>} />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ border: "1px dotted #E9DCC9" }} />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (userDetails._id) {
                    navigate("/viewProfile/");

                    setprofileDrawerlayer(false);
                  } else {
                    toast.error("Sign In to View Profile");

                    setprofileDrawerlayer(false);
                  }
                }}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary={"View Profile"} />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              onClick={() => {
                localStorage.removeItem("userId");
                setuserDetails("");
                setprofileDrawerlayer(false);
                navigate("/");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ border: "2px solid #E9DCC9" }} />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={<Text>User Address</Text>} />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ border: "1px dotted #E9DCC9" }} />

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    !!userDetails?.address
                      ? `${userDetails?.address?.address}, ${userDetails?.address?.district}, ${userDetails?.address?.state}, ${userDetails?.address?.country}`
                      : "No address Found"
                  }
                />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ border: "2px solid #E9DCC9" }} />

            {userDetails?.role === "admin" && (
              <>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={<Text>Admin Settings</Text>} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setprofileDrawerlayer(false);
                      navigate("/admin-panel");
                    }}
                  >
                    <ListItemIcon>
                      <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Admin pannel"} />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Layer>
    </>
  );
};
export default memo(TemporaryDrawer);
