import { Box } from "grommet";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategorisedProducts } from "../../controllers/productController";
import MobileCard from "../../VersitileComponents/productCards/MobileCard";
import Pagination from "@mui/material/Pagination";
import Spinner from "../../assets/Spinner";

const CategoryPage = () => {
  const navigate = useNavigate();
  let { name: currentCategory } = useParams();
  const [AllProducts, setAllProducts] = useState([]);
  const [page, setpage] = useState(1);
  const [count, setcount] = useState();

  useEffect(() => {
    (async function fetchAllProducts() {
      let { data } = await getCategorisedProducts(currentCategory, page);
      setAllProducts(data.response);
      setcount(data.count);
    })();
  }, [page]);

  function handleProductOnclick(item) {
    navigate(`/product/${item._id}`);
  }

  return AllProducts?.length > 0 ? (
    <>
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        direction="row"
        pad={"small"}
        style={{ flexWrap: "wrap" }}
        justify="evenly"
      >
        {AllProducts.map((ele) => {
          return <MobileCard onClick={handleProductOnclick} ele={ele} />;
        })}
      </Box>
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        direction="row"
        pad={"small"}
        justify="evenly"
      >
        <Pagination
          count={Math.floor(count / 20)}
          variant="outlined"
          shape="rounded"
          onChange={(e) => {
            if (parseInt(e.target.textContent) === page) return;
            if (e.target.textContent) {
              setAllProducts([]);
              setpage(parseInt(e.target.textContent));
            }
          }}
        />
      </Box>
    </>
  ) : (
    <Spinner center msg="Fetching products" />
  );
};

export default CategoryPage;
