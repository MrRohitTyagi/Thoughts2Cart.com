import { Box, Image, Text, ResponsiveContext } from "grommet";
import React, { useEffect, useState } from "react";
import { ZoomBox, ZoomImage } from "../../utils/customComponents";
import { CaretDownFill } from "grommet-icons";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BasicCard = ({ ele, size, navigate }) => {
  return (
    <ZoomBox
      direction="column"
      align="center"
      gap="5px"
      onClick={() => {
        navigate(`/category/${ele.name}`);
      }}
    >
      <ZoomImage
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
        <Text size={"1vw"}>{ele.name.toUpperCase()}</Text>
        <CaretDownFill size={"10vw"} />
      </Box>
    </ZoomBox>
  );
};

const Categorys = ({ Emitter, allcatagories }) => {
  const navigate = useNavigate();
  const [finalCategoryArray, setfinalCategoryArray] = useState([]);
  const size = React.useContext(ResponsiveContext);
  let divider =
    size === "small" ? 7 : size === "large" ? 11 : size === "xsmall" ? 5 : 9;

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < allcatagories?.results?.length; i += divider) {
      const chunk = allcatagories?.results?.slice(i, i + divider);
      arr.push(chunk);
      setfinalCategoryArray(arr);
    }
  }, [allcatagories?.results, size]);

  return (
    <>
      <Box animation={{ duration: 400, type: "fadeIn" }} overflow="hidden">
        <Carousel
          emulateTouch
          swipeable
          onClickItem={(e) => {}}
          showStatus={false}
          showIndicators={false}
        >
          {finalCategoryArray?.map((ele) => (
            <Box
              animation={{ duration: 400, type: "fadeIn" }}
              direction="row"
              justify={ele.length < divider ? "center" : "evenly"}
              gap={ele.length < divider ? "40px" : "20px"}
            >
              {ele?.map((ele) => {
                return <BasicCard {...{ ele, size, navigate }} />;
              })}
            </Box>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default Categorys;
