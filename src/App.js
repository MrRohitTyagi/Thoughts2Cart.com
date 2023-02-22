import React, { useEffect, useState, createContext } from "react";
import { Box, Grommet, Text } from "grommet";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { grommet } from "grommet/themes";
import { Avatar } from "@mui/material";
import { deepMerge } from "grommet/utils";

import Navbar from "./components/Navbar";
import MainScreen from "./components/productpage/MainScreen";
import AdminPanel from "./components/adminPanel/AdminPanel";
import UserPanel from "./userPanel/UserPanel";
import CategoryPage from "./components/ProductCategoryScreen";
import EachProductScreen from "./components/EachproductScreen";

import { getUser } from "./controllers/userController";
import { addressFinder } from "./utils/helpFunctions";
import { getAllcategory } from "./controllers/categoryController";
import { fetchAdminSettinsg } from "./controllers/settingsController";

export const UserDetailsContext = createContext();
export const AdminSettingsContext = createContext();

const customBreakpoints = deepMerge(grommet, {
  global: {
    breakpoints: {
      xsmall: {
        value: 700,
      },
      small: {
        value: 900,
      },
      medium: {
        value: 1200,
      },
      middle: {
        value: 1500,
      },
      large: {
        value: 2000,
      },
    },
  },
});
const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [allcatagories, setallcatagories] = useState([]);
  const [userDetails, setuserDetails] = useState("");
  const [userAddress, setuserAddress] = useState("");
  const [adminSettings, setadminSettings] = useState({});

  function welcoometoast(data) {
    toast((t) => {
      t.duration = 2000;
      return (
        <span>
          <Box direction="row">
            <Avatar src={data.user.profile} />
            <Box direction="column" margin={{ left: "10px" }}>
              <Text size="small">
                Hi {data.user.name} Welcome Thoughts2Cart.com
              </Text>
              <Text size="small">Happy Shopping !</Text>
            </Box>
          </Box>
        </span>
      );
    });
  }

  useEffect(() => {
    setuserDetails("LOADING");
    let id = localStorage.getItem("userId");

    (async function fetchUser() {
      let { data } = await getUser({ id: id });
      if (data.success) {
        setuserDetails(data.user);
        welcoometoast(data);
      } else {
        setuserDetails("NOT_FOUND");
      }
    })();
  }, []);

  useEffect(() => {
    (async function fetchAllCatagory() {
      let { data: settings } = await fetchAdminSettinsg();
      setadminSettings(settings);

      let { data: categories } = await getAllcategory();
      setallcatagories(categories);
    })();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (posi) => {
      let { data } = await addressFinder({
        lat: posi.coords.latitude,
        long: posi.coords.longitude,
      });
      setuserAddress(data);
    });
  }, []);

  useEffect(() => {
    if (userDetails) {
      if (
        (userDetails.role !== "admin" || !userDetails) &&
        pathname === "/admin-panel"
      ) {
        navigate("/");
      }
    }
  });

  return (
    <Grommet theme={customBreakpoints}>
      <AdminSettingsContext.Provider
        value={{ adminSettings, setadminSettings }}
      >
        <UserDetailsContext.Provider value={{ userDetails, setuserDetails }}>
          <Box height={{ min: "100vh" }} background={"#F2F2F2"}>
            <Navbar
              {...{
                userDetails,
                setuserDetails,
                navigate,
                toast,
                userAddress,
              }}
            />
            <Routes>
              <Route
                path="/viewProfile"
                element={
                  <UserPanel
                    {...{ userDetails, setuserDetails, navigate, toast }}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <MainScreen
                    {...{ userDetails, navigate, toast, allcatagories }}
                  />
                }
              />

              <Route
                path="/admin-panel"
                element={<AdminPanel {...{ toast, allcatagories }} />}
              />
              <Route
                path="/category/:name"
                element={<CategoryPage {...{ toast, allcatagories }} />}
              />
              <Route
                path="/product/:id"
                element={<EachProductScreen {...{ toast, allcatagories }} />}
              />
              <Route path="*" element={<>404 page not found</>} />
            </Routes>
          </Box>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: "",
              duration: 2000,
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "black",
              },
              success: {
                duration: 2000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
        </UserDetailsContext.Provider>
      </AdminSettingsContext.Provider>
    </Grommet>
  );
};

export default App;
