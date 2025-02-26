import { useState } from "react";
import { useForm } from "react-hook-form";
import { resetPassword, confirmResetPassword } from "aws-amplify/auth";
import { LoginTemplate } from "@/layouts/LoginTemplate";
import {
  Box,
  Button,
  Heading,
  Fieldset,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import GOCButton from "@/components/GOCButton";
import { NavbarActiveKey } from "@/components/Navbar";
import { MdOutlineEmail } from "react-icons/md";

interface RequestResetProps {
  email: string;
}

interface ConfirmResetProps {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export const ResetPage = () => {
  return (
    <LoginTemplate activeKey={NavbarActiveKey.LOGIN}>
      <ResetBody />
    </LoginTemplate>
  );
};

const ResetBody = () => {
  const [codeSent, setCodeSent] = useState(false);
  const [email, setEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  return (
    <VStack minWidth="15rem" width="100%" align="center">
      {resetSuccess ? (
        <>
          <Text color="black" fontSize="lg" textAlign="center">
            Your password has been reset successfully!
          </Text>
        </>
      ) : (
        <>
          {!codeSent ? (
            <RequestResetForm
              onCodeSent={(email) => {
                setEmail(email);
                setCodeSent(true);
              }}
            />
          ) : (
            <ConfirmResetForm
              email={email}
              onResetSuccess={() => setResetSuccess(true)}
            />
          )}

          <Link fontSize="sm" href="/signup">
            Create a new account
          </Link>
        </>
      )}
      <GOCButton href="/login">Back to login</GOCButton>
    </VStack>
  );
};

interface RequestResetFormProps {
  onCodeSent: (email: string) => void;
}

const RequestResetForm = ({ onCodeSent }: RequestResetFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RequestResetProps>();

  const onSubmit = async (data: RequestResetProps) => {
    try {
      await resetPassword({ username: data.email });
      onCodeSent(data.email);
    } catch (error: any) {
      console.error("Error sending reset instructions:", error);

      if (error.name === "LimitExceededException") {
        setError("email", {
          message: "Attempt limit exceeded, please try after some time",
        });
      } else if (error.name === "UserNotFoundException") {
        setError("email", {
          message: "No account exists with that email :(",
        });
      } else {
        setError("email", {
          message: error.message,
        });
      }
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" width="100%">
        <Fieldset.Legend textAlign="center" marginBottom="1rem">
          <Heading as="h2" marginBottom=".5rem" fontSize="2xl">
            Forgot Password?
          </Heading>
          <Text
            fontSize="md"
            color="gray.600"
            lineHeight="1.5"
            textWrap="balance"
          >
            Enter your email to reset your password.
          </Text>
        </Fieldset.Legend>
        <Box marginY=".6rem">
          <InputGroup flex="1" width="100%" startElement={<MdOutlineEmail />}>
            <Input
              variant="subtle"
              backgroundColor="#D9D9D9B2"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
          </InputGroup>
        </Box>
        {errors.email && (
          <Text margin="0" color="red" fontSize="sm">
            {errors.email.message}
          </Text>
        )}
        <Button
          type="submit"
          width="100%"
          bg="goc.gray.800"
          marginTop="1rem"
          marginBottom=".5rem"
        >
          Send Code
        </Button>
      </Fieldset.Root>
    </Box>
  );
};

interface ConfirmResetFormProps {
  email: string;
  onResetSuccess: () => void;
}

const ConfirmResetForm = ({ email, onResetSuccess }: ConfirmResetFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ConfirmResetProps>();

  const onSubmit = async (data: ConfirmResetProps) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: data.code,
        newPassword: data.newPassword,
      });
      onResetSuccess();
    } catch (error: any) {
      console.error("Error confirming reset password:", error);
      setError("root", { message: error.message });
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" width="100%">
        <Fieldset.Legend textAlign="center" marginBottom="1rem">
          <Heading as="h2" marginBottom=".5rem" fontSize="2xl">
            Confirm Reset
          </Heading>
          <Text
            fontSize="md"
            color="gray.600"
            lineHeight="1.5"
            textWrap="balance"
          >
            Check your email for a confirmation code!
          </Text>
        </Fieldset.Legend>
        <Box marginY=".6rem">
          <Input
            variant="subtle"
            backgroundColor="#D9D9D9B2"
            type="text"
            placeholder="Confirmation Code"
            {...register("code", {
              required: "Confirmation code is required",
            })}
          />
        </Box>
        {errors.code && (
          <Text margin="0" color="red" fontSize="sm">
            {errors.code.message}
          </Text>
        )}
        <Box marginY=".6rem">
          <Input
            variant="subtle"
            backgroundColor="#D9D9D9B2"
            type="password"
            placeholder="New Password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
        </Box>
        {errors.newPassword && (
          <Text margin="0" color="red" fontSize="sm">
            {errors.newPassword.message}
          </Text>
        )}
        <Box marginY=".6rem">
          <Input
            variant="subtle"
            backgroundColor="#D9D9D9B2"
            type="password"
            placeholder="Confirm New Password"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
            })}
          />
        </Box>
        {errors.confirmPassword && (
          <Text margin="0" color="red" fontSize="sm">
            {errors.confirmPassword.message}
          </Text>
        )}
        {errors.root && (
          <Text margin="0" color="red" fontSize="sm">
            {errors.root.message}
          </Text>
        )}
        <Button
          type="submit"
          width="100%"
          bg="goc.gray.800"
          marginTop="1rem"
          marginBottom=".5rem"
        >
          Reset Password
        </Button>
      </Fieldset.Root>
    </Box>
  );
};
