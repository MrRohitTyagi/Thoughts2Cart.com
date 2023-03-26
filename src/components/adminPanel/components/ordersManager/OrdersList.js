import React, { memo, useEffect } from "react";
import { Box } from "grommet";
import { useState } from "react";
import Spinner from "../../../../assets/Spinner";
// import EditProductForm from "./EditProductForm";
import DataTable from "../../../../VersitileComponents/datatable/Datatable";
import { orderscolumns } from "../../../../utils/constants";
import { getAllorders } from "../../../../controllers/orderRoute";
import EditOrderForm from "./OrdersForm";

const OrdersList = ({ toast }) => {
  const [orderList, setorderList] = useState([]);
  const [editProductLayer, seteditProductLayer] = useState("");

  async function fetchAllOrders() {
    let { response } = await getAllorders();
    setorderList(response.reverse());
  }

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
        header="Order"
        // createNewClick={() => seteditProductLayer({ title: "" })}
        pad={{ vertical: "small" }}
        onRowclick={rowClickHandler}
        columns={orderscolumns}
        data={orderList || []}
      />
      {editProductLayer && (
        <EditOrderForm
          {...{
            toast,
            editProductLayer,
            fetchAllOrders,
            seteditProductLayer,
          }}
        />
      )}
    </Box>
  ) : (
    <Spinner msg="Fetching  Orders .." center={true} />
  );
};

export default memo(OrdersList);
