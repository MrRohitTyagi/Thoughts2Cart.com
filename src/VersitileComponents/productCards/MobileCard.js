import { Button, Rating } from "@mui/material";
import { Deliver, Favorite, ShareOption } from "grommet-icons";
import { Card, CardBody, CardFooter, Image, Text } from "grommet/components";
import React from "react";
import styled from "styled-components";
import { dateNDaysAhead } from "../../utils/helpFunctions";

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
  return (
    <EnhancedCard
    style={{borderRadius:'5px'}}
      border="none"
      height="540px"
      width="320px"
      background="light-1"
      margin={"small"}
      onClick={() => onClick(ele)}
    >
      {/* <CardHeader pad="medium">Header</CardHeader> */}
      <CardBody pad="medium">
        <Image src={ele.images[0]} fit style={{ paddingBottom: "10px" }} />
        <Text size="small">{ele.description}</Text>
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
        <Text size="small">
          <Deliver size="15px" color="navy" />
          {"  "} Get it by
          <strong> {dateNDaysAhead(ele.deliveryTime)} </strong>
        </Text>
      </CardBody>
      <CardFooter pad={{ horizontal: "small" }} background="light-2">
        <Button>
          <Favorite color="red" />
        </Button>
        <Button
          sx={{ scale: "0.9" }}
          size="small"
          variant="contained"
          color="info"
        >
          Add to cart
        </Button>
        <Button>
          <ShareOption color="plain" />
        </Button>
      </CardFooter>
    </EnhancedCard>
  );
};

export default MobileCard;
