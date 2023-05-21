import {
  Container,
  Center,
  Box,
  Input,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [user, setUser] = useState({
    emna: "",
    password: "",
  });

  const nav = useNavigate();

  const inptHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };

  const login = async () => {
    const result = await axios.get("http://localhost:2000/users/login", {
      params: user,
    });
    // console.log(result.data);
    localStorage.setItem("token", JSON.stringify(result.data.token));
    alert(result.data.message);
    if (result.data.value) {
      nav("/");
    }
    return;
  };

  return (
    <>
      <Container maxW={"400px"} bgColor={"#F1F6F9"}>
        <Center fontSize={"xl"} fontWeight={"bolder"}>
          Login
        </Center>
        <Box
          boxShadow={
            "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"
          }
          padding={"5px"}
        >
          <FormLabel>Email or Name</FormLabel>
          <Input
            placeholder="email/name"
            id="emna"
            onChange={inptHandler}
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
            placeholder="username"
            id="password"
            onChange={inptHandler}
          ></Input>
        </Box>
        <Box padding={"10px"}>
          <Center>
            <Button colorScheme="teal" variant="solid" onClick={login}>
              Login
            </Button>
          </Center>
        </Box>
      </Container>
      <Container maxW={"400px"}>
        <Center padding={"10px"} fontStyle={"italic"}>
          <Link to="/register">Register</Link>
        </Center>
      </Container>
    </>
  );
}
