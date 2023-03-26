import React, { useEffect, useState, useContext, useCallback, memo } from "react";
import { useParams } from "react-router-dom";
import { getCookie, deleteCookie } from "../utils/helpFunctions";
import { generateOrder, getAllUserorders } from "../controllers/orderRoute";
import { countUnique } from "../controllers/cartcomtroller";
import { regesterUser } from "../controllers/userController";
import { Box, Image, Text } from "grommet";
import OrderCard from "../VersitileComponents/productCards/OrderCard";
import Spinner from "../assets/Spinner";
import { sendEmailtoServer } from "../controllers/emailController";
import { AdminSettingsContext } from "../App";

const Orders = ({ userDetails, setuserDetails, navigate, toast }) => {
  const { adminSettings } = useContext(AdminSettingsContext);
  const [allOrders, setallOrders] = useState(null);
  const secret = process.env.REACT_APP_PAYMENT_SECRET_KEY;
  const { ordercode } = useParams();
  const paymentCookie = getCookie("payment_session_id");

  const viewOrders = useCallback(async () => {
    const { response = [] } = await getAllUserorders(userDetails.orders);
    setallOrders(response);
    return true;
  }, [userDetails.orders]);

  const processOrder = useCallback(
    async () => {
      let { response } = await generateOrder({
        userDetails: { ...userDetails, wishlist: [] },
        items: countUnique(userDetails.wishlist),
        paymentID: ordercode,
        paymentStatus: ordercode + secret === paymentCookie + secret,
      });

      await deleteCookie("payment_session_id");
      let { data } = await regesterUser({
        ...userDetails,
        id: userDetails._id,
        wishlist: [],
        orders: userDetails.orders.concat(response._id),
      });
      setuserDetails(data);
      await sendEmailtoServer({ response });
      toast.success(
        "Order placed successfully!, invoice is sent to your email"
      );
    },
    [userDetails, ordercode, secret, paymentCookie, setuserDetails, toast]
  );

  useEffect(() => {
    if (!userDetails._id) {
      return;
    }
    if (
      (!paymentCookie || !ordercode) &&
      ordercode + secret !== paymentCookie + secret
    ) {
      viewOrders();
      return;
    } else {
      processOrder();
    }
  }, [userDetails, paymentCookie, ordercode, secret, viewOrders, processOrder]);

  return allOrders?.length > 0 ? (
    <Box
      height={"100%"}
      animation={{ duration: 400, type: "fadeIn" }}
      pad={"small"}
      margin={{ left: "small" }}
      gap="20px"
    >
      {allOrders?.reverse().map((o, i) => {
        return (
          <OrderCard
            adminSettings={adminSettings}
            toast={toast}
            ele={o}
            i={i}
            navigate={navigate}
            viewOrders={viewOrders}
          />
        );
      })}
    </Box>
  ) : allOrders === null ? (
    <Spinner center={true} msg="Loading your orders please wait ..." />
  ) : (
    <Box
      animation={{ duration: 400, type: "fadeIn" }}
      style={{
        position: "absolute",
        top: "30%",
        left: "35%",
        transform: "translate(-50% -50%)",
      }}
    >
      <Image
        margin={"small"}
        alignSelf="center"
        src={adminSettings.noOrderImg}
      />
      <Text weight={"bold"}>
        Don't miss out on our amazing products, place your order today!
      </Text>
    </Box>
  );
};
export default memo(Orders);
