import {
  Container,
  Center,
  Box,
  Input,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [user, setUser] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
    company_id: 0,
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };

  const register = async () => {
    const result = await axios.post("http://localhost:2000/users", user);

    return alert(result.data.message);
  };

  return (
    <>
      <Container maxW={"400px"} bgColor={"#F1F6F9"}>
        <Center fontSize={"xl"} fontWeight={"bolder"}>
          Register
        </Center>
        <Box
          boxShadow={
            "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"
          }
          padding={"5px"}
        >
          <FormLabel>Name</FormLabel>
          <Input placeholder="Name" id="name" onChange={inputHandler}></Input>
        </Box>
        <Box
          boxShadow={
            "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"
          }
          padding={"5px"}
        >
          <FormLabel>Address</FormLabel>
          <Input
            placeholder="Address"
            id="address"
            onChange={inputHandler}
          ></Input>
        </Box>
        <Box
          boxShadow={
            "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"
          }
          padding={"5px"}
        >
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            id="email"
            onChange={inputHandler}
          ></Input>
        </Box>
        <Box
          boxShadow={
            "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"
          }
          padding={"5px"}
        >
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            id="password"
            onChange={inputHandler}
          ></Input>
        </Box>
        <Box
          boxShadow={
            "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"
          }
          padding={"5px"}
        >
          <FormLabel>Company Id</FormLabel>
          <Input
            placeholder="company_id"
            id="company_id"
            onChange={inputHandler}
          ></Input>
        </Box>
        <Box padding={"10px"}>
          <Center>
            <Button colorScheme="teal" variant="solid" onClick={register}>
              Submit
            </Button>
          </Center>
        </Box>
      </Container>
      <Container maxW={"400px"}>
        <Center padding={"10px"} fontStyle={"italic"}>
          <Link to="/login">Login</Link>
        </Center>
      </Container>
    </>
  );
}
