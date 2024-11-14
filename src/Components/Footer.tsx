/**
 * Footer.
 */

import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
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
        <Text>CONTACT US</Text>
        <Text>Phillip Ko</Text>
        <Text>(510) 612-7862</Text>
        <Text>gocateam@gmail.com</Text>
      </FooterColumn>
      <FooterColumn title="NEW TO GOC?">hey</FooterColumn>
      <FooterColumn title="Contact Us">hey</FooterColumn>
      <FooterColumn title="FOLLOW US">
        <Flex>
          <Image height={"35px"} src={"/assets/logo-facebook.png"} alt={"Facebook"} />
          <Image height={"35px"} src={"/assets/logo-instagram.png"} alt={"Instagram"} />
          <Image height={"35px"} src={"/assets/logo-vimeo.png"} alt={"Vimeo"} />
          <Image height={"35px"} src={"/assets/logo-wordpress.png"} alt={"Wordpress"} />
        </Flex>
      </FooterColumn>
    </Flex>
  );
}
