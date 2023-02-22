import { Button, InputAdornment, TextField } from "@mui/material";
import { Box } from "grommet";
import { Close, Search } from "grommet-icons";
import React, { useState } from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Datatable = ({
  columns,
  onRowclick,
  data,
  createNewClick,
  stateToBeUpdated,
  createNewText,
  fetch,
  searchKey = "name",
}) => {
  const [pageSize, setPageSize] = useState(10);
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
    <Box pad="small" overflow={"hidden"}>
      <Box
        direction="row"
        justify="between"
        pad={{ bottom: "small" }}
        style={{ overflow: "hidden" }}
      >
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
        style={{ display: "flex", height: "80%", width: "100%", flexGrow: 1 }}
      >
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          sx={{
            minWidth: "70vw",
            boxShadow: 2,
            border: 2,
            borderColor: "#121921",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          onRowClick={({ row }) => {
            return onRowclick(row);
          }}
          autoHeight
          rows={
            data.map((ele, i) => {
              return { ...ele, id: i };
            }) || []
          }
          columns={columns}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Box>
  );
};

export default Datatable;
