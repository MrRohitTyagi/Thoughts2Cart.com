// import { Button } from "@mui/material";
import { Box, DataTable } from "grommet";
import React from "react";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import { exportPDF } from "../../utils/helpFunctions";
const Datatable = ({ columns, onRowclick, data, pad }) => {
  return (
    <Box style={{ position: "relative" }} width={"80vw"}>
      <DataTable
        verticalAlign={"middle"}
        pad={pad}
        onClickRow={({ datum }) => {
          return onRowclick(datum);
        }}
        paginate={true}
        border
        columns={columns}
        data={data || []}
      />
      {/* <Button
        onClick={() => {
          let headers = columns.map((ele) => {
            return String(ele.property).toUpperCase();
          });
          exportPDF({ title: "", data: data, headers: [headers] });
        }}
        variant="contained"
        sx={{ position: "absolute", top: "100%", right: "0", mt: "10px" }}
        startIcon={<GetAppIcon />}
      >
        Export Data
      </Button> */}
    </Box>
  );
};

export default Datatable;
