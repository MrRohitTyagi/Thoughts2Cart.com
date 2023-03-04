import { Button, Rating } from "@mui/material";
import { Favorite, ShareOption, Home } from "grommet-icons";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Box,
  Spinner,
} from "grommet/components";
import React, { useState } from "react";
import styled from "styled-components";
import { dateNDaysAhead, productUrlCopy } from "../../utils/helpFunctions";
import { UserDetailsContext } from "../../App";
import { useContext } from "react";
import { handleAddtoCart } from "../../controllers/cartcomtroller";

let EnhancedCard = styled(Card)`
  border: none;
  transition: scale 100ms ease-in-out;
  &:hover {
    box-shadow: 0 0 1px 1px #121921 !important;
  }
  &:focus {
    box-shadow: 0 0 3px 2px #121921 !important;
  }
`;

const MobileCard = ({ ele, onClick }) => {
  const [buttonBissabled, setbuttonBissabled] = useState({
    del: false,
    add: false,
  });
  let { userDetails, setuserDetails } = useContext(UserDetailsContext);

  //  const handleAddtoCart = async (ele, userDetails,setuserDetails) => {
  //     let updatedUserDetails = {
  //       ...userDetails,
  //       wishlist: [...(userDetails.wishlist || []), ele],
  //       id: userDetails._id,
  //     };
  //     let { data } = await regesterUser(updatedUserDetails);
  //     setuserDetails(data);
  //   };

  return (
    <EnhancedCard
      style={{ borderRadius: "5px" }}
      border="none"
      height="500px"
      width="320px"
      background="light-1"
      margin={"small"}
    >
      {/* <CardHeader pad="medium">Header</CardHeader> */}
      <CardBody pad="medium" onClick={() => onClick(ele)}>
        <Image src={ele.images[0]} fit style={{ paddingBottom: "10px" }} />
        <Text size="small">{ele.description.slice(0, 200)}...</Text>
        <Text size="small" textAlign="center" alignSelf="start">
          {ele.rating}
          <Rating
            sx={{ fontSize: "1.2rem", p: "10px", alignSelf: "end" }}
            name="read-only"
            value={ele.rating}
            readOnly
            precision={0.1}
          />
          <Text size="small" color={"red"}>
            ({ele.numberOfReviews})
          </Text>
        </Text>
        {ele.discount > 30 && (
          <Button
            sx={{
              background: "#b12603",
              alignSelf: "start",
              p: 0.5,
              height: "20px",
              fontSize: "10px",
            }}
            size="small"
            variant="contained"
          >
            Limited time deal
          </Button>
        )}
        <Text size="large" style={{ padding: "5px 0px" }}>
          ₹{ele.price}
          <Text style={{ paddingLeft: "7px" }} size="15px" weight={"bold"}>
            <Text size="12px"> M.R.P</Text>
            <del> {Number(ele.price) + (100 * Number(ele.discount)) / 100}</del>
          </Text>
        </Text>
        <Box
          animation={{ duration: 400, type: "fadeIn" }}
          align="center"
          direction="row"
        >
          <Text size="small">
            <Home size="15px" color="navy" /> Get it by
            <strong> {dateNDaysAhead(ele.deliveryTime)} </strong>
          </Text>
        </Box>
      </CardBody>
      <CardFooter pad={{ horizontal: "small" }} background="light-2">
        <Button>
          <Favorite color="red" />
        </Button>

        <Button
          onClick={async () => {
            setbuttonBissabled({ del: false, add: true });
            await handleAddtoCart(ele, userDetails, setuserDetails);
            setbuttonBissabled({ del: false, add: false });
          }}
          disabled={buttonBissabled.add}
          sx={{ scale: "0.9" }}
          size="small"
          variant="contained"
          color="info"
        >
          {!buttonBissabled.add ? (
            "  Add to cart"
          ) : (
            <Spinner color={"#F2F2F2"} />
          )}
        </Button>

        <Button
          onClick={() => {
            productUrlCopy(ele._id);
          }}
        >
          <ShareOption color="plain" />
        </Button>
      </CardFooter>
    </EnhancedCard>
  );
};

export default MobileCard;
