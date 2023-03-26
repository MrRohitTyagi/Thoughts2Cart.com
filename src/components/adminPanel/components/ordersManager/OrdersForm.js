import React, { useEffect, useState } from "react";
import { Box, Layer, Text, Grid, Button as Gbutton } from "grommet";
import ForwardIcon from "@mui/icons-material/Forward";
import { useFormik } from "formik";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

import {
  Button,
  IconButton,
  TextField,
  Avatar,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  addAllPrices,
  convertDatetime,
  encodeImageFileAsURL,
  getDateNDaysAheadOfAGivenDate,
  toTitleCase,
  uploadImage,
} from "../../../../utils/helpFunctions";
import { StyledButton } from "../../../../assets/StyledItems";

import {
  deletecategory,
  regestercategory,
} from "../../../../controllers/categoryController";
import { Add, Trash } from "grommet-icons";
import WishListCard from "../../../../VersitileComponents/productCards/WishListCard";
import { deleteOrder, updateOrder } from "../../../../controllers/orderRoute";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  image: yup.string(),
  subCategory: yup.array(),
});

const EditOrderForm = ({
  toast,
  editProductLayer,
  fetchAllOrders,
  seteditProductLayer,
}) => {
  const formik = useFormik({
    initialValues: {
      orderStatus: editProductLayer?.orderStatus || "",
      id: editProductLayer?._id || "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {},
  });
  console.log(editProductLayer);
  const handleSubmit = async (orderStatus) => {
    try {
      const updatedData = {
        ...editProductLayer,
        orderStatus: orderStatus,
      };
      await updateOrder(updatedData);
      await fetchAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layer
      onEsc={() => {
        seteditProductLayer(false);
      }}
      position="right"
      style={{ height: "100vh", width: "600px", background: "#ded5bf" }}
    >
      <StyledButton
        onClick={() => {
          seteditProductLayer(false);
        }}
        variant="contained"
        color="info"
        sx={{
          left: "-5%",
          top: "50%",
          position: "absolute",
          zIndex: 0,
        }}
        startIcon={<ForwardIcon />}
      ></StyledButton>

      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        style={{ position: "relative" }}
        background={"#F2F2F2"}
        round="small"
        margin={"small"}
        elevation={"large"}
        border
        height={"100%"}
        pad="small"
      >
        <Text margin={{ bottom: "small" }} weight={"bold"}>
          Order Edit Form
        </Text>
        <Box overflow={{ vertical: "auto" }} height={"100%"} width="100%">
          <form id="form" onSubmit={formik.handleSubmit}>
            <Box>
              <Box
                background="#F2EBEA"
                id="top"
                height="80px"
                direction="row"
                justify="between"
                gap="10px"
                pad={"small"}
                align="center"
              >
                <Box direction="column" alignSelf="start">
                  <Text>Order Placed</Text>
                  <Text size="small">
                    {convertDatetime(editProductLayer.createdAt || "")}
                  </Text>
                </Box>

                <Box direction="column" alignSelf="start">
                  <Text>Total</Text>
                  <Text size="small">
                    ₹{addAllPrices(editProductLayer.orderItems)}
                  </Text>
                </Box>

                <Box direction="column" alignSelf="start">
                  <Text>Ship to</Text>
                  <Gbutton
                    size="small"
                    plain
                    label={
                      toTitleCase(
                        editProductLayer.shippingInfo.address.slice(0, 15)
                      ) + "..."
                    }
                    tip={toTitleCase(
                      editProductLayer.shippingInfo.address +
                        " " +
                        editProductLayer.shippingInfo.state +
                        " " +
                        editProductLayer.shippingInfo.city +
                        " " +
                        editProductLayer.shippingInfo.country
                    )}
                  />
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
                      editProductLayer.createdAt,
                      editProductLayer.deliveredAt
                    )}
                  </Text>
                </Text>

                <Text>
                  Order Status :{" "}
                  <Text weight={"bold"}>{editProductLayer.orderStatus}</Text>
                </Text>
                <Text>
                  Payment Status :{" "}
                  <Button
                    color={
                      editProductLayer.paymentInfo.status === "success"
                        ? "success"
                        : "warning"
                    }
                    weight={"bold"}
                  >
                    {editProductLayer.paymentInfo.status}
                  </Button>
                </Text>
              </Box>
            </Box>
            <Divider />
            <Box margin={{ vertical: "small" }}>
              <Text weight={"bold"}>Update Status</Text>
              <Divider />
              <Select
                autoWidth
                size="small"
                value={formik.values.orderStatus}
                label="Age"
                onChange={(e) => {
                  console.log(e.target.value);
                  formik.setFieldValue("orderStatus", e.target.value);
                }}
              >
                <MenuItem value={"Processing"}>Processing</MenuItem>
                <MenuItem value={"Delivered"}>Delivered</MenuItem>
                <MenuItem value={"Failed"}>Failed</MenuItem>
              </Select>
            </Box>
            <Box margin={{ top: "small" }}>
              <Text weight={"bold"}>Order items</Text>
              <Divider />
              {editProductLayer.orderItems.map((o, i) => (
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
              ))}
            </Box>
            <Box
              animation={{ duration: 400, type: "fadeIn" }}
              direction="column"
              gap="20px"
              margin={{ top: "30px" }}
            ></Box>
            <Box
              animation={{ duration: 400, type: "fadeIn" }}
              alignSelf="end"
              direction="row"
              style={{ position: "absolute", bottom: "5px", right: "5px" }}
              gap="20px"
            >
              {editProductLayer?._id && (
                <Button
                  onClick={async () => {
                    await deleteOrder(formik.values.id);
                    await fetchAllOrders();
                    seteditProductLayer(false);
                    toast.success("Order Deleted Successfully !");
                  }}
                  variant="contained"
                  color="error"
                >
                  Delete Order
                </Button>
              )}
              <Button
                onClick={() => handleSubmit(formik.values.orderStatus)}
                // type="submit"
                variant="contained"
                color="success"
              >
                Update order
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Layer>
  );
};

export default EditOrderForm;
