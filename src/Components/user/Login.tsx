import {
  Box,
  Button,
  Container,
  Fieldset,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signIn } from "aws-amplify/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarActiveKey } from "components/Navbar";
import { Field } from "../ui/field";
import { Template } from "layouts/Template";
import { InputGroup } from "components/ui/input-group";
import { LuLock, LuUser } from "react-icons/lu";

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
    <Box
      position="relative"
      width="100%"
      height="max(100vh, 35rem)"
      overflow="hidden"
    >
      {/* Banner image*/}
      <Image
        width="100%"
        height="100%"
        src="/images/landing3.jpg" // Make sure to center the image before changing
        alt="GOC Landing Photo"
        objectFit="cover"
        objectPosition="center"
        userSelect="none"
      />
      {/* Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="black"
        opacity="0.4"
      />
      {/* Login */}
      <Container
        maxWidth="fit-content"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        color="black"
        backgroundColor="goc.gray/90"
        borderRadius="lg"
        boxShadow="lg"
        padding="2rem 6rem"
      >
        <VStack width="100%" gap="0" align="center">
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
            <Fieldset.Root size="lg" maxW="xl">
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
              <Flex
                flexDirection="row"
                justifyContent="center"
                marginTop="1rem"
                fontSize={{
                  base: "xs",
                  sm: "xs",
                  md: "sm",
                  lg: "sm",
                  xl: "sm",
                }}
                textWrap="nowrap"
              >
                <Text>Don't have an account?</Text>
                <Link color="goc.blue" href="/signup" paddingLeft=".5rem">
                  Sign up
                </Link>
              </Flex>
            </Fieldset.Root>
          </form>
        </VStack>
      </Container>
    </Box>
  );
};
