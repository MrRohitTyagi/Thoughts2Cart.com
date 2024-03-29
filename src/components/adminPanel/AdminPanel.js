import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Text } from "grommet";
import UserList from "./components/userList/UserList";
import ProductList from "./components/productList/ProductList";
import CategoryList from "./components/categoryList/CategoryList";
import AdminList from "./components/AdminList";
import AdminSettings from "./AdminSettings";
import OrdersList from "./components/ordersManager/OrdersList";
import styled from "styled-components";

const HoverTab = styled(Tab)`
  &:hover {
    background: #FFFBEF;
  }
`;
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

export default function VerticalTabs({ toast, allcatagories }) {
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
        <HoverTab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
              • User List
            </Text>
          }
          {...a11yProps(0)}
        />
        <HoverTab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
              • Admin List
            </Text>
          }
          {...a11yProps(1)}
        />
        <HoverTab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
              • Product List
            </Text>
          }
          {...a11yProps(2)}
        />
        <HoverTab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
              • Category List
            </Text>
          }
          {...a11yProps(4)}
        />
        <HoverTab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
              • Manage orders
            </Text>
          }
          {...a11yProps(5)}
        />
        <HoverTab
          sx={{ borderBottom: "1px solid #5C4033" }}
          label={
            <Text
              style={{ textAlign: "center" }}
              alignSelf="start"
              color={"#5C4033"}
            >
              • Admin Settings
            </Text>
          }
          {...a11yProps(6)}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <UserList {...{ toast }} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminList {...{ toast }} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProductList {...{ toast, allcatagories }} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CategoryList {...{ toast }} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <OrdersList {...{ toast }} />
      </TabPanel>

      <TabPanel value={value} index={5}>
        <AdminSettings {...{ toast }} />
      </TabPanel>
    </Box>
  );
}
