import React from "react";
import { Layer, Box, Text } from "grommet";
import CloseIcon from "@mui/icons-material/Close";
import { StyledButton } from "../assets/StyledItems";
import WishListCard from "../VersitileComponents/productCards/WishListCard";

const CartItems = ({ userDetails, setuserDetails, toast, setcartLayer }) => {
  console.log(
    "%c userDetails ",
    "color: green;border:1px solid green",
    userDetails
  );
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
          left: "-3%",
          width: "15px",
          position: "absolute",
          zIndex: 0,
          top: "-5px",
          background: "#5C4033",
          color: "#F2F2F2",
        }}
        startIcon={<CloseIcon />}
      ></StyledButton>{" "}
      <Box
        background={"#F2F2F2"}
        animation={{ duration: 500, type: "fadeIn" }}
        pad={"small"}
        style={{ color: "#5C4033", overflowY: "auto" }}
        margin="small"
        elevation="large"
        round="small"
      >
        <Box
          overflow={{ vertical: "auto" }}
          direction="column"
          height={{ min: "100vh" }}
          gap="10px"
        >
          {userDetails.wishlist.reverse().map((ele) => {
            return (
              <WishListCard
                ele={ele}
                userDetails={userDetails}
                setuserDetails={setuserDetails}
              />
            );
          })}
        </Box>
      </Box>
    </Layer>
  );
};

export default CartItems;
