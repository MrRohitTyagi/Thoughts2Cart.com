import { Box, Grid } from "grommet";
import React, { useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";
import CountrySelect from "../../VersitileComponents/CountrySelect";
import {
  getAllCountries,
  getAllstatesByCountry,
  getCitiesOfState,
} from "../../utils/helpFunctions";

const CheckoutAddressForm = ({
  values,
  handleChange,
  errors,
  setFieldValue,
}) => {
  let isoCode = React.useMemo(() => {
    return getAllCountries().find((ele) => ele.name === values.country);
  }, [values.country]);
  
  const correspondingStates = useMemo(() =>
    getAllstatesByCountry(isoCode?.isoCode).map((ele) => {
      return { label: ele.name, code: ele.isoCode };
    })
  );
  let stateisoCode = React.useMemo(() => {
    return correspondingStates?.find((ele) => ele.label === values.state) || "";
  }, [values.state]);

  const correspondingCities = useMemo(() =>
    getCitiesOfState(isoCode?.isoCode, stateisoCode?.code).map((ele) => {
      return { label: ele?.name };
    })
  );

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
        <CountrySelect
          value={values.country}
          error={errors.country}
          onChange={(e) => {
            setFieldValue("country", e);
          }}
        />
        <Autocomplete
          isOptionEqualToValue={(option, value) => option.label == value}
          value={values.state}
          onChange={(e) => {
            setFieldValue("state", e.target.textContent);
          }}
          size="small"
          fullWidth
          id="country-select-demo"
          options={correspondingStates || []}
          autoHighlight
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              error={errors.state}
              {...params}
              label="Choose a State"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
      </Grid>
      <Grid
        columns={[
          ["small", "large"],
          ["small", "large"],
        ]}
        gap="10px"
      >
        <Autocomplete
          isOptionEqualToValue={(option, value) => option.label == value}
          value={values.district}
          onChange={(e) => {
            setFieldValue("district", e.target.textContent);
          }}
          size="small"
          fullWidth
          id="country-select-demo"
          options={correspondingCities || []}
          autoHighlight
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              error={errors.district}
              {...params}
              label="Choose a State"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
        {/* <TextField
          size="small"
          type={"text"}
          fullWidth
          id="district"
          district="district"
          label="District"
          value={values.district}
          onChange={handleChange}
          error={errors.district}
        /> */}
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
          error={errors.address}
        />
      </Grid>
    </Box>
  );
};

export default CheckoutAddressForm;
