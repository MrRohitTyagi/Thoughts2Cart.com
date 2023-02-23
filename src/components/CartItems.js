import React from "react";
import { Layer, Box, Text, Image } from "grommet";
import CloseIcon from "@mui/icons-material/Close";
import { StyledButton } from "../assets/StyledItems";
import WishListCard from "../VersitileComponents/productCards/WishListCard";
import { Button } from "@mui/material";

const CartItems = ({ userDetails, setuserDetails, setcartLayer, navigate }) => {
  return (
    <Layer
      position="right"
      full="vertical"
      style={{
        background: "#F2F2F2",
        minWidth: "600px",
        maxWidth: "600px",
        height: "100vh",
        border: "4px solid #5C4033",
      }}
      background={"F2F2F2"}
      onEsc={() => {
        setcartLayer(false);
      }}
    >
      <StyledButton
        onClick={() => {
          setcartLayer(false);
        }}
        variant="contained"
        sx={{
          left: "-5%",
          width: "15px",
          position: "absolute",
          zIndex: 0,
          top: "50%",
          background: "#5C4033",
          color: "#F2F2F2",
        }}
        startIcon={<CloseIcon />}
      ></StyledButton>{" "}
      <Box 
        animation={{ duration: 400, type: "fadeIn" }}
        background={"#F2F2F2"}
        animation={{ duration: 500, type: "fadeIn" }}
        pad={"small"}
        style={{ color: "#5C4033", overflowY: "auto" }}
        margin="small"
        elevation="large"
        round="small"
      >
        {userDetails.wishlist.length > 0 && (
          <Button
            onClick={() => {
              setcartLayer(false);
              navigate("/checkout");
            }}
            sx={{ alignSelf: "end" }}
            variant="contained"
            color="success"
          >
            Proceed to checkout
          </Button>
        )}
        {userDetails.wishlist.length > 0 ? (
          <Box 
        animation={{ duration: 400, type: "fadeIn" }}
            overflow={{ vertical: "auto" }}
            direction="column"
            height={{ min: "100vh" }}
            gap="10px"
          >
            {userDetails.wishlist.map((ele) => {
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
        animation={{ duration: 400, type: "fadeIn" }} height={{ min: "100vh" }}>
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
              onClick={() => {
                setcartLayer(false);
              }}
              sx={{ alignSelf: "center" }}
              variant="contained"
              color="success"
            >
              Continue shopping!
            </Button>
          </Box>
        )}
      </Box>
    </Layer>
  );
};

export default CartItems;
