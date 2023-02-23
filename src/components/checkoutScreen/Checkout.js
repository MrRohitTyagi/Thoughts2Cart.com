import { Button } from "@mui/material";
import { Box, Grid, Image, Text } from "grommet";
import React from "react";
import { countUnique } from "../../controllers/cartcomtroller";
import WishListCard from "../../VersitileComponents/productCards/WishListCard";
import CheckoutForm from "./CheckoutForm";

const Checkout = ({ userDetails, setuserDetails, toast, allcatagories }) => {
  return (
    <Box pad={"small"}>
      <Grid columns={["40%", "60%"]} gap={"20px"}>
        <Box>
          {userDetails?.wishlist?.length > 0 ? (
            <Box
              animation={{ duration: 400, type: "fadeIn" }}
              overflow={{ vertical: "auto" }}
              direction="column"
              height={{ max: "100vh" }}
              gap="10px"
            >
              {countUnique(userDetails?.wishlist).map((ele) => {
                return (
                  <WishListCard
                    ele={ele}
                    userDetails={userDetails}
                    setuserDetails={setuserDetails}
                  />
                );
              })}
            </Box>
          ) : (
            <Box
              animation={{ duration: 400, type: "fadeIn" }}
              height={{ min: "100vh" }}
            >
              <Image src="https://res.cloudinary.com/derplm8c6/image/upload/v1677115012/pngfind.com-cart-png-2727925_kbkctd.png" />
              <Text
                style={{ margin: "20px" }}
                size="large"
                alignSelf="center"
                textAlign="center"
              >
                Looks like you have not added anything to your cart. Go ahead &
                explore top categories
              </Text>
              <Button
                sx={{ alignSelf: "center" }}
                variant="contained"
                color="success"
              >
                Continue shopping!
              </Button>
            </Box>
          )}
        </Box>
        <CheckoutForm />
      </Grid>
    </Box>
  );
};

export default Checkout;
