import { useState } from "react";
import { Box, Image, Text } from "grommet";
import {
  TextField,
  InputAdornment,
  Avatar,
  Button,
  Tooltip,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../assets/logo.png";
import SignupForm from "./login/SignupForm";
import ProfileDrawer from "./profile/ProfileDrawer";
import styled from "styled-components";
const StyledButton = styled(Button)`
  background: #5c4033 !important;
  color: #F2F2F2;
  border: 2px solid #5c4033;
`;

const Navbar = ({
  userDetails,
  setuserDetails,
  navigate,
  toast,
  userAddress,
}) => {
  const [profileDrawerlayer, setprofileDrawerlayer] = useState(false);
  const [SigninLayer, setSigninLayer] = useState(false);
  const handleSignin = () => {
    setSigninLayer(true);
  };
  return (
    <>
      <Box
        background={"#121921"}
        direction="row"
        justify="between"
        width={"100%"}
        align=" center"
        border={{ color: "lightblue", side: "bottom" }}
        pad={{ horizontal: "small" }}
      >
        <Box direction="row" align=" center" justify="between">
          <Image
            style={{ cursor: "pointer" }}
            src={logo}
            height="40vw"
            margin={{ top: "10px" }}
            onClick={() => {
              navigate("/");
            }}
          />
          <TextField
            variant="standard"
            placeholder="Search"
            style={{ color: "red !important" }}
            sx={{
              pl: 2,
              m: 1.5,
              height: "30%",
              width: "30vw",
              border: "1px solid #5C4033",
              borderRadius: "3px",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ height: "2vw", width: "3vw", color: "#5C4033" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box direction="row" align="center" gap="30px">
          <Box direction="row" align="center" gap="30px">
            {userDetails?.name ? (
              <Text size="1.3vw">Hello! {userDetails?.name}</Text>
            ) : (
              <>
                <Text size="1.3vw" style={{ marginRight: "5px" }}>
                  Hello!
                </Text>
                <StyledButton
                  variant="outlined"
                  sx={{
                    width: "80%",
                    background: "#5C4033",
                    color: "#F2F2F2",
                  }}
                  onClick={() => {
                    handleSignin();
                  }}
                >
                  Sign In
                </StyledButton>
              </>
            )}
            <Tooltip title="Tap for more">
              <Avatar
                sx={{
                  height: "3.5vw",
                  width: "3.5vw",
                  border: "1px solid #EED971FF",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setprofileDrawerlayer((prev) => !prev);
                }}
                alt={<AccountCircleIcon />}
                src={userDetails.profile}
              />
            </Tooltip>
          </Box>
          <Button>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartIcon
                sx={{ height: "2.5vw", width: "2.7vw", color: "#f9f6ed" }}
              />
            </Badge>
          </Button>
        </Box>
      </Box>
      {SigninLayer && <SignupForm {...{ setSigninLayer, toast }} />}
      {profileDrawerlayer && (
        <ProfileDrawer
          {...{
            userAddress,
            toast,
            setprofileDrawerlayer,
            profileDrawerlayer,
            setuserDetails,
            userDetails,
          }}
        />
      )}
    </>
  );
};

export default Navbar;
