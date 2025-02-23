import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Field } from "components/ui/field";
import { Toaster, toaster } from "components/ui/toaster";
import { FaFacebook, FaWordpress, FaInstagram, FaVimeoV } from "react-icons/fa";
import { TfiLocationPin } from "react-icons/tfi";
import { LuClock7 } from "react-icons/lu";
import { ContactInfo } from "constants/ContactInfo";
import { SocialMedia } from "@/constants/Links";

interface FooterColumnProps {
  title: string;
  children?: React.ReactNode | null;
}

interface FormValues {
  name: string;
  email: string;
}

function FooterColumn(props: FooterColumnProps) {
  return (
    <Box>
      <Text
        fontWeight={"medium"}
        fontSize={"1rem"}
        lineHeight={"1.5625rem"}
        color={"#AFAFAF"}
        marginBottom={".3rem"}
      >
        {props.title.toUpperCase()}
      </Text>
      {props.children}
    </Box>
  );
}

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    // todo: send email
    toaster.create({ description: "Submitted!", type: "success" });
  });

  return (
    <Box as="footer" bgColor={"goc.gray"} padding={"3.25rem"} maxWidth={"100%"}>
      <Toaster />
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr) 1.7fr 1fr",
        }}
        templateRows="auto"
        gap={12}
        alignItems={"start"}
      >
        {/* Logo */}
        <GridItem
          gridColumn={{ base: "1 / -1", md: "1 / 2", xl: "1 / 2" }}
          gridRow="1"
        >
          <Container
            width={"min(100%, 20rem)"}
            maxHeight={"5.875"}
            paddingLeft={"0"}
            paddingRight={"1rem"}
            margin={"0"}
          >
            <Image
              width={"100%"}
              height={"auto"}
              src={"/assets/logo-gcc.png"}
              alt={"Grace Community Church"}
              objectFit="cover"
              objectPosition="center"
            />
          </Container>
        </GridItem>

        {/* Grace on Campus */}
        <GridItem
          gridColumn={{ base: "1 / -1", md: "2 / 3", xl: "2 / 3" }}
          gridRow={{ base: "2", md: "1", xl: "1" }}
        >
          <FooterColumn title="GRACE ON CAMPUS">
            <Stack gap={".5rem"}>
              <Flex alignItems={"center"}>
                <LuClock7 />
                <Text fontSize={"md"} marginLeft={".2rem"}>
                  {ContactInfo.day} at {ContactInfo.time}
                </Text>
              </Flex>

              <Flex alignItems={"center"}>
                <TfiLocationPin />
                <Text fontSize={"md"} marginLeft={".2rem"}>
                  {ContactInfo.location}
                </Text>
              </Flex>
            </Stack>
          </FooterColumn>
        </GridItem>

        {/* Contact Us */}
        <GridItem
          gridColumn={{ base: "1 / -1", md: "1 / 2", xl: "3 / 4" }}
          gridRow={{ base: "3", md: "2", xl: "1" }}
        >
          <FooterColumn title="CONTACT US">
            <Stack gap={".1rem"}>
              <Text fontSize={"md"}>{ContactInfo.name}</Text>
              <Text fontSize={"md"}>{ContactInfo.phone}</Text>
              <Text fontSize={"md"}>{ContactInfo.email}</Text>
            </Stack>
          </FooterColumn>
        </GridItem>

        {/* Forms */}
        <GridItem
          gridColumn={{ base: "1 / -1", md: "2 / 3", xl: "4 / 5" }}
          gridRow={{ base: "4", md: "2 / 4", xl: "1" }}
        >
          <FooterColumn title="NEW TO GOC?">
            <Text fontSize={"md"} marginBottom={"1rem"}>
              We'd love to get in touch with you!
            </Text>
            <form onSubmit={onSubmit}>
              <Box marginBottom={2}>
                <Field
                  label={
                    <Text fontSize={"sm"} fontWeight={"semibold"}>
                      Name:
                    </Text>
                  }
                  errorText={errors.name?.message}
                  invalid={!!errors.name}
                >
                  <Input
                    type="name"
                    size="sm"
                    autoComplete="name"
                    {...register("name", { required: "Name is required" })}
                  />
                </Field>
              </Box>
              <Box marginBottom={2}>
                <Field
                  label={
                    <Text fontSize={"sm"} fontWeight={"semibold"}>
                      Email:
                    </Text>
                  }
                  errorText={errors.email?.message}
                  invalid={!!errors.email}
                >
                  <Input
                    type="email"
                    size="sm"
                    autoComplete="email"
                    {...register("email", { required: "Email is required" })}
                  />
                </Field>
              </Box>
              <Button
                variant={"plain"}
                type={"submit"}
                background={"goc.blue"}
                color={"white"}
                size={"sm"}
                width={"100%"}
              >
                Submit
              </Button>
            </form>
          </FooterColumn>
        </GridItem>

        {/* Follow Us */}
        <GridItem
          gridColumn={{ base: "1 / -1", md: "1 / 2", xl: "5 / 6" }}
          gridRow={{ base: "5", md: "3", xl: "1" }}
        >
          <FooterColumn title="FOLLOW US">
            <Flex justify={"start"} align="center" flexDirection="row" gap={4}>
              <Link
                href={SocialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="4xl"
                _hover={{ color: "#316FF6", transform: "scale(1.05)" }}
                transition="all .2s ease-in-out"
              >
                <FaFacebook />
              </Link>
              <Link
                href={SocialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="4xl"
                _hover={{ color: "#d62976", transform: "scale(1.05)" }}
                transition="all .2s ease-in-out"
              >
                <FaInstagram />
              </Link>
              <Link
                href={SocialMedia.vimeo}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="4xl"
                _hover={{ color: "#86c9ef", transform: "scale(1.05)" }}
                transition="all .2s ease-in-out"
              >
                <FaVimeoV />
              </Link>
              <Link
                href={SocialMedia.wordpress}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="4xl"
                _hover={{ color: "#00749c", transform: "scale(1.05)" }}
                transition="all .2s ease-in-out"
              >
                <FaWordpress />
              </Link>
            </Flex>
          </FooterColumn>
        </GridItem>
      </Grid>
    </Box>
  );
}
