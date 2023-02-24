import { Box, Text } from "grommet";
import { Avatar, MenuItem, Select, Tooltip } from "@mui/material";
import { CoatCheck, Edit, Trash } from "grommet-icons";

export const usercolumns = [
  {
    field: "Actions",
    width: 80,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Actions
      </Text>
    ),
    renderCell: ({ row }) => (
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        alignSelf="center"
        align="center"
        direction="row"
        gap="10px"
      >
        <Tooltip title="Edit">
          <Edit color="black" size="18px" />
        </Tooltip>
        <Tooltip title="Delete">
          <Trash color="black" size="18px" />
        </Tooltip>
      </Box>
    ),
  },
  {
    field: "name",
    width: 100,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Name
      </Text>
    ),
    valueGetter: (params) => `${params.row.name || ""}`,
  },
  {
    field: "email",
    width: 180,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Email
      </Text>
    ),
    valueGetter: (params) => {
      return `${params.row.email || ""}`;
    },
  },
  {
    field: "profile",
    width: 80,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Profile
      </Text>
    ),
    renderCell: (params) => {
      return <Avatar src={params.row.profile} />;
    },
  },
  {
    field: "phone",
    width: 120,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Phone
      </Text>
    ),
  },
  {
    field: "role",
    width: 80,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Role
      </Text>
    ),
  },
  {
    field: "password",
    width: 150,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Password
      </Text>
    ),
  },

  {
    field: "address",
    width: 160,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Address
      </Text>
    ),
    renderCell: ({ row }) => (
      <Text
        style={{ borderBottom: "2px solid #121921" }}
        alignSelf="center"
        size="small"
        pad={{ vertical: "xsmall" }}
      >
        {row?.address ? row?.address.address?.slice(0, 20) + "..." : "NA"}
      </Text>
    ),
  },
];
export const profileconumns = [
  {
    field: "actions",
    width: 80,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Actions
      </Text>
    ),
    renderCell: (data) => (
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        alignSelf="center"
        align="center"
        direction="row"
        gap="10px"
      >
        <Tooltip title="Edit">
          <Edit color="black" size="18px" />
        </Tooltip>
        <Tooltip title="Delete">
          <Trash color="black" size="18px" />
        </Tooltip>
      </Box>
    ),
  },
  {
    field: "price",
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Price
      </Text>
    ),
    width: 80,
  },
  {
    field: "rating",
    width: 100,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Rating
      </Text>
    ),
  },
  {
    field: "stock",
    width: 80,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Stock
      </Text>
    ),
  },
  {
    field: "category",
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Category
      </Text>
    ),
  },
  {
    field: "discount",
    width: 100,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Discount
      </Text>
    ),
    valueGetter: ({ row }) => {
      return `${row.discount || ""} (%)`;
    },
  },
  {
    field: "warranty",
    width: 100,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        warranty
      </Text>
    ),
    valueGetter: ({ row }) => {
      return `${row.warranty || ""} (years)`;
    },
  },
  {
    field: "deliveryTime",
    width: 100,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Delivery Time
      </Text>
    ),
    valueGetter: ({ row }) => {
      return `${row.deliveryTime || ""} (days)`;
    },
  },
  {
    field: "title",
    width: 150,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Title
      </Text>
    ),
  },

  {
    field: "image",
    width: 200,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Images
      </Text>
    ),
    renderCell: ({ row }) => (
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        alignSelf="center"
        size="small"
        pad={{ vertical: "xsmall" }}
      >
        {row?.images?.length > 0 ? (
          <Box
            animation={{ duration: 400, type: "fadeIn" }}
            direction="row"
            gap="2px"
            alignSelf="center"
          >
            {row.images.map((ele) => (
              <Avatar src={ele} />
            ))}
          </Box>
        ) : (
          <Box
            animation={{ duration: 400, type: "fadeIn" }}
            alignSelf="center"
            align="center"
          >
            <CoatCheck />
          </Box>
        )}
      </Box>
    ),
  },
];
export const categorycolumns = [
  {
    field: "Actions",
    width: 120,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Actions
      </Text>
    ),
    renderCell: (data) => (
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        alignSelf="center"
        align="center"
        direction="row"
        gap="10px"
      >
        <Tooltip title="Edit">
          <Edit color="black" size="18px" />
        </Tooltip>
        <Tooltip title="Delete">
          <Trash color="black" size="18px" />
        </Tooltip>
      </Box>
    ),
  },
  {
    field: "name",
    width: 150,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Name
      </Text>
    ),
  },
  {
    field: "_id",
    width: 220,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        ID
      </Text>
    ),
  },

  {
    field: "subCategory",
    width: 350,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Sub Categories
      </Text>
    ),
    renderCell: ({ row }) => {
      return (
        <Text
          style={{ borderBottom: "2px solid #121921" }}
          alignSelf="center"
          size="small"
          pad={{ vertical: "xsmall" }}
        >
          <Select
            size="small"
            sx={{ width: "200px" }}
            defaultValue={row.subCategory[0]}
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={row.subCategory[0] || "No Sub Category"}
          >
            {row.subCategory.length > 0 ? (
              row.subCategory.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={"No Sub Category"}>{"No Sub Category"}</MenuItem>
            )}
          </Select>
        </Text>
      );
    },
  },
  {
    field: "image",
    width: 200,
    headerName: (
      <Text style={{ borderBottom: "2px solid #121921" }} alignSelf="center">
        Image
      </Text>
    ),
    renderCell: ({ row }) => (
      <Text
        style={{ borderBottom: "2px solid #121921" }}
        alignSelf="center"
        size="small"
        pad={{ vertical: "xsmall" }}
      >
        <Avatar src={row.image} alt={"NA"} />
      </Text>
    ),
  },
];
