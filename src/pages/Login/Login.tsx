import { signIn } from "aws-amplify/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarActiveKey } from "components/Navbar";
import { Field } from "../../components/ui/field";
import { InputGroup } from "components/ui/input-group";
import { LuLock, LuUser } from "react-icons/lu";
import {
  Button,
  Fieldset,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LoginTemplate } from "layouts/LoginTemplate";

export const LoginPage = () => {
  return (
    <LoginTemplate activeKey={NavbarActiveKey.LOGIN}>
      <LoginBody />
    </LoginTemplate>
  );
};

const LoginBody = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: any) {
    event.preventDefault();

    try {
      await signIn({ username, password });
      navigate("/"); // Redirect on successful sign-in
    } catch (error) {
      console.error("Failed to sign user in:", error);
    }
  }

  return (
    <VStack minWidth={"12rem"} width="100%" gap="0" align="center">
      <Heading
        as="h2"
        fontSize={{
          base: "2xl",
          sm: "2xl",
          md: "2xl",
          lg: "2xl",
          xl: "3xl",
        }}
        lineHeight="1.2"
        fontWeight="semibold"
        textAlign="center"
        width="100%"
        marginBottom="2rem"
      >
        Welcome back!
      </Heading>
      <form onSubmit={handleSubmit}>
        <Fieldset.Root size="lg" maxWidth="xl">
          <Fieldset.Content>
            <Field required>
              <InputGroup flex="1" startElement={<LuUser />}>
                <Input
                  variant="subtle"
                  backgroundColor="#D9D9D9B2"
                  name="username"
                  type="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  paddingX="2rem"
                />
              </InputGroup>
            </Field>

            <Field required>
              <InputGroup flex="1" startElement={<LuLock />}>
                <Input
                  variant="subtle"
                  backgroundColor="#D9D9D9B2"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  paddingX="2rem"
                />
              </InputGroup>
            </Field>
          </Fieldset.Content>
          <Link
            alignSelf="center"
            fontSize="xs"
            href="/reset"
            textWrap="nowrap"
          >
            Forgot your password?
          </Link>
          <Button bg="goc.blue" type="submit" marginTop="1rem">
            Log In
          </Button>
          <Text fontSize="sm" marginTop="1rem" textWrap="nowrap">
            Don't have an account?{" "}
            <Link color="goc.blue" href="/signup" paddingLeft=".5rem">
              Sign up
            </Link>
          </Text>
        </Fieldset.Root>
      </form>
    </VStack>
  );
};
