import { Button } from "@mui/material";
import { Box, Text } from "grommet";
import React, { memo, useState } from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Datatable = ({
  columns,
  onRowclick,
  data,
  createNewClick,
  createNewText,
  header,
}) => {
  const [pageSize, setPageSize] = useState(10);
  return (
    <Box
      animation={{ duration: 400, type: "fadeIn" }}
      pad="small"
      overflow={"hidden"}
    >
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        direction="row"
        justify="between"
        pad={{ bottom: "small" }}
        style={{ overflow: "hidden" }}
      >
        <Text weight={"bold"} size="large">
          {header}
        </Text>
        {createNewText && (
          <Button
            sx={{ width: "fit-content" }}
            size="small"
            variant="contained"
            color="success"
            onClick={createNewClick}
          >
            {createNewText}
          </Button>
        )}
      </Box>
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
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

export default memo(Datatable);
