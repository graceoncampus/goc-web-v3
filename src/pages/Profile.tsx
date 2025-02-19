import { confirmSignUp, resendSignUpCode, signUp } from "aws-amplify/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Text,
  Link,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { NavbarActiveKey } from "components/Navbar";
import { LoginTemplate } from "layouts/LoginTemplate";
import { Field } from "components/ui/field";
import { useHookFormMask } from "use-mask-input";
import "react-phone-number-input/style.css";

export interface SignupProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  address?: string;
  gradYear?: string;
}

export const ProfilePage = () => {
  return (
    <LoginTemplate activeKey={NavbarActiveKey.LOGIN}>
      <ProfileBody />
    </LoginTemplate>
  );
};

const ProfileBody = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [username, setUsername] = useState("");

  return !signedUp ? (
    <ProfileForm setSignedUp={setSignedUp} setUsername={setUsername} />
  ) : (
    <ConfirmationForm username={username} />
  );
};

interface SignupFormProps {
  setSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileForm = ({ setSignedUp, setUsername }: SignupFormProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 77 }, (_, i) => currentYear - 70 + i);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignupProps>({
    mode: "onChange",
  });
  const registerWithMask = useHookFormMask(register);

  const password = watch("password");

  const onSignup = async (data: SignupProps) => {
    try {
      const formattedPhoneNumber =
        "+1" + data.phoneNumber.replace(/[()-\s]/g, "");

      // Required fields
      const userAttributes: { [key: string]: string } = {
        email: data.email,
        phone_number: formattedPhoneNumber,
        name: data.firstName,
        family_name: data.lastName,
      };

      // Optional fields
      if (data.address) {
        userAttributes["custom:address"] = data.address;
      }
      if (data.gradYear) {
        userAttributes["custom:grad_year"] = data.gradYear;
      }

      await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes,
        },
      });
      setUsername(data.email);
      setSignedUp(true);
    } catch (error: any) {
      console.error("Error signing up: ", error);
      if (error.name === "UsernameExistsException") {
        try {
          await resendSignUpCode({ username: data.email });
          setSignedUp(true);
        } catch (resendError: any) {
          setError("email", { message: "That email already exists :(" });
        }
      } else {
        setError("root", { message: error.message });
      }
    }
  };

  return (
    <VStack
      gap="2rem"
      align="center"
      minWidth={"17rem"}
      width="100%"
      padding="1rem"
    >
      <Heading as="h2" fontSize="2xl">
        Profile
      </Heading>
      <Box
        as="form"
        width="100%"
        maxWidth="500px"
        onSubmit={handleSubmit(onSignup)}
      >
        <VStack gap="1rem">
          <Stack direction={{ base: "column", lg: "row" }} width="100%" gap={4}>
            <Field label="First Name" required={true}>
              <Input
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="Shawn"
                variant="subtle"
                backgroundColor="#D9D9D9B2"
              />
              {errors.firstName && (
                <Text color="red" fontSize={"sm"}>
                  {errors.firstName.message}
                </Text>
              )}
            </Field>
            <Field label="Last Name" required={true}>
              <Input
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Zhuang"
                variant="subtle"
                backgroundColor="#D9D9D9B2"
              />
              {errors.lastName && (
                <Text color="red" fontSize={"sm"}>
                  {errors.lastName.message}
                </Text>
              )}
            </Field>
          </Stack>
          <Field label="Email" required={true}>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="graceoncampus@gmail.com"
              variant="subtle"
              backgroundColor="#D9D9D9B2"
            />
            {errors.email && (
              <Text color="red" fontSize={"sm"}>
                {errors.email.message}
              </Text>
            )}
          </Field>
          <Field label="Phone Number" required={true}>
            <Input
              {...registerWithMask("phoneNumber", ["(999) 999-9999"], {
                required: "Phone number is required",
              })}
              type="text"
              placeholder="Enter phone number"
              variant="subtle"
              backgroundColor="#D9D9D9B2"
            />
            {errors.phoneNumber && (
              <Text color="red" fontSize={"sm"}>
                Phone number is required
              </Text>
            )}
          </Field>
          <Field label="Password" required={true}>
            <Input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="Password"
              variant="subtle"
              backgroundColor="#D9D9D9B2"
            />
            {errors.password && (
              <Text color="red" fontSize={"sm"}>
                {errors.password.message}
              </Text>
            )}
          </Field>
          <Field label="Confirm Password" required={true}>
            <Input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Password again"
              variant="subtle"
              backgroundColor="#D9D9D9B2"
            />
            {errors.confirmPassword && (
              <Text color="red" fontSize={"sm"}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </Field>
          <Field label="Address / Dorm">
            <Input
              {...register("address")}
              placeholder="Sproul Landing"
              variant="subtle"
              backgroundColor="#D9D9D9B2"
            />
            {errors.address && (
              <Text color="red" fontSize={"sm"}>
                {errors.address.message}
              </Text>
            )}
          </Field>
          <Field label="Graduation Year">
            <select
              {...register("gradYear")}
              style={{
                backgroundColor: "#D9D9D9B2",
                width: "100%",
                borderRadius: "6px",
                padding: "0.5rem",
              }}
            >
              <option value="">Select</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.gradYear && (
              <Text color="red" fontSize={"sm"}>
                {errors.gradYear.message}
              </Text>
            )}
          </Field>
          {errors.root && (
            <Text color="red" fontSize={"sm"}>
              {errors.root.message}
            </Text>
          )}
          <Button type="submit" width="100%">
            Update profile
          </Button>
        </VStack>
      </Box>
      <Text fontSize="sm" textWrap="nowrap">
        Already have an account?{" "}
        <Link color="goc.blue" href="/login" paddingLeft=".5rem">
          Login
        </Link>
      </Text>
    </VStack>
  );
};

interface ConfirmationFormProps {
  username: string;
}

const ConfirmationForm = ({ username }: ConfirmationFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{ code: string }>();

  console.log("Username passed to ConfirmationForm:", username);

  const onConfirm = async ({ code }: { code: string }) => {
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: username,
        confirmationCode: code,
      });
      if (isSignUpComplete) navigate("/");
    } catch (error: any) {
      console.error("Error confirming sign up", error);
      setError("root", { message: error.message });
    }
  };

  return (
    <VStack
      gap="1rem"
      align="center"
      minWidth={"15rem"}
      width="100%"
      padding="1rem"
    >
      <Heading
        as="h2"
        fontSize="lg"
        textAlign="center"
        marginBottom={"1rem"}
        textWrap={"balance"}
      >
        Check your email for a confirmation code!
      </Heading>
      <Box
        as="form"
        width="100%"
        maxWidth="500px"
        onSubmit={handleSubmit(onConfirm)}
      >
        <VStack gap="1rem">
          <Field label="Confirmation Code" required={true}>
            <Input
              {...register("code", {
                required: "Confirmation code is required",
              })}
              placeholder="Enter your confirmation code"
              variant="subtle"
              backgroundColor="#D9D9D9B2"
            />
            {errors.code && (
              <Text color="red" fontSize="sm">
                {errors.code.message}
              </Text>
            )}
          </Field>
          {errors.root && (
            <Text color="red" fontSize={"sm"}>
              {errors.root.message}
            </Text>
          )}
          <Button type="submit" width="100%">
            Verify
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};
