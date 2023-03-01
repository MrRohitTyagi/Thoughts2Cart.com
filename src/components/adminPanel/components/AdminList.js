import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../controllers/userController";

import DataTable from "../../../VersitileComponents/datatable/Datatable";
import Spinner from "../../../assets/Spinner";
import EditUserForm from "./userList/EditUserForm";

import { usercolumns as columns } from "../../../utils/constants";

const AdminList = ({ toast }) => {
  const [userList, setuserList] = useState([]);
  const [userEditLayer, setuserEditLayer] = useState("");

  async function fetchAllUsers() {
    let { data } = await getAllUsers();
    let adminData = data.results.filter((ele) => ele.role === "admin");
    setuserList(adminData);
  }

  const rowClickHandler = (e) => {
    setuserEditLayer(e);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return userList?.length > 0 ? (
    <>
      <DataTable
        searchKey="name"
        fetch={fetchAllUsers}
        stateToBeUpdated={setuserList}
        createNewText="Create new admin"
        createNewClick={() => setuserEditLayer({ name: "" })}
        onRowclick={rowClickHandler}
        columns={columns}
        data={userList || []}
      />
      {userEditLayer && (
        <EditUserForm
          {...{
            fetchAllUsers,
            userEditLayer,
            setuserEditLayer,
            toast,
          }}
        />
      )}
    </>
  ) : (
    <Spinner center={true} msg="Fetching Admin list .." />
  );
};

export default AdminList;
