/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function Navbar(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="51px"
      direction="row"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Navbar")}
      {...rest}
    >
      <Text
        fontFamily="Poppins"
        fontSize="18px"
        fontWeight="500"
        color="rgba(255,255,255,1)"
        lineHeight="21.09375px"
        textAlign="center"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="68px"
        height="23px"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        children="About"
        {...getOverrideProps(overrides, "About")}
      ></Text>
      <Text
        fontFamily="Poppins"
        fontSize="18px"
        fontWeight="500"
        color="rgba(255,255,255,1)"
        lineHeight="21.09375px"
        textAlign="center"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="102px"
        height="23px"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        children="Resources"
        {...getOverrideProps(overrides, "Resources")}
      ></Text>
      <Text
        fontFamily="Poppins"
        fontSize="18px"
        fontWeight="500"
        color="rgba(255,255,255,1)"
        lineHeight="21.09375px"
        textAlign="center"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="136px"
        height="22px"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        children="Small Groups"
        {...getOverrideProps(overrides, "Small Groups")}
      ></Text>
      <Text
        fontFamily="Poppins"
        fontSize="18px"
        fontWeight="500"
        color="rgba(255,255,255,1)"
        lineHeight="21.09375px"
        textAlign="center"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="64px"
        height="23px"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        children="Rides"
        {...getOverrideProps(overrides, "Rides")}
      ></Text>
      <Text
        fontFamily="Poppins"
        fontSize="18px"
        fontWeight="500"
        color="rgba(255,255,255,1)"
        lineHeight="21.09375px"
        textAlign="center"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="101px"
        height="28px"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        children="Log in"
        {...getOverrideProps(overrides, "Log in")}
      ></Text>
    </Flex>
  );
}
