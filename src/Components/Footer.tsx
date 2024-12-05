/**
 * Footer.
 */

import { Box, Button, Center, Flex, Image, Input, Text } from "@chakra-ui/react";
import React from "react";

export interface FooterColumnProps {
  title: string;
  children?: React.ReactNode | null;
}

function FooterColumn(props: FooterColumnProps) {
  return (
    <Box>
      <Text fontWeight={"500"} fontSize={"1rem"} lineHeight={"1.5625rem"} color={"#AFAFAF"}>
        {props.title.toUpperCase()}
      </Text>
      {props.children}
    </Box>
  );
}

export default function Footer() {
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
  };

  return (
    <Flex justify={"space-between"} padding={"2rem"} bgColor={"goc.gray"}>
      <Image height={"94px"} src={"/assets/logo-gcc.png"} alt={"Grace Community Church"} />
      <FooterColumn title="GRACE ON CAMPUS">
        <Text>Fridays at 7pm</Text>
        <Text>Broad Art Center 2160E</Text>
      </FooterColumn>
      <FooterColumn title="Contact Us">
        <Text>Phillip Ko</Text>
        <Text>(510) 612-7862</Text>
        <Text>gocateam@gmail.com</Text>
      </FooterColumn>
      <FooterColumn title="NEW TO GOC?">
        <Text>We'd love to get in touch with you!</Text>
        <Text fontWeight={"bold"}>Name: </Text>
        <Input />
        <Text fontWeight={"bold"}>Email: </Text>
        <Input />
        <Button marginTop={"4px"} background={"goc.blue"}>
          Submit
        </Button>
      </FooterColumn>
      <FooterColumn title="FOLLOW US">
        <Flex justify={"space-between"}>
          <Image height={"35px"} src={"/assets/logo-facebook.png"} alt={"Facebook"} margin={"0 0.5rem"} />
          <Image height={"35px"} src={"/assets/logo-instagram.png"} alt={"Instagram"} margin={"0 0.5rem"} />
          <Image height={"35px"} src={"/assets/logo-vimeo.png"} alt={"Vimeo"} margin={"0 0.5rem"} />
          <Image height={"35px"} src={"/assets/logo-wordpress.png"} alt={"Wordpress"} margin={"0 0.5rem"} />
        </Flex>
      </FooterColumn>
    </Flex>
  );
}
