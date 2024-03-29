import { Box, Image } from "grommet";
import React, { useEffect, useContext, memo } from "react";
import Categorys from "./Categorys";
import { Emitter } from "../../utils/eventemmiter";
import { AdminSettingsContext } from "../../App";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TopDiscountedProducts from "./TopDiscountedProducts";

const MainScreen = ({ userDetails, navigate, toast, allcatagories }) => {
  const { adminSettings } = useContext(AdminSettingsContext);

  useEffect(() => {
    Emitter.on("FIRST_EMIT", (val) => console.log(val));
  }, []);

  return (
    <Box animation={{ duration: 400, type: "fadeIn" }} id="allMightyBox">
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        style={{ position: "relative", zIndex: 2 }}
        margin={{ top: "10px" }}
      >
        <Categorys {...{ Emitter, allcatagories }} />

        <Box
          animation={{ duration: 400, type: "fadeIn" }}
          style={{ position: "absolute", top: "80%", zIndex: 0 }}
        >
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            showArrows={false}
            interval={5000}
          >
            {adminSettings?.images?.map((ele, i) => (
              <div className="image" key={i}>
                <Image fit="cover" src={ele} loading="lazy" />
                <div className="fade"></div>
              </div>
            ))}
          </Carousel>
        </Box>
      </Box>
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        style={{ zIndex: 2 }}
        height="50vh"
      ></Box>
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        id="productListing"
        style={{ zIndex: 3 }}
        margin={{ bottom: "30rem", horizontal: "small" }}
      >
        <TopDiscountedProducts navigate={navigate} userDetails={userDetails} />
      </Box>
    </Box>
  );
};

export default memo(MainScreen);
