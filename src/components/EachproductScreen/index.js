import React, { memo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Image,
  Card,
  Spinner as OnlySpinner,
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
import { dateNDaysAhead, productUrlCopy } from "../../utils/helpFunctions";
import { Button, Divider, Rating, Tooltip } from "@mui/material";
import { UserDetailsContext } from "../../App";
import { handleAddtoCart } from "../../controllers/cartcomtroller";
import Spinner from "../../assets/Spinner";

const EachProductScreen = () => {
  const navigate = useNavigate();
  const { userDetails, setuserDetails } = useContext(UserDetailsContext);
  const [productDetails, setproductDetails] = useState({});
  const [currentImage, setcurrentImage] = useState("");

  let { id } = useParams();

  useEffect(() => {
    (async function fetchSingleProduct() {
      let { data } = await getSingleProduct(id);
      setproductDetails(data.response);
    })();
  }, [id]);

  const props = {
    width: 400,
    height: 500,
  };

  return !!productDetails ? (
    <Box
      animation={{ duration: 400, type: "fadeIn" }}
      pad="small"
      style={{ position: "relative" }}
    >
      <Grid columns={["34%", "40%", "25%"]} gap="small">
        {productDetails?.images?.length > 0 ? (
          <Box
            animation={{ duration: 400, type: "fadeIn" }}
            direction="row"
            gap="20px"
          >
            <Box
              animation={{ duration: 400, type: "fadeIn" }}
              direction="column"
              gap="20px"
            >
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
              animation={{ duration: 400, type: "fadeIn" }}
              style={{
                borderRadius: "5px",
                position: "sticky",
                top: "10px",
              }}
            >
              <ReactImageZoom
                {...props}
                img={currentImage ? currentImage : productDetails.images[0]}
              />
            </Box>
          </Box>
        ) : (
          <>No Image</>
        )}
        <Box animation={{ duration: 400, type: "fadeIn" }}>
          {!!productDetails && <MiddleSection ele={productDetails} />}
        </Box>
        <Box animation={{ duration: 400, type: "fadeIn" }}>
          {!!productDetails && (
            <ProductPagesideCard
              navigate={navigate}
              ele={productDetails}
              userDetails={userDetails}
              setuserDetails={setuserDetails}
            />
          )}
        </Box>
      </Grid>
    </Box>
  ) : (
    <Spinner msg="Fetching Product details please wait" center />
  );
};

function ProductPagesideCard({ ele, userDetails, setuserDetails, navigate }) {
  const [buttonBissabled, setbuttonBissabled] = useState({
    del: false,
    add: false,
  });
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
          <>
            <Text color={"green"} size="large" style={{ padding: "10px 0px" }}>
              In Stock
            </Text>{" "}
            <Text size="small"> {ele.stock} items left</Text>
          </>
        ) : (
          <Text color={"red"} size="large" style={{ padding: "10px 0px" }}>
            {" "}
            Out of Stock {ele.stock} items left
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
          onClick={async () => {
            setbuttonBissabled({ del: true, add: true });
            await handleAddtoCart(ele, userDetails, setuserDetails);
            setbuttonBissabled({ del: true, add: false });
          }}
          disabled={buttonBissabled.add}
          sx={{ my: "5px" }}
          size="small"
          variant="contained"
          color="info"
        >
          {!buttonBissabled.add ? (
            "  Add to cart"
          ) : (
            <OnlySpinner color={"#F2F2F2"} />
          )}
        </Button>
        <Button
          onClick={() => {
            navigate("/checkout");
          }}
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
          <ShareOption
            color="plain"
            onClick={() => {
              productUrlCopy(ele._id);
            }}
          />
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

function MiddleSection({ ele }) {
  return (
    <Box
      animation={{ duration: 400, type: "fadeIn" }}
      style={{ flexWrap: "wrap" }}
      direction="column"
    >
      <Text size="large">{ele.description}</Text>

      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        direction="row"
        align="center"
      >
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

export default memo(EachProductScreen);
