/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Icon, View } from "@aws-amplify/ui-react";
export default function Placeholder(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="375px"
      height="284px"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "Placeholder")}
    >
      <View
        width="375px"
        height="284px"
        position="absolute"
        left="0px"
        top="0px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(196.00000351667404,196.00000351667404,196.00000351667404,1)"
        {...getOverrideProps(overrides, "Rectangle 2")}
      ></View>
      <Icon
        width="470.4051818847656px"
        height="0px"
        pathData="M0 0L470.405 0L470.405 -1L0 -1L0 0Z"
        viewBox={{ minX: 0, minY: 0, width: 375, height: 284 }}
        color="rgba(0,0,0,1)"
        position="absolute"
        transformOrigin="top left"
        transform="matrix(0.7971851229667664, 0.6037347912788391, -0.18716281652450562, 0.9823288917541504, -2.2737367544323206e-13, -5.684341886080802e-14)"
        {...getOverrideProps(overrides, "Line 1")}
      ></Icon>
      <Icon
        width="470.4051818847656px"
        height="0px"
        pathData="M0 0L470.405 0L470.405 -1L0 -1L0 0Z"
        viewBox={{ minX: 0, minY: 0, width: 375, height: 284 }}
        color="rgba(0,0,0,1)"
        position="absolute"
        transformOrigin="top left"
        transform="matrix(0.7971851229667664, -0.6037347912788391, 0.18716281652450562, 0.9823288917541504, -2.2737367544323206e-13, 284)"
        {...getOverrideProps(overrides, "Line 2")}
      ></Icon>
    </View>
  );
}
