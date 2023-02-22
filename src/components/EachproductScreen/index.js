import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Spinner,
  Image,
  Card,
  CardBody,
  CardFooter,
  Text,
  CardHeader,
  Anchor,
} from "grommet";
import { Deliver, Favorite, ShareOption, Location } from "grommet-icons";
import { useEffect } from "react";
import { getSingleProduct } from "../../controllers/productController";
import { useState } from "react";
import ReactImageZoom from "react-image-zoom";
import { dateNDaysAhead } from "../../utils/helpFunctions";
import { Button, Divider, Rating, Tooltip } from "@mui/material";

const EachProductScreen = () => {
  const [productDetails, setproductDetails] = useState({});
  const [currentImage, setcurrentImage] = useState("");

  let { id } = useParams();
  console.log(
    "%c currentImage ",
    "color: red;border:1px solid red",
    currentImage
  );
  useEffect(() => {
    (async function fetchSingleProduct() {
      let { data } = await getSingleProduct(id);
      console.log(data);
      setproductDetails(data.response);
    })();
  }, []);

  const props = {
    width: 400,
    height: 500,
    zoomWidth: 500,
  };

  return !!productDetails ? (
    <Box pad="small" style={{ position: "relative" }}>
      <Grid columns={["34%", "40%", "25%"]} gap="small">
        {productDetails?.images?.length > 0 ? (
          <Box direction="row" gap="20px">
            <Box direction="column" gap="20px">
              {productDetails?.images?.map((ele, i) => {
                return (
                  <Image
                    key={i}
                    onMouseEnter={(e) => {
                      setcurrentImage(ele);
                    }}
                    style={{
                      border: "2px solid #121921",
                      borderRadius: "5px",
                      zIndex: 23,
                    }}
                    src={ele}
                    height={"40px"}
                    width="40px"
                  />
                );
              })}
            </Box>
            <Box
              style={{ borderRadius: "5px", position: "sticky", top: "10px" }}
            >
              <ReactImageZoom
                {...props}
                img={currentImage ? currentImage : productDetails.images[0]}
              />
            </Box>
          </Box>
        ) : (
          <>no</>
        )}
        <Box>{!!productDetails && <MiddleSection ele={productDetails} />}</Box>
        <Box>
          {!!productDetails && <ProductPagesideCard ele={productDetails} />}
        </Box>
      </Grid>
    </Box>
  ) : (
    <Box
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50% -50%)",
      }}
    >
      <Spinner size="medium" />
    </Box>
  );
};

function ProductPagesideCard({ ele }) {
  console.log(ele);
  return (
    <Card
      style={{ borderRadius: "5px" }}
      pad={"medium"}
      border="none"
      height="100%"
      //   width="320px"
      background="light-1"
      margin={"small"}
    >
      <CardHeader>
        <Text style={{ padding: "10px 0px" }} size="xlarge">
          ₹{ele.price}
          <Text style={{ paddingLeft: "7px" }} size="12px">
            <del> {Number(ele.price) + (100 * Number(ele.discount)) / 100}</del>
          </Text>
        </Text>
      </CardHeader>
      <CardBody>
        <Text size="small" style={{ padding: "7px 0px" }}>
          <Deliver size="15px" color="navy" />
          {"  "} Get it by
          <strong> {dateNDaysAhead(ele.deliveryTime)} </strong>
        </Text>
        <Text size="small" textAlign="center" alignSelf="start">
          {ele.rating}
          <Rating
            sx={{ fontSize: "1.2rem", p: "10px", alignSelf: "end" }}
            name="read-only"
            value={Number(ele.rating)}
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
        <Anchor size="small" style={{ padding: "10px 0px" }}>
          <Location size="14px" />
          Select delivery location
        </Anchor>
        {ele.stock > 0 ? (
          <Text color={"green"} size="large" style={{ padding: "10px 0px" }}>
            In Stock
          </Text>
        ) : (
          <Text color={"red"} size="large" style={{ padding: "10px 0px" }}>
            {" "}
            Out of Stock
          </Text>
        )}
        <Text style={{ padding: "10px 0px" }}>
          Sold by
          <Text color={"#567e85"} style={{ fontFamily: "sans-serif" }}>
            Tyagi Products Private Ltd
          </Text>{" "}
          and Fullfilled by Thoughts2Cart.com
        </Text>
        <Button
          sx={{ my: "5px" }}
          size="small"
          variant="contained"
          color="info"
        >
          Add to cart
        </Button>
        <Button
          sx={{ my: "5px" }}
          size="small"
          variant="contained"
          color="success"
        >
          Buy Now
        </Button>
      </CardBody>

      <CardFooter pad={{ horizontal: "small" }} background="light-2">
        <Tooltip title="Add to Wishlist">
          <Favorite color="red" />
        </Tooltip>

        <Tooltip title="Share">
          <ShareOption color="plain" />
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

function MiddleSection({ ele }) {
  return (
    <Box style={{ flexWrap: "wrap" }} direction="column">
      <Text size="large">{ele.description}</Text>
      <Box direction="row" align="center">
        <Rating
          sx={{ py: "10px", alignSelf: "start" }}
          name="read-only"
          value={Number(ele.rating)}
          readOnly
          precision={0.1}
        />
        <Text style={{ margin: "0px 20px" }}> {ele.rating} Ratings I</Text>
        <Text>{ele.numberOfReviews} Reviews</Text>
      </Box>
      <Divider orientation="horizontal" />
      <Text style={{ padding: "5px 0px" }} size="50px">
        ₹{ele.price}
      </Text>
      <Text style={{ paddingLeft: "7px" }} size="25px">
        <Text style={{ margin: "0px 6px" }} size="12px">
          M.R.P
        </Text>
        <del>{Number(ele.price) + (100 * Number(ele.discount)) / 100}</del>
        <Text style={{ margin: "0px 6px" }} color="red" size="22px">
          {ele.discount}% off
        </Text>
        <br />
        <Text size="15px" color={"#567e85"}>
          Inclusive of all taxes
        </Text>
        <Divider orientation="horizontal" />
      </Text>
    </Box>
  );
}

export default EachProductScreen;
