import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../../controllers/userController";

import DataTable from "../../../../VersitileComponents/datatable/Datatable";
import Spinner from "../../../../assets/Spinner";
import EditUserForm from "./EditUserForm";
import { usercolumns } from "../../../../utils/constants";

const UserList = ({ toast }) => {
  const [userList, setuserList] = useState([]);
  const [userEditLayer, setuserEditLayer] = useState("");

  async function fetchAllUsers() {
    let { data } = await getAllUsers();

    let UserData = data.results.filter((ele) => ele.role !== "admin");
    setuserList(UserData.reverse());
  }
  useEffect(() => {
    fetchAllUsers();
  }, [userEditLayer]);

  const rowClickHandler = (e) => {
    setuserEditLayer(e);
  };

  return userList?.length > 0 ? (
    <>
      <DataTable
        searchKey="name"
        fetch={fetchAllUsers}
        stateToBeUpdated={setuserList}
        createNewText="Create new user"
        createNewClick={() => setuserEditLayer({ name: "" })}
        onRowclick={rowClickHandler}
        columns={usercolumns}
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
    <Spinner msg="Fetching Users list .." center={true} />
  );
};

export default UserList;
