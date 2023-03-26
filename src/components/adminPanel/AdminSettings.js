import React, { useEffect, useContext, useRef, memo } from "react";
import { Button } from "@mui/material";
import { Box } from "grommet";
import {
  fetchAdminSettinsg,
  saveAdminSettinsg,
} from "../../controllers/settingsController";
import ReactJson from "react-json-view";
import { AdminSettingsContext } from "../../App";

const AdminSettings = ({ toast }) => {
  const { adminSettings, setadminSettings } = useContext(AdminSettingsContext);
  let isChanged = useRef(adminSettings);

  useEffect(() => {
    (async function getsetting() {
      let { data } = await fetchAdminSettinsg();
      setadminSettings(data);
    })();
  }, [setadminSettings]);

  return (
    <Box
      animation={{ duration: 400, type: "fadeIn" }}
      pad={"small"}
      round="small"
      overflow="auto"
    >
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
        disabled={
          JSON.stringify(isChanged.current) === JSON.stringify(adminSettings)
        }
        variant="contained"
        color="success"
        sx={{ position: "absolute", right: "15px", bottom: "15px" }}
        onClick={async () => {
          saveSettings(adminSettings, toast, setadminSettings);
        }}
      >
        Save Settings
      </Button>
    </Box>
  );
};
async function saveSettings(adminSettings, toast, setadminSettings) {
  try {
    let { data } = await saveAdminSettinsg({
      data: adminSettings,
      id: "63f03b189619f30d7dec1def",
    });
    setadminSettings(data);
    toast.success("Settings Saved Successfully!");
  } catch (error) {
    toast.error(error.message || "Unabel to save save settings");
  }
}
export default memo(AdminSettings);
