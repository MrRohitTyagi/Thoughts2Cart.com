import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Address from "../../VersitileComponents/Address";
import CheckoutAddressForm from "./CheckoutAddressForm";
import { useFormik } from "formik";
import { regesterUser } from "../../controllers/userController";
import * as yup from "yup";
import { deepMerge } from "grommet/utils";
import ConfirmDetailsForm from "./ConfirmDetailsForm";

const validationSchema = yup.object({
  phone: yup
    .string()
    .max(10, "Invalid Phone Number")
    .min(10, "Invalid Phone Number")
    .required("Phone is required"),
});

export default function VerticalLinearStepper({ userDetails, setuserDetails }) {
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
    console.log(data);
    setuserDetails(data);
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
      component: <>under develoopment</>,
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
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {label}
              </StepLabel>

              <StepContent>
                <Box sx={{ margin: "0px  20px" }}>{component}</Box>

                <Box sx={{ mb: 2, mt: 1 }}>
                  <div>
                    {index === steps.length - 1 ? (
                      <Button size="small" variant="contained">
                        Finish
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
                      size="small"
                      disabled={index === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </form>
    </Box>
  );
}
