import React, { useEffect } from "react";
import { getAllProducts } from "../../../../controllers/productController";
import { Box } from "grommet";
import { useState } from "react";
import Spinner from "../../../../assets/Spinner";
// import EditProductForm from "./EditProductForm";
import DataTable from "../../../../VersitileComponents/datatable/Datatable";
import { orderscolumns } from "../../../../utils/constants";
import { getAllorders } from "../../../../controllers/orderRoute";

const OrdersList = ({ toast }) => {
  const [orderList, setorderList] = useState([]);
  const [editProductLayer, seteditProductLayer] = useState("");

  async function fetchAllOrders() {
    let { response } = await getAllorders();

    setorderList(response.reverse());
  }
  console.log(orderList);
  useEffect(() => {
    fetchAllOrders();
  }, [editProductLayer]);

  const rowClickHandler = (e) => {
    seteditProductLayer(e);
  };

  return orderList?.length > 0 ? (
    <Box animation={{ duration: 400, type: "fadeIn" }}>
      <DataTable
        searchKey="title"
        // createNewText="Create new product"
        // createNewClick={() => seteditProductLayer({ title: "" })}
        pad={{ vertical: "small" }}
        // onRowclick={rowClickHandler}
        columns={orderscolumns}
        data={orderList || []}
      />
    </Box>
  ) : (
    <Spinner msg="Fetching  Orders .." center={true} />
  );
};

export default OrdersList;
