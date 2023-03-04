import React, { useEffect, useState } from "react";
import { getDataforHomeScreen } from "../../controllers/homePageControllers";
import { Box, Grid, Image, Text } from "grommet";
import { toTitleCase } from "../../utils/helpFunctions";
import ScrollContainer from "react-indiana-drag-scroll";

const TopDiscountedProducts = ({ navigate }) => {
  const [allProducts, setallProducts] = useState([]);

  async function getHomeScreenProducts() {
    const { data } = await getDataforHomeScreen(45);
    setallProducts(data.response);
  }

  useEffect(() => {
    getHomeScreenProducts();
  }, []);

  return (
    allProducts.length > 0 && (
      <div>
        <Box
          height={"40px"}
          background="#121921"
          margin={{ vertical: "small" }}
        >
          <Text
            textAlign="center"
            alignSelf="center"
            size="large"
            weight={"bold"}
          >
            Top products with upto 50% discount
          </Text>
        </Box>
        <ScrollContainer
          horizontal
          vertical={false}
          hideScrollbars
          nativeMobileScroll
          className="scroll-container"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          {allProducts?.map((ele, i) => (
            <Grid
              key={i}
              style={{ background: "#121921" }}
              width={{ min: "20vw", max: "20vw" }}
              height={{ min: "40vh", max: "40vh" }}
              border
              rows={["auto", "auto"]}
              columns={["auto", "auto"]}
              gap={"small"}
              pad={"small"}
              justify="center"
            >
              {ele.splice(0, 4)?.map((p, i) => (
                <BasicCard
                  key={i}
                  ele={{ ...p, image: p.images[0] }}
                  navigate={navigate}
                />
              ))}
            </Grid>
          ))}
        </ScrollContainer>
      </div>
    )
  );
};

const BasicCard = ({ ele, navigate }) => {
  return (
    <Box
      onClick={() => {
        navigate(`/product/${ele._id}`);
      }}
      direction="column"
      align="center"
      gap="5px"
      style={{
        borderRadius: "5.5px",

        maxHeight: "7.5vw",
        minHeight: "7.5vw",

        maxWidth: "7.5vw",
        minWidth: "7.5vw",

        flexShrink: 0,
      }}
    >
      <Image
        style={{
          borderRadius: "5px",

          maxHeight: "7vw",
          minHeight: "7vw",

          maxWidth: "7vw",
          minWidth: "7vw",

          flexShrink: 0,
        }}
        fit="cover"
        src={ele.image}
        margin="auto"
      />

      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        direction="row"
        alignSelf="center"
        textAlign="center"
        align="center"
      >
        {/* <Text size={size === "small" || size === "xsmall" ? "10px" : "small"}> */}
        <Text size={"0.8vw"} color="white">
          {toTitleCase(ele.title)}
        </Text>
      </Box>
    </Box>
  );
};
export default TopDiscountedProducts;
