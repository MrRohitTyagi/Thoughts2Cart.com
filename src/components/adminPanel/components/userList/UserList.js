import React, { useEffect, useState } from "react";
import { Box } from "grommet";
import { getAllUsers } from "../../../../controllers/userController";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../../../VersitileComponents/datatable/Datatable";
import { Button, InputAdornment, TextField } from "@mui/material";
import Spinner from "../../../../assets/Spinner";
import EditUserForm from "./EditUserForm";
import { usercolumns } from "../../../../utils/constants";

const UserList = ({ toast }) => {
  const [search, setsearch] = useState("");
  const [userList, setuserList] = useState([]);
  const [userEditLayer, setuserEditLayer] = useState("");

  async function fetchAllUsers() {
    let { data } = await getAllUsers();

    let UserData = data.results.filter((ele) => ele.role !== "admin");
    setuserList(UserData);
  }
  useEffect(() => {
    fetchAllUsers();
  }, [userEditLayer]);

  const rowClickHandler = (e) => {
    setuserEditLayer(e);
  };

  const handleSearch = (q) => {
    if (q === "") fetchAllUsers();
    let filterArr = userList.filter((ele) => {
      return ele.name === q;
    });

    if (filterArr.length > 0) setuserList(filterArr);
  };

  return userList?.length > 0 ? (
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
                  fetchAllUsers();
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
          setuserEditLayer({ name: "" });
        }}
      >
        Create User
      </Button>

      <DataTable
        // pad={{ vertical: "15px", horizontal: "small" }}
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
    </Box>
  ) : (
    <Spinner size="50px" center={true} />
  );
};

export default UserList;
