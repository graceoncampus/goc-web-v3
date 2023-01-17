/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Text, View } from "@aws-amplify/ui-react";
export default function GOCappad(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="1440px"
      height="512px"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "GOCappad")}
      {...rest}
    >
      <View
        width="1440px"
        height="512px"
        position="absolute"
        left="0px"
        top="0px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(50.99999696016312,102.00002431869507,204.00000303983688,0.4699999988079071)"
        {...getOverrideProps(overrides, "Rectangle 35")}
      ></View>
      <View
        width="166px"
        height="47px"
        position="absolute"
        left="759px"
        top="352px"
        borderRadius="10px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(0,0,0,1)"
        {...getOverrideProps(overrides, "download on android")}
      ></View>
      <View
        width="166px"
        height="47px"
        position="absolute"
        left="569px"
        top="352px"
        borderRadius="10px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(0,0,0,1)"
        {...getOverrideProps(overrides, "download on apple")}
      ></View>
      <Text
        fontFamily="Poppins"
        fontSize="18px"
        fontWeight="400"
        color="rgba(255,255,255,1)"
        lineHeight="21.09375px"
        textAlign="left"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="676px"
        height="81px"
        position="absolute"
        left="569px"
        top="247px"
        padding="0px 0px 0px 0px"
        children="Stay connected with GOC wherever and whenever! Listen to sermons on the go, check and sign up for rides to church, read blog posts written by your fellow GOCers, and keep updated on the latest news and events."
        {...getOverrideProps(
          overrides,
          "Stay connected with GOC wherever and whenever! Listen to sermons on the go, check and sign up for rides to church, read blog posts written by your fellow GOCers, and keep updated on the latest news and events."
        )}
      ></Text>
      <View
        width="296px"
        height="436px"
        position="absolute"
        left="200px"
        top="76px"
        borderRadius="60px 60px 0px 0px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,252.23753303289413,252.23753303289413,1)"
        {...getOverrideProps(overrides, "iphone")}
      ></View>
      <Text
        fontFamily="Poppins"
        fontSize="36px"
        fontWeight="600"
        color="rgba(255,255,255,1)"
        lineHeight="42.1875px"
        textAlign="left"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="555px"
        height="57px"
        position="absolute"
        left="569px"
        top="178px"
        padding="0px 0px 0px 0px"
        children="The Grace on Campus app"
        {...getOverrideProps(overrides, "The Grace on Campus app")}
      ></Text>
    </View>
  );
}
