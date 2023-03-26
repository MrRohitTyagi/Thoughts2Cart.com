import React, { memo } from "react";
import { Box, Layer, Text, Grid, Select } from "grommet";
import { useFormik } from "formik";
import * as yup from "yup";

import { CaretDownFill } from "grommet-icons";
import { StyledButton } from "../../../../assets/StyledItems";
import { Button, TextField } from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { multiupload } from "../../../../utils/helpFunctions";
import { deleteImage } from "../../../../controllers/ImageController";
import {
  createNewProduct,
  deletProduct,
} from "../../../../controllers/productController";

const validationSchema = yup.object({
  title: yup.string().required("title is required"),
  category: yup.string().required("category is required"),
  description: yup.string().required("description is required"),
  price: yup.string().required("price is required"),
  stock: yup.string().required("stock is required"),
  rating: yup.string().required("rating is required"),

  warranty: yup
    .number("invalid Warranty")
    .positive("invalid Warranty")
    .required("Warranty is required"),
  deliveryTime: yup
    .number("invalid delivery time")
    .positive("invalid delivery time")
    .required("Delivery Time is required"),
  offers: yup.string(),
  discount: yup.number("invalid Discount").positive("invalid Discount"),
});
const EditProductForm = ({
  editProductLayer,
  seteditProductLayer,
  toast,
  allcatagories,
}) => {
  const formik = useFormik({
    initialValues: {
      title: editProductLayer.title || "",
      id: editProductLayer._id || "",
      category: editProductLayer.category || "",
      description: editProductLayer.description || "",
      price: editProductLayer.price || "",
      stock: editProductLayer.stock || "",
      images: [],
      rating: editProductLayer.rating || "",

      deliveryTime: editProductLayer.deliveryTime || "",
      warranty: editProductLayer.warranty || "",
      discount: editProductLayer.discount || "",
      offers: editProductLayer.offers || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (values) => {
    try {
      toast.loading("Submitting Product");
      let urls = await multiupload(Object.values(formik.values.images));
      await createNewProduct({
        ...values,
        images: urls ? urls : editProductLayer.images,
      });
      if (urls?.length > 0 && editProductLayer?.images?.length > 0) {
        editProductLayer.images.map(async (ele) => {
          await deleteImage(ele);
        });
      }
      seteditProductLayer(false);
      toast.success("Product Update success");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    }
  };
  return (
    <Layer
      onEsc={() => {
        seteditProductLayer(false);
      }}
      onClickOutside={() => {
        seteditProductLayer(false);
      }}
      position="right"
      style={{ height: "100vh", width: "600px", background: "#ded5bf" }}
    >
      <StyledButton
        onClick={() => {
          seteditProductLayer(false);
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
        animation={{ duration: 400, type: "fadeIn" }}
        style={{ position: "relative" }}
        background={"#F2F2F2"}
        round="small"
        margin={"small"}
        elevation={"large"}
        border
        height={"100%"}
        pad="small"
        overflow={"auto"}
      >
        <Text weight={"bold"}>
          Product {editProductLayer._id ? "Edit" : "Create"} Form
        </Text>

        <form onSubmit={formik.handleSubmit}>
          <Box
            animation={{ duration: 400, type: "fadeIn" }}
            direction="column"
            gap="20px"
            height={"fit-content"}
            margin={{ top: "20px", bottom: "20px" }}
          >
            <TextField
              type={"text"}
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />

            <Select
              icon={<CaretDownFill />}
              emptySearchMessage="No categories found"
              dropHeight="small"
              size="small"
              name="category"
              valueKey={{ key: "name", reduce: true }}
              options={allcatagories.results || []}
              value={formik.values.category}
              label="Category"
              labelKey="name"
              onChange={({ value }) => {
                formik.setFieldValue("category", value);
              }}
            />

            <TextField
              fullWidth
              id="description"
              name="description"
              label="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <Grid
              columns={[
                ["small", "large"],
                ["small", "large"],
              ]}
              gap="10px"
            >
              <TextField
                id="price"
                type={"number"}
                name="price"
                label="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />

              <TextField
                type={"number"}
                id="stock"
                name="stock"
                label="Stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
              />

              <TextField
                type={"number"}
                id="rating"
                name="rating"
                label="Rating"
                value={formik.values.rating}
                onChange={formik.handleChange}
                error={formik.touched.rating && Boolean(formik.errors.rating)}
                helperText={formik.touched.rating && formik.errors.rating}
              />
              <Box
                animation={{ duration: 400, type: "fadeIn" }}
                border
                round="xxsmall"
              >
                <Box
                  animation={{ duration: 400, type: "fadeIn" }}
                  direction="row"
                  width={"100%"}
                  justify="between"
                >
                  <Button
                    color="info"
                    component="label"
                    variant="contained"
                    size="small"
                    sx={{ width: "79%" }}
                  >
                    <input
                      hidden
                      multiple
                      accept="image/*"
                      type="file"
                      onChange={async (e) => {
                        formik.setFieldValue("images", e.target.files);
                      }}
                    />
                    Upload images <CloudUploadIcon sx={{ marginLeft: "5px" }} />
                  </Button>
                  <Button
                    onClick={() => {
                      formik.setFieldValue("images", "");
                    }}
                    sx={{ width: "19%" }}
                    size="small"
                    variant="contained"
                    color="error"
                  >
                    x
                  </Button>
                </Box>
                <Text alignSelf="center" size="small">
                  {`${
                    formik?.values?.images?.length > 0
                      ? `${formik?.values?.images?.length || 0} Selected`
                      : `${editProductLayer?.images?.length || 0} Images`
                  }`}
                </Text>
              </Box>
            </Grid>
            <Grid
              columns={[
                ["small", "large"],
                ["small", "large"],
              ]}
              gap="10px"
            >
              <TextField
                id="discount"
                type={"number"}
                name="discount"
                label="Discount %"
                value={formik.values.discount}
                onChange={formik.handleChange}
                error={
                  formik.touched.discount && Boolean(formik.errors.discount)
                }
                helperText={formik.touched.discount && formik.errors.discount}
              />

              <TextField
                id="offers"
                name="offers"
                label="Offers (',') seperated)"
                value={formik.values.offers}
                onChange={formik.handleChange}
                error={formik.touched.offers && Boolean(formik.errors.offers)}
                helperText={formik.touched.offers && formik.errors.offers}
              />
              <TextField
                type={"number"}
                id="deliveryTime"
                name="deliveryTime"
                label="delivery Time (days)"
                value={formik.values.deliveryTime}
                onChange={formik.handleChange}
                error={
                  formik.touched.deliveryTime &&
                  Boolean(formik.errors.deliveryTime)
                }
                helperText={
                  formik.touched.deliveryTime && formik.errors.deliveryTime
                }
              />
              <TextField
                type={"number"}
                id="warranty"
                name="warranty"
                label="Warranty (Years)"
                value={formik.values.warranty}
                onChange={formik.handleChange}
                error={
                  formik.touched.warranty && Boolean(formik.errors.warranty)
                }
                helperText={formik.touched.warranty && formik.errors.warranty}
              />
            </Grid>
            {/* <Box 
        animation={{ duration: 400, type: "fadeIn" }}
              alignSelf="center"
              height="small"
              width="medium"
              overflow="hidden"
            >
              {editProductLayer?.images?.length > 0 ? (
                <Carousel height={"200px"}>
                  {editProductLayer.images.map((ele) => (
                    <Image fit="cover" src={ele} />
                  ))}
                </Carousel>
              ) : (
                <Box 
        animation={{ duration: 400, type: "fadeIn" }} margin={{ top: "3rem" }} alignSelf="center">
                  No Images Found
                </Box>
              )}
            </Box> */}
          </Box>

          <Box
            animation={{ duration: 400, type: "fadeIn" }}
            width={"100%"}
            alignSelf="end"
            direction="row"
            align="center"
            style={{ top: "5px", right: "5px" }}
            gap="20px"
          >
            <Button
              onClick={async () => {
                await deletProduct(editProductLayer._id);
                seteditProductLayer(false);
                toast.success("Product deleted successfully!");
              }}
              variant="contained"
              color="error"
            >
              Delete Product
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {editProductLayer._id ? "Update" : "Create"} Product
            </Button>
          </Box>
        </form>
      </Box>
    </Layer>
  );
};

export default memo(EditProductForm);
