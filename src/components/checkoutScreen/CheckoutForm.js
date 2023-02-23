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

const steps = [
  {
    label: "Select or Add new Address",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    component: <Address />,
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
    component: <>2</>,
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    component: <>3</>,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
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
              <Box>{component}</Box>

              <Box sx={{ mb: 2, mt: 1 }}>
                <div>
                  {index === steps.length - 1 ? (
                    <Button size="small" variant="contained">
                      Finish
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleNext}
                    >
                      Next
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
    </Box>
  );
}
