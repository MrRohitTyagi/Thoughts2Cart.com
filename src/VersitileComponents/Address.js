import React, { memo, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Text } from "grommet";
import { addressFinder } from "../utils/helpFunctions";

const Address = () => {
  const [userAddress, setuserAddress] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (posi) => {
      let { data } = await addressFinder({
        lat: posi.coords.latitude,
        long: posi.coords.longitude,
      });
      setuserAddress(data);
    });
  }, []);

  return userAddress?.data?.length > 0 ? (
    <Autocomplete
      defaultValue={userAddress.data[0].label}
      disablePortal
      id="combo-box-demo"
      options={userAddress.data}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField variant="standard" {...params} />}
    />
  ) : (
    <Text size="small">Fetching Address...</Text>
  );
};

export default memo(Address);
