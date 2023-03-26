import React, { memo } from "react";

import { Spinner as CircularProgress } from "grommet";
import { Box, Text } from "grommet";

const Spinner = (props) => {
  return props.center === true ? (
    <Box
      animation={{ duration: 400, type: "fadeIn" }}
      style={{
        position: "absolute",
        top: "50%",
        left: "45%",
        transform: "translate(-50% -50%)",
      }}
    >
      <Box direction="row" gap="20px">
        <Text>{props.msg || ""}</Text>
        <CircularProgress
          color={props.color || "green"}
          size={props.size || "small"}
        />
      </Box>
    </Box>
  ) : (
    <CircularProgress
      color={props.color || "green"}
      size={props.size || "small"}
    />
  );
};

export default memo(Spinner);
