import React, { useEffect } from "react";
import { getAllProducts } from "../../../../controllers/productController";
import { Box } from "grommet";
import { useState } from "react";
import Spinner from "../../../../assets/Spinner";
import EditProductForm from "./EditProductForm";
import DataTable from "../../../../VersitileComponents/datatable/Datatable";
import { profileconumns } from "../../../../utils/constants";

const ProductList = ({ toast, allcatagories }) => {
  const [productsList, setproductsList] = useState("");
  const [editProductLayer, seteditProductLayer] = useState("");

  async function fetchAllproducts() {
    let { data } = await getAllProducts();
    setproductsList(data.results.reverse());
  }

  useEffect(() => {
    fetchAllproducts();
  }, [editProductLayer]);

  const rowClickHandler = (e) => {
    seteditProductLayer(e);
  };

  return productsList?.length > 0 ? (
    <Box animation={{ duration: 400, type: "fadeIn" }}>
      <DataTable
        searchKey="title"
        createNewText="Create new product"
        createNewClick={() => seteditProductLayer({ title: "" })}
        pad={{ vertical: "small" }}
        onRowclick={rowClickHandler}
        columns={profileconumns}
        data={productsList || []}
      />
      {editProductLayer && (
        <EditProductForm
          {...{ editProductLayer, seteditProductLayer, toast, allcatagories }}
        />
      )}
    </Box>
  ) : (
    <Spinner size="50px" center={true} />
  );
};

export default ProductList;
