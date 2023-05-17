import { Box, Container, Flex, Button } from "@chakra-ui/react";

export default function DashboardPage() {
  return (
    <>
      <Container size={"sm"}>
        <Box>
          <Box>
            <h4>Live Attendance</h4>
            <Box>CLock</Box>
            <Box>Date</Box>
          </Box>
          <Box>
            <h4>schedule 17 May 2023</h4>
            <Box>SH20PA</Box>
            <Box>08:00 - 17:00</Box>
            <Flex>
              <Box>Clock-in</Box>
              <Box>Clock-out</Box>
            </Flex>
          </Box>
        </Box>
        <BottomNavbar />
      </Container>
    </>
  );
}

function BottomNavbar() {
  return (
    <Box h={"40px"} w={"100%"} bgColor={"#394867"} color={"#F1F6F9"}>
      <Flex justifyContent={"space-evenly"} alignContent={"center"} h={"100%"}>
        <Box
          _hover={{ bgColor: "#212A3E" }}
          borderRadius={"10px"}
          padding={"5px"}
        >
          Home
        </Box>
        <Box
          _hover={{ bgColor: "#212A3E" }}
          borderRadius={"10px"}
          padding={"5px"}
        >
          History
        </Box>
        <Box
          _hover={{ bgColor: "#212A3E" }}
          borderRadius={"10px"}
          padding={"5px"}
        >
          Login
        </Box>
      </Flex>
    </Box>
  );
}
