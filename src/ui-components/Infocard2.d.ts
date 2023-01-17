/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Infocard2OverridesProps = {
    Infocard2?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 47"?: PrimitiveOverrideProps<ViewProps>;
    "Ellipse 2"?: PrimitiveOverrideProps<IconProps>;
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet nisl purus in mollis."?: PrimitiveOverrideProps<TextProps>;
    "Title text"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type Infocard2Props = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: Infocard2OverridesProps | undefined | null;
}>;
export default function Infocard2(props: Infocard2Props): React.ReactElement;
