import { Signup } from "components/user/Signup";

import { signUp } from "aws-amplify/auth";

export const handleSignup = async (signup: Signup) => {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: signup.email,
      password: signup.password,
      options: {
        userAttributes: {
          email: signup.email,
        },
      },
      // options: {
      //   userAttributes: {
      //     firstName: signup.firstName,
      //     lastName: signup.lastName,
      //     email: signup.email,
      //     phone_number: signup.phoneNumber,
      //     address: signup.address,
      //     gradYear: signup.gradYear,
      //   },
      // },
    });
    console.log(isSignUpComplete, userId);
  } catch (error) {
    console.log("error signing up:", error);
  }
};

import { confirmSignUp, type ConfirmSignUpInput } from "aws-amplify/auth";

async function handleSignUpConfirmation({ username, confirmationCode }: ConfirmSignUpInput) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username,
      confirmationCode,
    });
  } catch (error) {
    console.log("error confirming sign up", error);
  }
}
