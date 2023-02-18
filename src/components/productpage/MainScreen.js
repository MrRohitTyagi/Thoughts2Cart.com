import { Box, Carousel, Image } from "grommet";
import React, { useEffect, useContext } from "react";
import Categorys from "./Categorys";
import { Emitter } from "../../utils/eventemmiter";
import { AdminSettingsContext } from "../../App";

const MainScreen = ({ userDetails, navigate, toast, allcatagories }) => {
  const { adminSettings } = useContext(AdminSettingsContext);

  useEffect(() => {
    Emitter.on("FIRST_EMIT", (val) => console.log(val));
  }, []);

  return (
    <Box id="allMightyBox">
      <Box style={{ position: "relative" }}>
        <Categorys {...{ Emitter, allcatagories }} />

        <Box style={{ position: "absolute", top: "100%", zIndex: 0 }}>
          <Box id="bgCarousel" overflow="hidden">
            <Carousel fill width={"100%"} controls="arrows" play={5000}>
              {adminSettings?.images?.map((ele) => (
                <div className="image">
                  <Image fit="cover" src={ele} />
                  <div class="fade"></div>
                </div>
              ))}
            </Carousel>
          </Box>
        </Box>
      </Box>
      <Box style={{ zIndex: 2 }} height="50vh"></Box>
      <Box id="productListing" style={{ zIndex: 3 }}>
        kk
      </Box>
    </Box>
  );
};

export default MainScreen;
