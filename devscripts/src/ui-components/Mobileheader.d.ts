/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { IconProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type MobileheaderOverridesProps = {
    Mobileheader?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 38"?: PrimitiveOverrideProps<ViewProps>;
    "sandwich menu"?: PrimitiveOverrideProps<ViewProps>;
    Vectorffd?: PrimitiveOverrideProps<IconProps>;
    Vectorolr?: PrimitiveOverrideProps<IconProps>;
    Vectorurk?: PrimitiveOverrideProps<IconProps>;
    Vector?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type MobileheaderProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: MobileheaderOverridesProps | undefined | null;
}>;
export default function Mobileheader(props: MobileheaderProps): React.ReactElement;
