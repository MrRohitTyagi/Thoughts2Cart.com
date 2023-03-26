import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import EditIcon from "@mui/icons-material/Edit";
import { Text } from "grommet";

const actions = [
  { icon: <EditIcon />, name: "Edit profile", route: "/viewProfile/0" },
  {
    icon: <ShoppingBasketIcon />,
    name: "View orders",
    route: "/viewProfile/1",
  },
];

export default function SpeedDialTooltipOpen({ navigate }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        style={{ position: "fixed", bottom: "10px", right: "10px" }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={() => {
              navigate(action.route);
            }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={
              <Text
                style={{ width: "100px", whiteSpace: "nowrap" }}
                weight={"bold"}
              >
                {action.name}
              </Text>
            }
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
