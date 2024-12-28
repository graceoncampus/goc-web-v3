/**
 * Template page to body between header and footer.
 */

import { Box, Center, Heading } from "@chakra-ui/react";
import { Template, TemplateProps } from "./Template";

export interface BannerTemplateProps extends TemplateProps {
  title: string;
}

export const BannerTemplate = (templateProps: BannerTemplateProps) => {
  return (
    <Template activeKey={templateProps.activeKey}>
      <Box width={"100%"} background={"goc.gray"} padding={"60px"}>
        <Center>
          <Heading size={"5xl"}>{templateProps.title}</Heading>
        </Center>
      </Box>
      {templateProps.children}
    </Template>
  );
};
