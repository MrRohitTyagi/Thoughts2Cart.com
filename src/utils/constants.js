import { Box, Text } from "grommet";
import { Avatar, MenuItem, Select, Tooltip } from "@mui/material";
import { CoatCheck, Edit, Trash } from "grommet-icons";

export const usercolumns = [
  {
    property: "Actions",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Actions
      </Text>
    ),
    render: (data) => (
      <Box alignSelf="center" align="center" direction="row" gap="10px">
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
    property: "name",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Name
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.name}
      </Text>
    ),
  },
  {
    property: "email",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Email
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.email}
      </Text>
    ),
  },
  {
    property: "profile",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Profile
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        <Avatar src={data.profile} alt={"NA"} />
      </Text>
    ),
  },
  {
    property: "phone",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Phone
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.phone}
      </Text>
    ),
  },
  {
    property: "role",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Role
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.role}
      </Text>
    ),
  },
  {
    property: "password",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Password
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.password.slice(0, 15)}
      </Text>
    ),
  },

  {
    property: "address",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Address
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data?.address ? data?.address?.slice(0, 20) + "..." : "NA"}
      </Text>
    ),
  },
];
export const profileconumns = [
  {
    property: "Actions",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Actions
      </Text>
    ),
    render: (data) => (
      <Box alignSelf="center" align="center" direction="row" gap="10px">
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
    property: "price",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Price
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.price}
      </Text>
    ),
  },
  {
    property: "rating",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Rating
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.rating}
      </Text>
    ),
  },
  {
    property: "stock",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Stock
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.stock}
      </Text>
    ),
  },
  {
    property: "category",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Category
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.category}
      </Text>
    ),
  },
  {
    property: "discount",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Discount
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.discount} %
      </Text>
    ),
  },
  {
    property: "warranty",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        warranty
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.warranty} (Years)
      </Text>
    ),
  },
  {
    property: "deliveryTime",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Delivery Time
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.deliveryTime} (Days)
      </Text>
    ),
  },
  {
    property: "title",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Title
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.title.slice(0, 15)}
      </Text>
    ),
  },

  {
    property: "image",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Images
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data?.images?.length > 0 ? (
          <Box direction="row" gap="10px" alignSelf="center">
            {data.images.map((ele) => (
              <Avatar src={ele} />
            ))}
          </Box>
        ) : (
          <Box alignSelf="center" align="center">
            <CoatCheck />
          </Box>
        )}
      </Text>
    ),
  },
];
export const categorycolumns = [
  {
    property: "Actions",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Actions
      </Text>
    ),
    render: (data) => (
      <Box alignSelf="center" align="center" direction="row" gap="10px">
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
    property: "name",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Name
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data.name}
      </Text>
    ),
  },
  {
    property: "_id",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        ID
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        {data._id.slice(0, 15)}
      </Text>
    ),
  },

  {
    property: "subCategory",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Sub Categories
      </Text>
    ),
    render: (data) => {
      return (
        <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
          <Select
            size="small"
            sx={{ width: "200px" }}
            defaultValue={data.subCategory[0]}
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={data.subCategory[0] || "No Sub Category"}
          >
            {data.subCategory.length > 0 ? (
              data.subCategory.map((name) => (
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
    property: "image",
    header: (
      <Text alignSelf="center" weight={"bold"}>
        Image
      </Text>
    ),
    render: (data) => (
      <Text alignSelf="center" size="small" pad={{ vertical: "xsmall" }}>
        <Avatar src={data.image} alt={"NA"} />
      </Text>
    ),
  },
];
