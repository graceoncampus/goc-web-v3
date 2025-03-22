import { LoginTemplate } from "@/layouts/LoginTemplate";
import { signIn } from "aws-amplify/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NavbarActiveKey } from "@/components/Navbar";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "@/components/ui/toaster";
import {
  Button,
  Fieldset,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuLock, LuUser } from "react-icons/lu";

interface LoginFormProps {
  username: string;
  password: string;
}

export const LoginPage = () => {
  return (
    <LoginTemplate activeKey={NavbarActiveKey.LOGIN}>
      <LoginBody />
    </LoginTemplate>
  );
};

const LoginBody = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormProps>();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormProps) => {
    // Detect SQL injection
    const pattern = /(?=.{2,})(?:'|--|;|\b(?:or|and)\b)/i;
    if (pattern.test(data.username) || pattern.test(data.password)) {
      toaster.create({
        description: "Nice try, your attempt has been logged.",
        type: "error",
      });
      return;
    }
    try {
      await signIn({ username: data.username, password: data.password });
      navigate("/"); // Redirect on successful sign-in
    } catch (error: any) {
      console.error("Failed to sign user in:", error);
      if (error.name === "UserNotFoundException") {
        setError("username", { message: "Incorect username" });
      } else if (error.name === "NotAuthorizedException") {
        setError("password", { message: "Incorrect username or password" });
      } else {
        setError("root", { message: error.message });
      }
    }
  };

  return (
    <VStack minWidth={"12rem"} width="100%" gap="0" align="center">
      <Heading
        as="h2"
        fontSize={{ base: "2xl", sm: "2xl", md: "2xl", lg: "2xl", xl: "3xl" }}
        lineHeight="1.2"
        fontWeight="semibold"
        textAlign="center"
        width="100%"
        marginBottom="2rem"
      >
        Welcome back!
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root size="lg" maxWidth="xl">
          <Fieldset.Content>
            <Field required={true}>
              <InputGroup flex="1" startElement={<LuUser />}>
                <Input
                  variant="subtle"
                  backgroundColor="#D9D9D9B2"
                  type="username"
                  placeholder="Username"
                  paddingX="2rem"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
              </InputGroup>
              {errors.username && (
                <Text margin="0" color="red" fontSize="sm">
                  {errors.username.message}
                </Text>
              )}
            </Field>

            <Field required={true}>
              <InputGroup flex="1" startElement={<LuLock />}>
                <Input
                  variant="subtle"
                  backgroundColor="#D9D9D9B2"
                  type="password"
                  placeholder="Password"
                  paddingX="2rem"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </InputGroup>
              {errors.password && (
                <Text margin="0" color="red" fontSize="sm">
                  {errors.password.message}
                </Text>
              )}
            </Field>
            {errors.root && (
              <Text margin="0" color="red" fontSize="sm">
                {errors.root.message}
              </Text>
            )}
          </Fieldset.Content>
          <Link
            alignSelf="center"
            fontSize="xs"
            href="/reset"
            textWrap="nowrap"
          >
            Forgot your password?
          </Link>
          <Button type="submit" bg="goc.blue" marginTop="1rem">
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
