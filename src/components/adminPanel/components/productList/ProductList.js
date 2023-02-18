import React, { useEffect } from "react";
import { getAllProducts } from "../../../../controllers/productController";
import { Box } from "grommet";
import { useState } from "react";
import Spinner from "../../../../assets/Spinner";
import { Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import EditProductForm from "./EditProductForm";
import DataTable from "../../../../VersitileComponents/datatable/Datatable";
import { profileconumns } from "../../../../utils/constants";

const ProductList = ({ toast }) => {
  const [productsList, setproductsList] = useState("");
  const [editProductLayer, seteditProductLayer] = useState("");
  const [search, setsearch] = useState("");

  async function fetchAllproducts() {
    let { data } = await getAllProducts();
    setproductsList(data.results);
  }

  useEffect(() => {
    fetchAllproducts();
  }, [editProductLayer]);

  const handleSearch = (q) => {
    if (q === "") fetchAllproducts();
    let filterArr = productsList.filter((ele) => {
      return ele.Uid === Number(q);
    });
    if (filterArr.length > 0) setproductsList(filterArr);
  };
  const rowClickHandler = (e) => {
    seteditProductLayer(e);
  };

  return productsList?.length > 0 ? (
    <Box height={{ max: "80vh" }} style={{ position: "relative" }} pad="small">
      <TextField
        onChange={(e) => {
          handleSearch(e.target.value);
          setsearch(e.target.value);
        }}
        variant="standard"
        value={search}
        placeholder="Search for product"
        style={{ color: "red !important" }}
        sx={{
          pl: 2,
          mb: 1,
          width: "450px",
          border: "1px solid #5C4033",
          borderRadius: "3px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <ClearIcon
                sx={{ color: "#5C4033", cursor: "pointer" }}
                onClick={() => {
                  setsearch("");
                  fetchAllproducts();
                }}
              />
              <SearchIcon sx={{ color: "#5C4033", marginLeft: "5px" }} />
            </InputAdornment>
          ),
        }}
      />
      <Button
        sx={{
          height: "30px",
          position: "absolute",
          right: "10px",
          top: "10px",
        }}
        variant="contained"
        color="success"
        onClick={() => {
          seteditProductLayer({ title: "" });
        }}
      >
        Create New product
      </Button>
      <DataTable
        pad={{ vertical: "small" }}
        onRowclick={rowClickHandler}
        columns={profileconumns}
        data={productsList || []}
      />
      {editProductLayer && (
        <EditProductForm
          {...{ editProductLayer, seteditProductLayer, toast }}
        />
      )}
    </Box>
  ) : (
    <Spinner size="50px" center={true} />
  );
};

export default ProductList;
