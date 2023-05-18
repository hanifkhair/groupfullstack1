import { Box, Container, Flex, Center } from "@chakra-ui/react";
import { useState } from "react";
import Moment from "react-moment";
import axios from "axios";

export default function DashboardPage() {
  // const [clickInHas, setClickInHas] = useState(false);
  const [clockIn, setClockIn] = useState([]);
  const [isClickIn, setIsClickIn] = useState(false);

  const cin = () => {
    if (!isClickIn) {
      pushCin();
      const timeClicked = new Date();
      setClockIn([...clockIn, timeClicked]);
      setIsClickIn(true);
      // setClickInHas(false);
    }
  };

  const [clockOut, setClockOut] = useState([]);
  const [isClickOut, setIsClickOut] = useState(false);

  const cout = () => {
    // if (clickInHas) {
    if (!isClickOut) {
      const timeClicked = new Date();
      setClockOut([...clockOut, timeClicked]);
      setIsClickOut(true);
    }
    // }
  };

  // async function pushCin() {
  // const []
  // await axios.get("http:/localhost:2000/").then((req, res)=>{

  //   })
  // }

  return (
    <>
      <Container
        maxWidth={"400px"}
        height={"100vh"}
        bgColor={"#F1F6F9"}
        boxShadow={
          "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
        }
        fontSize={"xl"}
      >
        <Flex flexDir={"column"} gap={"10px"}>
          <Box>
            <Center>
              <h4>Live Attendance</h4>
            </Center>
            <Center>
              <Box fontSize={"2xl"} fontWeight={"bold"}>
                <Moment format="LT"></Moment>
              </Box>
            </Center>
            <Center>
              <Moment format="LL"></Moment>
            </Center>
          </Box>
          <Box
            boxShadow={
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
            }
            bgColor={"#212A3E"}
            color={"#F1F6F9"}
            padding={"5px"}
            textAlign={"center"}
          >
            <h4>
              schedule <Moment format="LL"></Moment>
            </h4>
            <Box>SH20PA</Box>
            <Box>08:00 - 17:00</Box>
            <Flex
              justifyContent={"space-around"}
              padding={"5px"}
              fontWeight={"bold"}
            >
              <Box
                _hover={{
                  bgColor: "#394867",
                  cursor: "pointer",
                  color: "#F1F6F9",
                }}
                bgColor={"#F1F6F9"}
                color={"#212A3E"}
                borderRadius={"5px"}
                padding={"5px"}
                onClick={cin}
              >
                Clock-in
              </Box>
              <Box
                _hover={{
                  bgColor: "#394867",
                  cursor: "pointer",
                  color: "#F1F6F9",
                }}
                bgColor={"#F1F6F9"}
                color={"#212A3E"}
                borderRadius={"5px"}
                padding={"5px"}
                onClick={cout}
              >
                Clock-out
              </Box>
            </Flex>
          </Box>
          <Box
            bgColor={"white"}
            boxShadow={
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
            }
            minHeight={"80px"}
            padding={"5px"}
          >
            {clockIn.map((time, index) => (
              <Flex justifyContent={"space-around"} bgColor={"#9BA4B5"}>
                <Box>
                  <Moment format="llll" date={time} />
                </Box>
                <Box>clock-in</Box>
              </Flex>
            ))}

            {clockOut.map((time, index) => (
              <Flex justifyContent={"space-around"} bgColor={"#9BA4B5"}>
                <Box>
                  <Moment format="llll" date={time} />
                </Box>
                <Box>clock-Out</Box>
              </Flex>
            ))}
            {/* <AttendanceLog /> */}
          </Box>
        </Flex>
        <BottomNavbar />
      </Container>
    </>
  );
}

function BottomNavbar() {
  return (
    <Box
      h={"40px"}
      w={"100%"}
      bgColor={"#394867"}
      color={"#F1F6F9"}
      boxShadow={
        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
      }
      bottom={"0"}
      // position={"absolute"}
    >
      <Flex justifyContent={"space-evenly"} alignContent={"center"} h={"100%"}>
        <Box
          _hover={{ bgColor: "#212A3E", cursor: "pointer" }}
          padding={"5px"}
          w={"33.33%"}
        >
          <Center>Home</Center>
        </Box>
        <Box
          _hover={{ bgColor: "#212A3E", cursor: "pointer" }}
          padding={"5px"}
          w={"33.33%"}
        >
          <Center>History</Center>
        </Box>
        <Box
          _hover={{ bgColor: "#212A3E", cursor: "pointer" }}
          padding={"5px"}
          w={"33.33%"}
        >
          <Center>Login</Center>
        </Box>
      </Flex>
    </Box>
  );
}
