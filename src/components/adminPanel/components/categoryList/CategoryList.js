import React, { useEffect, useState } from "react";
import DataTable from "../../../../VersitileComponents/datatable/Datatable";
import Spinner from "../../../../assets/Spinner";
import { categorycolumns } from "../../../../utils/constants";
import CategoryForm from "./CategoryForm";
import { getAllcategory } from "../../../../controllers/categoryController";

const CategoryList = ({ toast }) => {
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

  return categoryList?.length > 0 ? (
    <>
      <DataTable
        searchKey="name"
        fetch={fetchAllCategory}
        stateToBeUpdated={setcategoryList}
        createNewText="CCreate new category"
        createNewClick={() => setcategoryEditLayer({ name: "" })}
        onRowclick={rowClickHandler}
        columns={categorycolumns}
        data={categoryList || []}
      />
      {categoryEditLayer && (
        <CategoryForm
          {...{
            toast,
            categoryEditLayer,
            fetchAllCategory,
            setcategoryEditLayer,
          }}
        />
      )}
    </>
  ) : (
    <Spinner size="50px" center={true} />
  );
};

export default CategoryList;
