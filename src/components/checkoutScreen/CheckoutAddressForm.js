import { Box, Grid } from "grommet";
import React from "react";
import { TextField } from "@mui/material";

const CheckoutAddressForm = ({
  userDetails,
  setuserDetails,
  values,
  handleChange,
  errors,
  touched,
}) => {
  return (
    <Box
      animation={{ duration: 400, type: "fadeIn" }}
      direction="column"
      gap="20px"
    >
      <Grid
        columns={[
          ["small", "large"],
          ["small", "large"],
        ]}
        gap="10px"
      >
        <TextField
          size="small"
          type={"text"}
          fullWidth
          id="country"
          country="country"
          label="Country"
          value={values.country}
          onChange={handleChange}
          error={touched.country && Boolean(errors.country)}
          helperText={touched.country && errors.country}
        />
        <TextField
          size="small"
          type={"text"}
          fullWidth
          id="state"
          state="state"
          label="State"
          value={values.state}
          onChange={handleChange}
          error={touched.state && Boolean(errors.state)}
          helperText={touched.state && errors.state}
        />
      </Grid>
      <Grid
        columns={[
          ["small", "large"],
          ["small", "large"],
        ]}
        gap="10px"
      >
        <TextField
          size="small"
          type={"text"}
          fullWidth
          id="district"
          district="district"
          label="District"
          value={values.district}
          onChange={handleChange}
          error={touched.district && Boolean(errors.district)}
          helperText={touched.district && errors.district}
        />
        <TextField
          name="address"
          size="small"
          type={"text"}
          fullWidth
          id="address"
          address="address"
          label="Street Address"
          value={values.address}
          onChange={handleChange}
          error={touched.address && Boolean(errors.address)}
          helperText={touched.address && errors.address}
        />
      </Grid>
    </Box>
  );
};

export default CheckoutAddressForm;
