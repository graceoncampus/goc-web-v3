import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  fetchUserAttributes,
  updateUserAttributes,
  type UpdateUserAttributesOutput,
  signOut,
} from "aws-amplify/auth";
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
import { NavbarActiveKey } from "@/components/Navbar";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { LoginTemplate } from "@/layouts/LoginTemplate";
import { useHookFormMask } from "use-mask-input";
import "react-phone-number-input/style.css";

export interface SignupProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  confirmPassword?: string;
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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignupProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      address: "",
      gradYear: "",
    },
    mode: "onChange",
  });

  // Register the masked input
  const registerWithMask = useHookFormMask(register);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 77 }, (_, i) => currentYear - 70 + i);

  // Fetch the user attributes when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const attr = await fetchUserAttributes();

        // Pre-fill form values from the fetched user attributes
        reset({
          firstName: attr.name || "",
          lastName: attr.family_name || "",
          email: attr.email || "",
          phoneNumber: attr.phone_number
            ? attr.phone_number.replace(/^\+1/, "")
            : "",
          address: attr["custom:address"] || "",
          gradYear: attr["custom:grad_year"] || "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.log("No user signed in or error fetching user data.");
      }
    };
    fetchUser();
  }, [reset]);

  const onUpdate = async (data: SignupProps) => {
    const formattedPhoneNumber =
      "+1" + data.phoneNumber.replace(/[()-\s]/g, "");

    const newUserAttributes: { [key: string]: string } = {
      email: data.email,
      phone_number: formattedPhoneNumber,
      name: data.firstName,
      family_name: data.lastName,
    };

    if (data.address) {
      newUserAttributes["custom:address"] = data.address;
    }
    if (data.gradYear) {
      newUserAttributes["custom:grad_year"] = data.gradYear;
    }

    // Optionally update password if provided
    if (data.password && data.password === data.confirmPassword) {
      newUserAttributes["password"] = data.password;
    }

    try {
      const response: UpdateUserAttributesOutput = await updateUserAttributes({
        userAttributes: newUserAttributes,
      });
      toaster.create({
        title: "Profile updated successfully",
        description: "Reloading in 1 second...",
        type: "success",
        duration: 1000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1400);
    } catch (error: any) {
      console.error("Error updating profile: ", error);
      setError("root", { message: error.message });
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
        PROFILE
      </Heading>
      <Box
        as="form"
        width="100%"
        maxWidth="500px"
        onSubmit={handleSubmit(onUpdate)}
      >
        <VStack gap="1rem">
          <Stack direction={{ base: "column", lg: "row" }} width="100%" gap={4}>
            <Field label="First Name" required={true}>
              <Input
                {...register("firstName", {
                  required: "First name is required",
                  maxLength: {
                    value: 20,
                    message: "You have a long name ^^;",
                  },
                })}
                placeholder="First Name"
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
                {...register("lastName", {
                  required: "Last name is required",
                  maxLength: {
                    value: 15,
                    message: "Must be less than 15 chars",
                  },
                })}
                placeholder="Last Name"
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
              placeholder="yourname@example.com"
              variant="subtle"
              backgroundColor="#D9D9D9B2"
              disabled
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
              placeholder="(123) 456-7890"
              variant="subtle"
              backgroundColor="#D9D9D9B2"
            />
            {errors.phoneNumber && (
              <Text color="red" fontSize={"sm"}>
                Phone number is required
              </Text>
            )}
          </Field>
          <Field label="Address / Dorm">
            <Input
              {...register("address")}
              placeholder="Address or Dorm"
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
            Update
          </Button>
        </VStack>
      </Box>
      <Text fontSize="sm" textWrap="nowrap">
        Need to log out?
        <Link
          color={"goc.blue"}
          paddingLeft={".6rem"}
          fontWeight={"semibold"}
          cursor={"pointer"}
          onClick={async (e) => {
            e.preventDefault();
            await signOut();
            navigate("/");
          }}
        >
          Log out
        </Link>
      </Text>
    </VStack>
  );
};

export default ProfilePage;
