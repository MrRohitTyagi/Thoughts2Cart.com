import { Button, InputAdornment, TextField } from "@mui/material";
import { Box, DataTable } from "grommet";
import { Close, FormSearch, Search } from "grommet-icons";
import React, { useState } from "react";
const Datatable = ({
  columns,
  onRowclick,
  data,
  pad,
  createNewClick,
  stateToBeUpdated,
  createNewText,
  fetch,
  searchKey = "name",
}) => {
  const [search, setsearch] = useState("");

  const handleSearch = (q) => {
    if (q === "") fetch();
    let filterArr = data.filter((ele) => {
      return ele[searchKey].toLowerCase().includes(q.toLowerCase());
    });

    if (filterArr.length > 0) {
      stateToBeUpdated(filterArr);
    }
  };

  return (
    <Box pad="small">
      <Box direction="row" justify="between" pad={{ bottom: "small" }}>
        <TextField
          value={search}
          onChange={(e) => {
            handleSearch(e.target.value);
            setsearch(e.target.value);
          }}
          size="small"
          label="Search"
          sx={{ minWidth: "450px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Close
                  style={{
                    color: "#5C4033",
                    marginLeft: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setsearch("");
                    fetch();
                  }}
                />
                <Search
                  style={{
                    color: "#5C4033",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
        <Button
          sx={{ width: "fit-content" }}
          size="small"
          variant="contained"
          color="success"
          onClick={createNewClick}
        >
          {createNewText}
        </Button>
      </Box>
      <Box
        // width={{ max: "80vw" }}
        // height={{ max: "75vh" }}
        overflow={{ horizontal: "scroll" }}
      >
        <DataTable
          verticalAlign={"middle"}
          onClickRow={({ datum }) => {
            return onRowclick(datum);
          }}
          paginate={true}
          width={{ min: "80vw" }}
          border
          columns={columns}
          data={data || []}
        />
      </Box>
    </Box>
  );
};

export default Datatable;
