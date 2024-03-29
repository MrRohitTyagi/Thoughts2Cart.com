import React, { useEffect, useState, createContext, memo } from "react";
import { Box, Grommet } from "grommet";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

import Navbar from "./components/Navbar";
import MainScreen from "./components/productpage/MainScreen";
import AdminPanel from "./components/adminPanel/AdminPanel";
import UserPanel from "./userPanel/UserPanel";
import CategoryPage from "./components/ProductCategoryScreen";
import EachProductScreen from "./components/EachproductScreen";

import { getUser } from "./controllers/userController";

import { getAllcategory } from "./controllers/categoryController";
import { fetchAdminSettinsg } from "./controllers/settingsController";
import Checkout from "./components/checkoutScreen/Checkout";
import SpeedDialTooltipOpen from "./VersitileComponents/QuickAccess/QuickAccess";

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
  const [adminSettings, setadminSettings] = useState({});

  useEffect(() => {
    setuserDetails("LOADING");
    let id = localStorage.getItem("userId");

    (async function fetchUser() {
      let { data } = await getUser({ id: id });
      if (data.success) {
        setuserDetails(data.user);
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
          <Box
            animation={{ duration: 400, type: "fadeIn" }}
            height={{ min: "100vh" }}
            background={adminSettings?.theme?.background || "#F2F2F2"}
          >
            <Navbar
              {...{
                adminSettings,
                userDetails,
                setuserDetails,
                navigate,
                toast,
              }}
            />
            <Routes>
              {[
                "/viewProfile/:id/:ordercode",
                "/viewProfile",
                "/viewProfile/:id",
              ].map((path, i) => (
                <Route
                  key={i}
                  path={path}
                  element={
                    <UserPanel
                      {...{ userDetails, setuserDetails, navigate, toast }}
                    />
                  }
                />
              ))}
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
              <Route
                path="/checkout"
                element={
                  <Checkout
                    {...{ userDetails, setuserDetails, toast, allcatagories }}
                  />
                }
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
      <SpeedDialTooltipOpen {...{ navigate }} />
    </Grommet>
  );
};

export default memo(App);
