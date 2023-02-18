import React, { useEffect } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment, TextField } from "@mui/material";
import { Box, Text } from "grommet";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Address = ({ userAddress }) => {
  return userAddress?.data?.length > 0 ? (
    <Autocomplete
      defaultValue={userAddress.data[0].label}
      disablePortal
      id="combo-box-demo"
      options={userAddress.data}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          
        />
      )}
    />
  ) : (
    <Text size="small">Fetching Address...</Text>
  );
};

export default Address;
