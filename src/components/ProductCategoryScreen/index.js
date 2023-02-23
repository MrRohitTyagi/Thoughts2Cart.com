import { Box, Spinner } from "grommet";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategorisedProducts } from "../../controllers/productController";
import MobileCard from "../../VersitileComponents/productCards/MobileCard";
import Pagination from "@mui/material/Pagination";

const CategoryPage = () => {
  const navigate = useNavigate();
  let { name: currentCategory } = useParams();
  const [AllProducts, setAllProducts] = useState([]);

  useEffect(() => {
    (async function fetchAllProducts() {
      let { data } = await getCategorisedProducts(currentCategory);
      setAllProducts(data.response);
    })();
  }, []);

  function handleProductOnclick(item) {
    navigate(`/product/${item._id}`);
  }

  return AllProducts.length > 0 ? (
    <>
      <Box
        animation={{ duration: 500, type: "fadeIn" }}
        direction="row"
        pad={"small"}
        style={{ flexWrap: "wrap" }}
        justify="evenly"
      >
        {AllProducts.map((ele) => {
          return <MobileCard onClick={handleProductOnclick} ele={ele} />;
        })}
      </Box>
      <Box direction="row" pad={"small"} justify="evenly">
        <Pagination
          shape="rounded"
          count={10}
          onChange={(e) => {
            console.log(e.target.textContent);
          }}
        />
      </Box>
    </>
  ) : (
    <Box
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50% -50%)",
      }}
    >
      <Spinner size="medium" />
    </Box>
  );
};

export default CategoryPage;
