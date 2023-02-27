import { TextField } from "@mui/material";
import { Box, Grid } from "grommet";
import React from "react";

const ConfirmDetailsForm = ({
  userDetails,
  setuserDetails,
  values,
  handleChange,
  touched,
  errors,
}) => {
  let obj = {
    name: values.name,
    email: values.email,
    phone: values.phone,
  };
  return (
    <Box gap="20px">
      <Grid
        columns={[
          ["small", "large"],
          ["small", "large"],
        ]}
        gap="20px"
      >
        {Object.entries(obj).map((ele, i) => {
          return (
            <TextField
              spellCheck={false}
              readonly
              size="small"
              type={"text"}
              fullWidth
              id={ele[0]}
              label={ele[0].toUpperCase()}
              value={ele[1]}
            />
          );
        })}
      </Grid>

      <TextField
        spellCheck={false}
        readonly
        size="small"
        type={"text"}
        fullWidth
        label={"Full Address"}
        value={`${values.address}, ${values.district}, ${values.state}, ${values.country}`}
      />
    </Box>
  );
};

export default ConfirmDetailsForm;
