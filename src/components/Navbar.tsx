import {
  Box,
  Flex,
  Button,
  Image,
  Center,
  Link,
  MenuRoot,
  MenuRootProvider,
  MenuTrigger,
} from "@chakra-ui/react";

import { ColorModeButton } from "./ui/color-mode";
import navlinks from "./navlinks";

interface SubLink {
  name: string;
  link: string;
}

interface NavItem {
  name: string;
  selected: boolean;
  link?: string;
  sublinks?: SubLink[];
}

interface NavbarProps {
  selectedNavItemName: string;
}

function NavItem(props: NavItem) {
  if (props.link) {
    return (
      <Button variant={"plain"} m={2}>
        <Link href={props.link} fontWeight={props.selected ? "bold" : ""}>
          {props.name}
        </Link>
      </Button>
    );
  } else if (props.sublinks && props.sublinks.length > 0) {
    return <></>;
  }
}

export default function Navbar(props: NavbarProps) {
  return (
    <Flex m={0} px={2} justify="space-between">
      <Center>
        <Image src="/assets/goc-header.svg" />
      </Center>
      <Box>
        {navlinks.map((navItem) => (
          <NavItem
            name={navItem.name}
            link={navItem.link}
            sublinks={navItem.subLinks}
            selected={props.selectedNavItemName === navItem.name}
          />
        ))}
        <Button
          m={2}
          variant={"solid"}
          colorPalette={"blue"}
          fontWeight={"bold"}
        >
          Log in
        </Button>
        <ColorModeButton />
      </Box>
    </Flex>
  );
}
