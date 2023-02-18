import { Box, Carousel, Image } from "grommet";
import React, { useEffect, useState, useContext } from "react";
import Categorys from "./Categorys";
import { Emitter } from "../../utils/eventemmiter";
import { AdminSettingsContext } from "../../App";

const MainScreen = ({ userDetails, navigate, toast, allcatagories }) => {
  const { adminSettings, setadminSettings } = useContext(AdminSettingsContext);
  console.log(adminSettings);

  useEffect(() => {
    Emitter.on("FIRST_EMIT", (val) => console.log(val));
  }, []);

  return (
    <Box id="allMightyBox">
      <Box>
        <Categorys {...{ Emitter, allcatagories }} />
      </Box>
      <Box>
        <Box overflow="hidden" margin={{ vertical: "small" }}>
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
  );
};

export default MainScreen;
