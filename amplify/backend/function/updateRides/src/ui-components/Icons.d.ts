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
export declare type IconsOverridesProps = {
    Icons?: PrimitiveOverrideProps<ViewProps>;
    "sandwich menu"?: PrimitiveOverrideProps<ViewProps>;
    Vectoruzy?: PrimitiveOverrideProps<IconProps>;
    Vectorfti?: PrimitiveOverrideProps<IconProps>;
    Vectorvbl?: PrimitiveOverrideProps<IconProps>;
    rides?: PrimitiveOverrideProps<IconProps>;
    "small group"?: PrimitiveOverrideProps<ViewProps>;
    Vectorvuh?: PrimitiveOverrideProps<IconProps>;
    Vectorubw?: PrimitiveOverrideProps<IconProps>;
    Vectorkhb?: PrimitiveOverrideProps<IconProps>;
    Vectorkgr?: PrimitiveOverrideProps<IconProps>;
    Vectorzld?: PrimitiveOverrideProps<IconProps>;
    Vectorour?: PrimitiveOverrideProps<IconProps>;
    sermons?: PrimitiveOverrideProps<ViewProps>;
    Vectorlrv?: PrimitiveOverrideProps<IconProps>;
    Vectorwkh?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type IconsProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: IconsOverridesProps | undefined | null;
}>;
export default function Icons(props: IconsProps): React.ReactElement;
