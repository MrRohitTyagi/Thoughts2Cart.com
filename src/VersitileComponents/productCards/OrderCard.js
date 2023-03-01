import { Button, Divider } from "@mui/material";
import { Box } from "grommet";
import React from "react";
import WishListCard from "./WishListCard";

const OrderCard = ({ ele, navigate }) => {
  console.log(ele);
  return (
    <Box border pad="small" width={{ min: "80vw" }} background="#F2EBEB">
      <Box></Box>
      <Divider />
      <Box width={{ max: "450px" }}>
        {ele?.orderItems?.map((o) => {
          return (
            <WishListCard
              children={
                <>
                  <Button size="small" variant="outlined" color="info">
                    View your item
                  </Button>
                </>
              }
              cardHeight="120px"
              type="orders"
              imgHeight="100px"
              ele={{ ...o, images: o.image, description: o.name }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default OrderCard;
