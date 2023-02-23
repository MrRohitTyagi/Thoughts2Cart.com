import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "grommet";

const Spinner = (props) => {
  return props.center === true ? (
    <Box 
        animation={{ duration: 400, type: "fadeIn" }}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50% -50%)",
      }}
    >
      <CircularProgress
        color={props.color || "success"}
        size={props.size || "20px"}
      />
    </Box>
  ) : (
    <CircularProgress
      color={props.color || "success"}
      size={props.size || "20px"}
    />
  );
};

export default Spinner;
