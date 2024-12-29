import { Button, Center, Container, Fieldset, Flex, Input, Link } from "@chakra-ui/react";
import { signIn } from "aws-amplify/auth";
import { Template } from "layouts/Template";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarActiveKey } from "components/Navbar";
import { Field } from "../ui/field";

export const Login = () => {
  return (
    <Template activeKey={NavbarActiveKey.LOGIN}>
      <LoginBody />
    </Template>
  );
};

const LoginBody = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: any) {
    event.preventDefault();

    signIn({ username, password })
      .then((value: any) => {
        // Signed in successfully so we reload.
        navigate("/");
      })
      .catch((reason: any) => {
        console.error(`Failed to sign user in: ${reason}`);
      });
  }
  return (
    <Container fluid py={"5"}>
      <Center>
        <form onSubmit={handleSubmit}>
          <Fieldset.Root size="lg" maxW="xl">
            <Fieldset.Content>
              <Field label="Username" required>
                <Input name="username" onChange={(e) => setUsername(e.target.value)} />
              </Field>

              <Field label="Password" required>
                <Input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
              </Field>
            </Fieldset.Content>
            <Link alignSelf={"center"} fontSize={"sm"} href={"/reset"}>
              Forgot Password?
            </Link>
            <Button bg={"goc.blue"} type={"submit"}>
              Log In
            </Button>
            <Flex justifyContent={"center"}>
              <span>Don't have an account?</span>
              <Link color={"goc.blue"} fontSize={"md"} href={"/signup"} pl={"2"}>
                Sign up
              </Link>
            </Flex>
          </Fieldset.Root>
        </form>
      </Center>
    </Container>
  );
};
