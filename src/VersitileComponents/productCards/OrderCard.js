import { Button, Dialog, Tooltip } from "@mui/material";
import { Box, Grid, Text, Button as Gbutton, Image, Spinner } from "grommet";
import React, { memo, useState } from "react";
import WishListCard from "./WishListCard";
import {
  convertDatetime,
  addAllPrices,
  toTitleCase,
  getDateNDaysAheadOfAGivenDate,
} from "../../utils/helpFunctions";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteOrder } from "../../controllers/orderRoute";

const OrderCard = ({ ele, i, viewOrders, toast, adminSettings }) => {
  const [open, setopen] = useState(false);
  const [deleting, setdeleting] = useState(false);
  let { successPng = "" } = adminSettings;
  return (
    <Box
      direction="row"
      style={{ position: "relative", border: "2px solid", margin: "20px 0px" }}
      align="center"
    >
      <Text weight={"bold"} size="large" style={{ padding: "5px 15px" }}>
        {++i}
      </Text>
      <Box style={{ borderLeft: "2px solid" }}>
        <Grid
          columns={["40%", "60%"]}
          // pad="small"
          width="70vw"
          background="#F2EBEB"
        >
          <Box
            height={{ max: "250px" }}
            overflow={{ vertical: "scroll" }}
            pad={{ right: "small" }}
          >
            {ele?.orderItems?.map((o) => {
              return (
                <WishListCard
                  cardHeight="120px"
                  type="orders"
                  imgHeight="100px"
                  ele={{
                    ...o,
                    images: o.image,
                    description: o.name,
                    count: o.quantity,
                  }}
                />
              );
            })}
          </Box>
          <Box border={{ side: "left", style: "double" }} height="100%">
            <Box
              background="#F2EBEA"
              id="top"
              border={{ side: "bottom", style: "solid" }}
              height="100px"
              direction="row"
              justify="between"
              gap="10px"
              pad={"small"}
              align="center"
            >
              <Box direction="column" alignSelf="start">
                <Text>Order Placed</Text>
                <Text size="small">{convertDatetime(ele.createdAt || "")}</Text>
              </Box>

              <Box direction="column" alignSelf="start">
                <Text>Total</Text>
                <Text size="small">₹{addAllPrices(ele.orderItems)}</Text>
              </Box>

              <Box direction="column" alignSelf="start">
                <Text>Ship to</Text>
                <Gbutton
                  size="small"
                  plain
                  label={
                    toTitleCase(ele.shippingInfo.address.slice(0, 15)) + "..."
                  }
                  tip={toTitleCase(
                    ele.shippingInfo.address +
                      " " +
                      ele.shippingInfo.state +
                      " " +
                      ele.shippingInfo.city +
                      " " +
                      ele.shippingInfo.country
                  )}
                />
              </Box>

              <Box direction="column" alignSelf="start">
                <Text>Order #</Text>
                <Text size="small">{ele._id}</Text>
              </Box>
            </Box>
            <Box
              height={"100%"}
              pad={"small"}
              direction="column"
              justify="evenly"
            >
              <Text>
                Deliverd By{" : "}
                <Text weight={"bold"}>
                  {getDateNDaysAheadOfAGivenDate(
                    ele.createdAt,
                    ele.deliveredAt
                  )}
                </Text>
              </Text>

              <Text>
                Order Status : <Text weight={"bold"}>{ele.orderStatus}</Text>
              </Text>
              <Text>
                Payment Status :{" "}
                <Button
                  color={
                    ele.paymentInfo.status === "success" ? "success" : "warning"
                  }
                  weight={"bold"}
                >
                  {ele.paymentInfo.status}
                </Button>
              </Text>
            </Box>
          </Box>
        </Grid>
        <Image
          src={successPng}
          height="50px"
          style={{ position: "absolute", top: "-20px", left: "-20px" }}
        />
        <Button
          onClick={() => setopen(true)}
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
          }}
          endIcon={
            <Tooltip title={<Text weight={"bold"}>Delete Order</Text>}>
              <DeleteIcon
                sx={{
                  color: "red",
                  scale: "1.4",
                  "&:hover": {
                    scale: "1.6",
                  },
                }}
              />
            </Tooltip>
          }
        ></Button>
      </Box>
      <Dialog
        onClose={() => {
          setopen(false);
        }}
        open={open}
      >
        <Box background={"#f2f2f2"} pad="small">
          <Text>Do you really want to delete order ?</Text>
          <Box direction="row" gap="10px" pad="small">
            <Button
              disabled={deleting}
              variant="contained"
              color="warning"
              fullWidth
              onClick={async () => {
                setdeleting(true);
                await deleteOrder(ele._id);
                await viewOrders();
                setdeleting(false);
                toast.success("Order deleted successfully");
              }}
            >
              {deleting ? <Spinner /> : "Yes"}
            </Button>
            <Button
              disabled={deleting}
              variant="contained"
              color="success"
              fullWidth
              onClick={() => {
                setopen(false);
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default memo(OrderCard);
