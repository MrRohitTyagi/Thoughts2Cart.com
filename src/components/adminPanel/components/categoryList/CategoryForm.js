import React, { useEffect, useState } from "react";
import { Box, Layer, Text, Grid } from "grommet";
import ForwardIcon from "@mui/icons-material/Forward";
import { useFormik } from "formik";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

import { Button, IconButton, TextField, Avatar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  encodeImageFileAsURL,
  uploadImage,
} from "../../../../utils/helpFunctions";
import { StyledButton } from "../../../../assets/StyledItems";

import {
  deletecategory,
  regestercategory,
} from "../../../../controllers/categoryController";
import { Add, Trash } from "grommet-icons";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  image: yup.string(),
  subCategory: yup.array(),
});
const EditCategoryForm = ({
  categoryEditLayer,
  setcategoryEditLayer,
  fetchAllCategory,
  toast,
}) => {
  const [chipData, setChipData] = React.useState(
    categoryEditLayer?.subCategory || []
  );
  const [profilePicData, setprofilePicData] = useState("");

  const formik = useFormik({
    initialValues: {
      name: categoryEditLayer?.name || "",
      image: categoryEditLayer?.image || "",
      id: categoryEditLayer?._id || "",
      subCategory: categoryEditLayer?.subCategory || [],
      tempIng: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      return handleProfileUpdate(values);
    },
  });
  async function handleProfileUpdate({ image, name, subCategory, id }) {
    try {
      let url = "";

      if (profilePicData) {
        url = await uploadImage(profilePicData);
        setprofilePicData(null);
      }

      if (url === "" && image === "") {
        return toast.error("Image is required");
      }
      toast.loading("Submitting Please wait");
      await regestercategory({
        id: id,
        name: name,
        image: url ? url : image,
        subCategory: chipData,
      });
      await fetchAllCategory();
      setcategoryEditLayer(false);
      toast.success("Category updated successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error?.message || "Category Already Exists");
    }
  }

  return (
    <Layer
      onEsc={() => {
        setcategoryEditLayer(false);
      }}
      position="right"
      style={{ height: "100vh", width: "600px", background: "#ded5bf" }}
    >
      <StyledButton
        onClick={() => {
          setcategoryEditLayer(false);
        }}
        variant="contained"
        color="info"
        sx={{
          left: "-5%",
          top: "50%",
          position: "absolute",
          zIndex: 0,
        }}
        startIcon={<ForwardIcon />}
      ></StyledButton>

      <Box
        style={{ position: "relative" }}
        background={"#F2F2F2"}
        round="small"
        margin={"small"}
        elevation={"large"}
        border
        height={"100%"}
        pad="small"
      >
        <Text weight={"bold"}>
          category {categoryEditLayer?._id ? "Edit" : "Create"} Form
        </Text>
        <Avatar
          style={{ position: "absolute", top: "5px", right: "5px" }}
          src={formik.values.tempIng || categoryEditLayer?.image || ""}
        />

        <form id="form" onSubmit={formik.handleSubmit}>
          <Box direction="column" gap="20px" margin={{ top: "30px" }}>
            <TextField
              type={"text"}
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <Box style={{ position: "relative" }} direction="row">
              <TextField
                fullWidth
                id="image"
                name="image"
                label="Image URL or upload image"
                value={formik.values.image}
                onChange={formik.handleChange}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
              />
              <IconButton
                sx={{
                  scale: "1.5",
                  margin: "0 10px",
                }}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    let data = encodeImageFileAsURL(e.target);
                    setprofilePicData(data);
                    formik.setFieldValue(
                      "tempIng",
                      URL.createObjectURL(e.target.files[0])
                    );
                  }}
                />
                <CloudUploadIcon />
              </IconButton>
            </Box>
            <Text
              style={{ borderBottom: "2px solid black" }}
              alignSelf="center"
            >
              Sub Categories
            </Text>
            <ChipsArray
              subs={categoryEditLayer?.subCategory || []}
              setFieldValue={formik.setFieldValue}
              chipData={chipData}
              setChipData={setChipData}
              toast={toast}
            />
          </Box>

          <Box
            alignSelf="end"
            direction="row"
            style={{ position: "absolute", bottom: "5px", right: "5px" }}
            gap="20px"
          >
            {categoryEditLayer?._id && (
              <Button
                onClick={async () => {
                  await deletecategory(formik.values.id);
                  await fetchAllCategory();
                  setcategoryEditLayer(false);
                  toast.success("Category Deleted Successfully !");
                }}
                variant="contained"
                color="error"
              >
                Delete category
              </Button>
            )}
            <Button
              // onClick={() => handleProfileUpdate(formik.values)}
              type="submit"
              variant="contained"
              color="success"
            >
              {categoryEditLayer?._id ? "Update" : "Create"} category
            </Button>
          </Box>
        </form>
      </Box>
    </Layer>
  );
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function ChipsArray({ setFieldValue, subs, chipData, setChipData, toast }) {
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        background: "#f9f6ed",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      <Box direction="column" align="center" gap="20px">
        <Box direction="row" flex style={{ flexWrap: "wrap" }}>
          {chipData?.length > 0 ? (
            chipData?.map((data, i) => {
              return (
                <ListItem key={i}>
                  <Chip
                    deleteIcon={
                      <Trash
                        size="20px"
                        color="black"
                        style={{
                          paddingLeft: "5px",
                        }}
                      />
                    }
                    sx={{
                      borderRadius: "2px",
                      border: "1px dotted grey",
                    }}
                    label={data}
                    onDelete={handleDelete(data)}
                  />
                </ListItem>
              );
            })
          ) : (
            <Text>No Sub categories add some !</Text>
          )}
        </Box>

        <Box direction="row" align="center" gap="10px" pad={"small"}>
          <TextField
            fullWidth
            id="subCategoryAdd"
            name="subCategory"
            label="Enter Sub category"
          />
          <Button
            onClick={() => {
              let val = document.getElementById("subCategoryAdd").value;
              if (val === "") return;
              if (chipData.includes(val)) {
                toast.error("Sub Categories is already present");
              } else {
                setChipData((prev) => [...prev, val]);
                document.getElementById("subCategoryAdd").value = "";
              }
            }}
            sx={{ height: "95%" }}
            variant="contained"
            color="success"
          >
            <Add color="white" />
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default EditCategoryForm;
