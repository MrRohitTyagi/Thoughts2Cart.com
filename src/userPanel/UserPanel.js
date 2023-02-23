import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Text } from "grommet";
import ProfileOptions from "../components/profile/ProfileOptions";
import UserSettings from "./UserSettings";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          animation={{ duration: 400, type: "fadeIn" }}
          sx={{ width: "100%" }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function UserPanel({
  userDetails,
  setuserDetails,
  navigate,
  toast,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      animation={{ duration: 400, type: "fadeIn" }}
      sx={{
        flexGrow: 1,
        bgcolor: "#F2F2F2",
        color: "#5C4033",
        display: "flex",
        height: 224,
        width: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: 2,
          borderColor: "#5C4033",
          color: "#5C4033",
          minWidth: "250px",
        }}
      >
        <Tab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
              • Edit Profile
            </Text>
          }
          {...a11yProps(0)}
        />
        <Tab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
              • Orders
            </Text>
          }
          {...a11yProps(1)}
        />
        <Tab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
              • User Settings
            </Text>
          }
          {...a11yProps(2)}
        />
        {/* <Tab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
              • Delete Prooduct
            </Text>
          }
          {...a11yProps(3)}
        /> */}
        {/* <Tab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
               • 4 -NA
            </Text>
          }
          {...a11yProps(4)}
        /> */}
        {/* <Tab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
              • Update Product
            </Text>
          }
          {...a11yProps(5)}
        /> */}
        {/* <Tab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
              • Delete User
            </Text>
          }
          {...a11yProps(6)}
        /> */}
      </Tabs>

      <TabPanel value={value} index={0}>
        {/* <UserList {...{ userDetails, setuserDetails, navigate, toast }} /> */}
        <ProfileOptions {...{ userDetails, setuserDetails, navigate, toast }} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        {/* <AdminList {...{ userDetails, setuserDetails, navigate, toast }} /> */}
      </TabPanel>

      <TabPanel value={value} index={2}>
        <UserSettings {...{ userDetails, setuserDetails, navigate, toast }} />
      </TabPanel>
      <TabPanel value={value} index={3}></TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
