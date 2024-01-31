/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type GOCappadmobileOverridesProps = {
    GOCappadmobile?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 35"?: PrimitiveOverrideProps<ViewProps>;
    "download on android"?: PrimitiveOverrideProps<ViewProps>;
    "download on apple"?: PrimitiveOverrideProps<ViewProps>;
    "Stay connected with GOC wherever and whenever! Listen to sermons on the go, check and sign up for rides to church, read blog posts written by your fellow GOCers, and keep updated on the latest news and events."?: PrimitiveOverrideProps<TextProps>;
    "The Grace on Campus app"?: PrimitiveOverrideProps<TextProps>;
    iphone?: PrimitiveOverrideProps<ViewProps>;
} & EscapeHatchProps;
export declare type GOCappadmobileProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: GOCappadmobileOverridesProps | undefined | null;
}>;
export default function GOCappadmobile(props: GOCappadmobileProps): React.ReactElement;
