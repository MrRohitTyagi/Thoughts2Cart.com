import React, { useState } from "react";
import { Box, Image, Button, Text } from "grommet";
import { Alarm } from "grommet-icons";

function App() {
  const [userName, setuser] = useState("Rohit");
  const [punchedin, setpunchedin] = useState(false);
  const [time, settime] = useState(0);

  let timeMaker = () => {
    let cs = new Date().getSeconds();
    let ch = new Date().getHours();
    let cm = new Date().getMinutes();

    let data = JSON.parse(localStorage.getItem("ptime"));
    return data ? `${ch - data.hr} ${cm - data.min} ${cs - data.sec}` : "null";
  };
  console.log(timeMaker());

  return (
    <Box
      height="100vh"
      width="100vw"
      background={"black"}
      alignContent="center"
      flex
      justify="center"
    >
      <Box
        overflow={"hidden"}
        round="small"
        elevation="large"
        style={{ margin: "auto" }}
        height={"80vh"}
        background="grey"
        width="300px"
        direction="column"
      >
        <Box height={"30%"}>
          <Image
            height={"100%"}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn2QnZ1IMQtvsRnzI73YfJQq7BIa8wCSctng&usqp=CAU"
          />
        </Box>
        {!!userName &&
          (!punchedin ? (
            <Box
              height={"15%"}
              flex
              justify="center"
              style={{ textAlign: "center" }}
            >
              <Text>Welcome {userName}</Text>
              <Text>Ready to start your day ?</Text>
            </Box>
          ) : (
            <Box
              height={"15%"}
              flex
              justify="center"
              style={{ textAlign: "center" }}
            >
              <Text size="40px">00:00</Text>
              <Text></Text>
            </Box>
          ))}
        <Box height={"30%"}>
          <Image
            height={"80%"}
            src={localStorage.getItem("map")}
            margin={{ horizontal: "20px", vertical: "10px" }}
          />
        </Box>
        <Box flex justify="center" height={"25%"}>
          <Button
            style={{ width: "60%", borderRadius: "5px", margin: "auto" }}
            primary
            color={"green"}
            onClick={() => {
              setpunchedin((prev) => !prev);
              let a = new Date();
              localStorage.setItem(
                "ptime",
                JSON.stringify({
                  min: a.getMinutes(),
                  hr: a.getMinutes(),
                  sec: a.getSeconds(),
                })
              );
            }}
            label={!punchedin ? "Punch In" : "Punch out"}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
