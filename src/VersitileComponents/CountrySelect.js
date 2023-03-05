import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllCountries } from "../utils/helpFunctions";

const countries = getAllCountries().map((ele) => {
  return { code: ele.isoCode, label: ele.name };
});

export default function CountrySelect({ onChange, error, value }) {
  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.label == value}
      value={value}
      onChange={(e) => {
        onChange(e.target.textContent);
      }}
      size="small"
      fullWidth
      id="country-select-demo"
      options={countries || []}
      autoHighlight
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          error={error}
          {...params}
          label="Select country"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}
