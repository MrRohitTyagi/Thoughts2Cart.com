import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import CheckoutAddressForm from "./CheckoutAddressForm";
import { useFormik } from "formik";
import { regesterUser } from "../../controllers/userController";
import * as yup from "yup";
import ConfirmDetailsForm from "./ConfirmDetailsForm";
import { Box as Gbox, Text } from "grommet";
import { processpayment } from "../../controllers/paymentController";
import { countUnique } from "../../controllers/cartcomtroller";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";

const validationSchema = yup.object({
  phone: yup
    .string()
    .max(10, "Invalid Phone Number")
    .min(10, "Invalid Phone Number")
    .required("Phone is required"),
});

export default function VerticalLinearStepper({ userDetails, setuserDetails }) {
  const [agreeTnC, setagreeTnC] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: userDetails?.name || "",
      email: userDetails?.email || "",
      phone: userDetails?.phone || "",
      wishlist: userDetails?.wishlist || [],
      id: userDetails?._id || "",
      address: userDetails?.address?.address || "",
      state: userDetails?.address?.state || "",
      country: userDetails?.address?.country || "",
      district: userDetails?.address?.district || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      return onSubmit(values);
    },
  });

  const onSubmit = async (values) => {
    let addressObj = {
      address: values.address || "",
      country: values.country || "",
      state: values.state || "",
      district: values.district || "",
    };
    if (JSON.stringify(addressObj) === JSON.stringify(userDetails.address)) {
      return;
    }
    let final = { ...userDetails, address: addressObj, id: userDetails._id };
    let { data } = await regesterUser(final);
    setuserDetails(data);
  };
  const handleCheckout = async (Itemdata) => {
    if (agreeTnC === false) {
      toast.error("Agree T&C first");
    }
    let { data } = await processpayment(countUnique(Itemdata));
    console.log(data.url);
    window.location = data.url;
  };
  const steps = [
    {
      label: "Confirm or edit address",
      description: ``,
      component: (
        <CheckoutAddressForm
          {...{
            userDetails,
            setuserDetails,
            values: formik.values,
            handleChange: formik.handleChange,
            touched: formik.touched,
            errors: formik.errors,
          }}
        />
      ),
    },
    {
      label: "Confirm details",
      description: "",
      component: (
        <ConfirmDetailsForm
          {...{
            userDetails,
            setuserDetails,
            values: formik.values,
            handleChange: formik.handleChange,
            touched: formik.touched,
            errors: formik.errors,
          }}
        />
      ),
    },
    {
      label: "Proceed to payment",
      description: `.`,
      component: (
        <>
          <Box direction="row">
            <Checkbox
              checked={agreeTnC}
              onChange={(e) => {
                setagreeTnC(e.target.checked);
              }}
            />
            <Text weight={"bold"} size="small">
              I agree to Thoughts2cart payment and services Agreement
            </Text>
          </Box>
        </>
      ),
    },
  ];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map(({ label, component }, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>

              <StepContent>
                <Box>{component}</Box>

                <Gbox direction="row" gap="15px" margin={{ top: "15px" }}>
                  {index === steps.length - 1 ? (
                    <Button
                      disabled={agreeTnC === false}
                      size="small"
                      onClick={() => handleCheckout(userDetails.wishlist)}
                      variant="contained"
                      color="info"
                    >
                      place Order
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      type={index === 1 ? "submit" : "Button"}
                      variant="contained"
                      onClick={handleNext}
                    >
                      {index === 1 ? "Confirm" : "Next"}
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    size="small"
                    disabled={index === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                </Gbox>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </form>
    </Box>
  );
}
