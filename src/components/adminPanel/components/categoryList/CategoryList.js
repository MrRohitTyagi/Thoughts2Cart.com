import React, { useEffect, useState } from "react";
import { Box } from "grommet";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../../../VersitileComponents/datatable/Datatable";
import { Button, InputAdornment, TextField } from "@mui/material";
import Spinner from "../../../../assets/Spinner";
import { categorycolumns } from "../../../../utils/constants";
import CategoryForm from "./CategoryForm";
import { getAllcategory } from "../../../../controllers/categoryController";

const CategoryList = ({ toast }) => {
  const [search, setsearch] = useState("");
  const [categoryList, setcategoryList] = useState([]);

  const [categoryEditLayer, setcategoryEditLayer] = useState("");

  async function fetchAllCategory() {
    let { data } = await getAllcategory();
    setcategoryList(data.results.reverse());
  }
  useEffect(() => {
    fetchAllCategory();
  }, []);
  const rowClickHandler = (e) => {
    setcategoryEditLayer(e);
  };

  const handleSearch = (q) => {
    console.log(q);
    if (!q) {
      fetchAllCategory();
      return;
    }

    let filterArr = categoryList.filter((ele) => {
      return ele.name.toLowerCase().includes(q.toLowerCase());
    });

    if (filterArr.length > 0) setcategoryList(filterArr);
  };

  return categoryList?.length > 0 ? (
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
          mb: 4,
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
                  fetchAllCategory();
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
          setcategoryEditLayer({ name: "" });
        }}
      >
        Create category
      </Button>

      <DataTable
        onRowclick={rowClickHandler}
        columns={categorycolumns}
        data={categoryList || []}
      />
      {categoryEditLayer && (
        <CategoryForm
          {...{
            toast,
          }}
        />
      )}
    </Box>
  ) : (
    <Spinner size="50px" center={true} />
  );
};

export default CategoryList;
