/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Text, View } from "@aws-amplify/ui-react";
export default function Signupbutton(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="122px"
      height="50px"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Signupbutton")}
      {...rest}
    >
      <View
        width="122px"
        height="50px"
        position="absolute"
        left="0px"
        top="0px"
        borderRadius="20px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(217.0000022649765,186.0000041127205,104.00000140070915,1)"
        {...getOverrideProps(overrides, "Rectangle 62")}
      ></View>
      <Text
        fontFamily="Poppins"
        fontSize="18px"
        fontWeight="600"
        color="rgba(255,255,255,1)"
        lineHeight="21.09375px"
        textAlign="center"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="89px"
        height="23px"
        position="absolute"
        left="16px"
        top="12px"
        padding="0px 0px 0px 0px"
        children="SIGN UP"
        {...getOverrideProps(overrides, "SIGN UP")}
      ></Text>
    </View>
  );
}
