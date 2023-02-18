import { Button } from "@mui/material";
import { Box, TextArea } from "grommet";
import React, { useEffect, useState, useContext } from "react";
import {
  fetchAdminSettinsg,
  saveAdminSettinsg,
} from "../../controllers/settingsController";
import ReactJson from "react-json-view";
import { AdminSettingsContext } from "../../App";

const AdminSettings = ({ toast }) => {
  const { adminSettings, setadminSettings } = useContext(AdminSettingsContext);

  let id = localStorage.getItem("admin-settings-id");

  useEffect(() => {
    (async function getsetting() {
      let { data } = await fetchAdminSettinsg(id);
      setadminSettings(data);
    })();
  }, []);

  return (
    <Box pad={"small"} round="small" overflow="auto">
      <ReactJson
        style={{
          width: "70vw",
          height: "80vh",
          padding: "2rem",
          borderRadius: "5px",
        }}
        name="Settings"
        iconStyle="square"
        sortKeys={true}
        indentWidth={6}
        enableClipboard={false}
        validationMessage={"Not a valid JSON"}
        displayArrayKey={true}
        quotesOnKeys={false}
        theme="monokai"
        onAdd={(data) => {
          setadminSettings(data.updated_src);
        }}
        onDelete={(data) => {
          setadminSettings(data.updated_src);
        }}
        onSelect={(data) => {}}
        src={adminSettings}
        onEdit={(data) => {
          setadminSettings(data.updated_src);
        }}
      />
      <Button
        variant="contained"
        color="success"
        sx={{ position: "absolute", right: "15px", bottom: "15px" }}
        onClick={async () => {
          try {
            let { data } = await saveAdminSettinsg({
              data: adminSettings,
              id: id,
            });
            console.log(
              "%c data ",
              "color: green;border:1px solid green",
              data
            );
            toast.success("Settings Saved Successfully!");
          } catch (error) {
            toast.error(error.message || "Unabel to save save settings");
          }
        }}
      >
        Save Settings
      </Button>
    </Box>
  );
};

export default AdminSettings;
