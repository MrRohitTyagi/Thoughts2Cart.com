import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie, deleteCookie } from "../utils/helpFunctions";
import { generateOrder, getAllUserorders } from "../controllers/orderRoute";
import { countUnique } from "../controllers/cartcomtroller";
import { regesterUser } from "../controllers/userController";
import { Box } from "grommet";
import OrderCard from "../VersitileComponents/productCards/OrderCard";
import Spinner from "../assets/Spinner";

const Orders = ({ userDetails, setuserDetails, navigate, toast }) => {
  const [allOrders, setallOrders] = useState([]);
  const secret = process.env.REACT_APP_PAYMENT_SECRET_KEY;
  const { ordercode } = useParams();
  const paymentCookie = getCookie("payment_session_id");

  async function viewOrders() {
    const { response = [] } = await getAllUserorders(userDetails.orders);
    setallOrders(response);
    return;
  }
  async function processOrder(params) {
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
  }

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
  }, [userDetails, paymentCookie, ordercode]);

  return allOrders.length > 0 ? (
    <Box
      height={"100%"}
      animation={{ duration: 400, type: "fadeIn" }}
      pad={"small"}
      margin={{ left: "small" }}
      gap="20px"
    >
      {allOrders.reverse().map((o, i) => {
        return <OrderCard ele={o} i={i} navigate={navigate} />;
      })}
    </Box>
  ) : (
    <Spinner center={true} msg="Loading your orders please wait ..." />
  );
};

export default Orders;
