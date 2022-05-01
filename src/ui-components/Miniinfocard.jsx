/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Image, Text, View } from "@aws-amplify/ui-react";
export default function Miniinfocard(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="414px"
      height="114px"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "Miniinfocard")}
    >
      <Image
        width="414px"
        height="114px"
        position="absolute"
        left="0px"
        top="0px"
        borderRadius="23.889999389648438px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "info cardlur")}
      ></Image>
      <View
        width="414px"
        height="114px"
        position="absolute"
        left="0px"
        top="0px"
        borderRadius="23.889999389648438px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(0,0,0,0.4000000059604645)"
        {...getOverrideProps(overrides, "info cardsmb")}
      ></View>
      <Text
        fontFamily="Poppins"
        fontSize="24px"
        fontWeight="400"
        color="rgba(255,255,255,1)"
        lineHeight="28.125px"
        textAlign="center"
        display="flex"
        direction="column"
        justifyContent="center"
        width="341.2975769042969px"
        height="47.720924377441406px"
        position="absolute"
        left="36.35127639770508px"
        top="31.814016342163086px"
        padding="0px 0px 0px 0px"
        children="TITLE TEXT"
        {...getOverrideProps(overrides, "TITLE TEXT")}
      ></Text>
    </View>
  );
}
