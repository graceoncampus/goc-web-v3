/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Icon, Text, View } from "@aws-amplify/ui-react";
export default function Infocard2(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="286px"
      height="359px"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Infocard2")}
      {...rest}
    >
      <View
        width="286px"
        height="359px"
        position="absolute"
        left="0px"
        top="0px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(246.49999290704727,246.49999290704727,246.49999290704727,1)"
        {...getOverrideProps(overrides, "Rectangle 47")}
      ></View>
      <Icon
        width="160px"
        height="160px"
        pathData="M160 80C160 124.183 124.183 160 80 160C35.8172 160 0 124.183 0 80C0 35.8172 35.8172 0 80 0C124.183 0 160 35.8172 160 80Z"
        viewBox={{ minX: 0, minY: 0, width: 160, height: 160 }}
        color="rgba(196.00000351667404,196.00000351667404,196.00000351667404,1)"
        position="absolute"
        left="63px"
        top="36px"
        {...getOverrideProps(overrides, "Ellipse 2")}
      ></Icon>
      <Text
        fontFamily="Poppins"
        fontSize="14px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="16.40625px"
        textAlign="left"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="199px"
        height="64px"
        position="absolute"
        left="44px"
        top="252px"
        padding="0px 0px 0px 0px"
        children="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet nisl purus in mollis."
        {...getOverrideProps(
          overrides,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet nisl purus in mollis."
        )}
      ></Text>
      <Text
        fontFamily="Poppins"
        fontSize="24px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="28.125px"
        textAlign="center"
        display="flex"
        direction="column"
        justifyContent="center"
        width="226px"
        height="40px"
        position="absolute"
        left="30px"
        top="212px"
        padding="0px 0px 0px 0px"
        children="Title text"
        {...getOverrideProps(overrides, "Title text")}
      ></Text>
    </View>
  );
}
