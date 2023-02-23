import React, { useState } from "react";
import { Text, Box, Image, Spinner } from "grommet";
import { Button, Divider, Rating } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  handleAddtoCart,
  handleRemoveFromCart,
} from "../../controllers/cartcomtroller";

const WishListCard = ({ ele, setuserDetails, userDetails }) => {
  const [buttonBissabled, setbuttonBissabled] = useState({
    del: false,
    add: false,
  });
  return (
    <Box
      animation={{ duration: 400, type: "fadeIn" }}
      elevation="large"
      pad={"10px"}
      direction="row"
      width={"100%"}
      style={{ borderBottom: "1px solid black" }}
      height={{ min: "150px" }}
      gap="10px"
    >
      <Image src={ele.images[0]} fit="contain" />
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        direction="column"
        width={"350px"}
        overflow={{ horizontal: "hidden" }}
      >
        <Text size="small"> {ele.description.slice(0, 70) + "..."}</Text>

        <Box
          animation={{ duration: 400, type: "fadeIn" }}
          direction="row"
          align="center"
        >
          <Rating
            sx={{ alignSelf: "start" }}
            name="read-only"
            value={Number(ele.rating)}
            readOnly
            precision={0.1}
          />
          <Text size="small" style={{ margin: "0px 7px" }}>
            {ele.rating} Ratings I
          </Text>
          <Text size="small">{ele.numberOfReviews} Reviews</Text>
        </Box>
        <Divider orientation="horizontal" />
        <Text style={{ padding: "5px 0px" }} size="22px">
          ₹{ele.price}
          <Text style={{ paddingLeft: "7px" }}>
            <Text style={{ margin: "0px 6px" }} size="13px">
              M.R.P
            </Text>
            <del>{Number(ele.price) + (100 * Number(ele.discount)) / 100}</del>
            <Text style={{ margin: "0px 6px" }} color="red" size="14px">
              {ele.discount}% off
            </Text>
          </Text>
        </Text>
        <Box
          animation={{ duration: 400, type: "fadeIn" }}
          direction="row"
          gap="10px"
        >
          <Button
            onClick={async () => {
              setbuttonBissabled({ del: true, add: false });
              await handleRemoveFromCart(ele, userDetails, setuserDetails);
              setbuttonBissabled({ del: false, add: false });
            }}
            title="Delete from Cart"
            variant="contained"
            color="error"
            size="small"
            sx={{ p: 0, m: 0, minWidth: "30px" }}
          >
            {!buttonBissabled.del ? (
              <DeleteIcon />
            ) : (
              <Spinner color={"#F2F2F2"} />
            )}
          </Button>

          <Button
            title="Add to cart"
            onClick={async () => {
              setbuttonBissabled({ del: false, add: true });
              await handleAddtoCart(ele, userDetails, setuserDetails);
              setbuttonBissabled({ del: false, add: false });
            }}
            variant="contained"
            color="success"
            size="small"
            sx={{ p: 0, m: 0, minWidth: "30px" }}
          >
            {!buttonBissabled.add ? (
              <AddBoxIcon />
            ) : (
              <Spinner color={"#F2F2F2"} />
            )}
          </Button>

          <Text size="small">Quantity {ele.count}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default WishListCard;
