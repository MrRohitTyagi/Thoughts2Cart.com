import { useState } from "react";
import { Box, Image, Text, Spinner } from "grommet";
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
import { HoverBorderBox } from "../utils/customComponents";
import CartItems from "./CartItems";

const Navbar = ({
  userDetails,
  setuserDetails,
  navigate,
  toast,
  userAddress,
}) => {
  const [profileDrawerlayer, setprofileDrawerlayer] = useState(false);
  const [SigninLayer, setSigninLayer] = useState(false);
  const [cartLayer, setcartLayer] = useState(false);
  const handleSignin = () => {
    setSigninLayer(true);
  };
  return (
    <>
      <Box
        animation={{ duration: 400, type: "fadeIn" }}
        background={"#121921"}
        direction="row"
        justify="between"
        width={"100%"}
        align=" center"
        border={{ color: "lightblue", side: "bottom" }}
        pad={{ horizontal: "small" }}
      >
        {/* <Box 
        animation={{ duration: 400, type: "fadeIn" }} direction="row" align=" center" justify="between"> */}
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
        {/* </Box> */}
        <Box
          animation={{ duration: 400, type: "fadeIn" }}
          direction="row"
          align="center"
          gap="30px"
        >
          <HoverBorderBox
            direction="row"
            align="center"
            style={{ cursor: "pointer", boxShadow: "none" }}
            gap="30px"
            onClick={() => {
              if (userDetails._id) {
                setprofileDrawerlayer((prev) => !prev);
              } else {
                handleSignin();
              }
            }}
          >
            {userDetails === "LOADING" ? (
              <Box
                animation={{ duration: 400, type: "fadeIn" }}
                direction="row"
                gap="10px"
              >
                <Text size="1.3vw" style={{ marginRight: "5px" }}>
                  Fetching Details
                </Text>
                <Spinner />
              </Box>
            ) : userDetails === "NOT_FOUND" || !userDetails ? (
              <>
                <Text size="1.3vw" style={{ marginRight: "5px" }}>
                  Hello!
                </Text>
                <Text color={"blue"}>Sign In !</Text>
              </>
            ) : (
              <Text size="1.3vw" style={{ marginRight: "5px" }}>
                Hello! {userDetails.name}
              </Text>
            )}
            <Tooltip title="Tap for more">
              <Avatar
                sx={{
                  height: "3.2vw",
                  width: "3.2vw",
                  border: "1px solid #EED971FF",
                  cursor: "pointer",
                }}
                alt={<AccountCircleIcon />}
                src={userDetails.profile}
              />
            </Tooltip>
          </HoverBorderBox>
          <Button
            onClick={() => {
              setcartLayer(true);
            }}
          >
            <Badge
              badgeContent={userDetails?.wishlist?.length || 0}
              color="primary"
            >
              <ShoppingCartIcon
                sx={{ height: "2.5vw", width: "2.7vw", color: "#f9f6ed" }}
              />
            </Badge>
          </Button>
        </Box>
      </Box>
      {SigninLayer && <SignupForm {...{ setSigninLayer, toast }} />}
      {cartLayer && (
        <CartItems
          {...{
            userDetails,
            setuserDetails,
            toast,
            cartLayer,
            setcartLayer,
            navigate,
          }}
        />
      )}
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
