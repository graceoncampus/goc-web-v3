import { useState } from "react";
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
import { Field } from "../../components/ui/field";
import { NavbarActiveKey } from "components/Navbar";
import { LoginTemplate } from "layouts/LoginTemplate";
import { InputGroup } from "components/ui/input-group";
import { MdOutlineEmail } from "react-icons/md";
import GOCButton from "components/GOCButton";

export const ResetPage = () => {
  return (
    <LoginTemplate activeKey={NavbarActiveKey.LOGIN}>
      <ResetBody />
    </LoginTemplate>
  );
};

const ResetBody = () => {
  const [email, setEmail] = useState("");

  return (
    <VStack minWidth={"15rem"} width={"100%"} align="center">
      <Box
        as="form"
        width="100%"
        onSubmit={(event) => {
          event.preventDefault();
          // todo: handle email submit for account recovery
        }}
      >
        <Fieldset.Root size="lg" width="100%">
          <Fieldset.Legend textAlign="center" marginBottom={"1rem"}>
            <Heading as="h2" marginBottom={".5rem"} fontSize="2xl">
              Forgot Password?
            </Heading>
            <Text
              fontSize="md"
              color="gray.600"
              lineHeight="1.5"
              textWrap={"balance"}
            >
              Enter your email to receive instructions to reset it.
            </Text>
          </Fieldset.Legend>
          <Field required marginY={".6rem"}>
            <InputGroup flex="1" width="100%" startElement={<MdOutlineEmail />}>
              <Input
                variant="subtle"
                backgroundColor="#D9D9D9B2"
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Field>
          <Button
            type="submit"
            width="100%"
            bg="goc.gray.800"
            marginTop={"1rem"}
            marginBottom={".5rem"}
          >
            Submit
          </Button>
        </Fieldset.Root>
      </Box>
      <Link fontSize="sm" href="/signup">
        Create a new account
      </Link>
      <GOCButton href="/login">Back to login</GOCButton>
    </VStack>
  );
};
