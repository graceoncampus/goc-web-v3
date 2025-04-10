/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NavbartimOverridesProps = {
    Navbartim?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 62"?: PrimitiveOverrideProps<ViewProps>;
    "Frame 1"?: PrimitiveOverrideProps<FlexProps>;
    About?: PrimitiveOverrideProps<TextProps>;
    Resources?: PrimitiveOverrideProps<TextProps>;
    "Small Groups"?: PrimitiveOverrideProps<TextProps>;
    Rides?: PrimitiveOverrideProps<TextProps>;
    "Log In"?: PrimitiveOverrideProps<TextProps>;
    "SIGN UP"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type NavbartimProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: NavbartimOverridesProps | undefined | null;
}>;
export default function Navbartim(props: NavbartimProps): React.ReactElement;
