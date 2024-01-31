/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type MobilefooterOverridesProps = {
    Mobilefooter?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 39"?: PrimitiveOverrideProps<ViewProps>;
    "grace community church logo"?: PrimitiveOverrideProps<ViewProps>;
    GRACE?: PrimitiveOverrideProps<TextProps>;
    "COMMUNITY CHURCH"?: PrimitiveOverrideProps<TextProps>;
    "GRACE ON CAMPUS"?: PrimitiveOverrideProps<TextProps>;
    "CONTACT US"?: PrimitiveOverrideProps<TextProps>;
    "Fridays at 7pm Broad Art Center 2160E"?: PrimitiveOverrideProps<TextProps>;
    "Phillip Ko (510) 612-7862 gocateam@gmail.com"?: PrimitiveOverrideProps<TextProps>;
    "NEW TO GOC?"?: PrimitiveOverrideProps<TextProps>;
    "We\u2019d love to get in touch with you!"?: PrimitiveOverrideProps<TextProps>;
    Name?: PrimitiveOverrideProps<TextProps>;
    Email?: PrimitiveOverrideProps<TextProps>;
    "Rectangle 25"?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 26"?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 27"?: PrimitiveOverrideProps<ViewProps>;
    SUBMIT?: PrimitiveOverrideProps<TextProps>;
    Vectorhhk?: PrimitiveOverrideProps<IconProps>;
    "akar-icons:facebook-fill"?: PrimitiveOverrideProps<ViewProps>;
    Grouphik?: PrimitiveOverrideProps<ViewProps>;
    Vectordyt?: PrimitiveOverrideProps<IconProps>;
    "bi:wordpress"?: PrimitiveOverrideProps<ViewProps>;
    Grouplov?: PrimitiveOverrideProps<ViewProps>;
    Vectormjy?: PrimitiveOverrideProps<IconProps>;
    Vectorjtc?: PrimitiveOverrideProps<IconProps>;
    Vectormwi?: PrimitiveOverrideProps<IconProps>;
    "akar-icons:vimeo-fill"?: PrimitiveOverrideProps<ViewProps>;
    Groupess?: PrimitiveOverrideProps<ViewProps>;
    Vectorjjq?: PrimitiveOverrideProps<IconProps>;
    "FOLLOW US"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type MobilefooterProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: MobilefooterOverridesProps | undefined | null;
}>;
export default function Mobilefooter(props: MobilefooterProps): React.ReactElement;
