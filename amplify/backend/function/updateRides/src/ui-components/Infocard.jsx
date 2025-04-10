/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Icon, Image, Text, View } from "@aws-amplify/ui-react";
export default function Infocard(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="365px"
      height="432px"
      position="relative"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Infocard")}
      {...rest}
    >
      <Image
        width="372px"
        height="479px"
        position="absolute"
        left="-4px"
        top="0px"
        borderRadius="23.889999389648438px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "image")}
      ></Image>
      <View
        width="345px"
        height="192px"
        position="absolute"
        left="10px"
        top="306px"
        borderRadius="23.889999389648438px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "info card")}
      ></View>
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
        width="289px"
        height="91px"
        position="absolute"
        left="38px"
        top="387px"
        padding="0px 0px 0px 0px"
        children="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl purus in mollis."
        {...getOverrideProps(
          overrides,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl purus in mollis."
        )}
      ></Text>
      <Text
        fontFamily="Poppins"
        fontSize="24px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="28.125px"
        textAlign="left"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="276px"
        height="33px"
        position="absolute"
        left="38px"
        top="341px"
        padding="0px 0px 0px 0px"
        children="Title text"
        {...getOverrideProps(overrides, "Title text")}
      ></Text>
      <View
        padding="0px 0px 0px 0px"
        width="33px"
        height="33px"
        position="absolute"
        left="281px"
        top="341px"
        {...getOverrideProps(overrides, "learn more button")}
      >
        <Icon
          width="33px"
          height="33px"
          pathData="M33 16.5C33 25.6127 25.6127 33 16.5 33C7.3873 33 0 25.6127 0 16.5C0 7.3873 7.3873 0 16.5 0C25.6127 0 33 7.3873 33 16.5Z"
          viewBox={{ minX: 0, minY: 0, width: 33, height: 33 }}
          color="rgba(50.99999696016312,102.00002431869507,204.00000303983688,1)"
          position="absolute"
          left="0px"
          top="0px"
          {...getOverrideProps(overrides, "learn more")}
        ></Icon>
        <Icon
          width="12.7927885055542px"
          height="0px"
          pathData="M2 -4C0.895431 -4 0 -3.10457 0 -2C0 -0.895431 0.895431 0 2 0L2 -4ZM10.7928 0C11.8974 0 12.7928 -0.895431 12.7928 -2C12.7928 -3.10457 11.8974 -4 10.7928 -4L10.7928 0ZM2 0L10.7928 0L10.7928 -4L2 -4L2 0Z"
          viewBox={{
            minX: 0,
            minY: 0,
            width: 9.8046875,
            height: 8.21728515625,
          }}
          color="rgba(255,255,255,1)"
          position="absolute"
          transformOrigin="top left"
          transform="matrix(0.7664164900779724, 0.6423439979553223, -0.6423439979553223, 0.7664164900779724, 12, 11)"
          {...getOverrideProps(overrides, "Line 3")}
        ></Icon>
        <Icon
          width="11.67828369140625px"
          height="0px"
          pathData="M2 -4C0.895431 -4 0 -3.10457 0 -2C0 -0.895431 0.895431 0 2 0L2 -4ZM9.67828 0C10.7829 0 11.6783 -0.895431 11.6783 -2C11.6783 -3.10457 10.7829 -4 9.67828 -4L9.67828 0ZM2 -2.22045e-16L9.67828 -2.22045e-16L9.67828 -4L2 -4L2 -2.22045e-16Z"
          viewBox={{
            minX: 0,
            minY: 0,
            width: 8.60888671875,
            height: 7.891357421875,
          }}
          color="rgba(255,255,255,1)"
          position="absolute"
          transformOrigin="top left"
          transform="matrix(0.7371541261672974, -0.6757246255874634, 0.6757246255874634, 0.7371541261672974, 14.63037109375, 25.673828125)"
          {...getOverrideProps(overrides, "Line 4")}
        ></Icon>
      </View>
    </View>
  );
}
