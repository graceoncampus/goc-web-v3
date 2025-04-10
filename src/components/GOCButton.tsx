import { Button, Link } from "@chakra-ui/react";

interface GOCButtonProps {
  href?: string;
  children: React.ReactNode;
  buttonProps?: Record<string, any>;
  type?: "button" | "submit" | "reset";
  target?: "_self" | "_blank";
  disabled?: boolean;
}

const GOCButton: React.FC<GOCButtonProps> = ({
  href,
  children,
  buttonProps,
  type = "button",
  target = "_self",
  disabled = false,
}) => {
  if (href && !disabled) {
    return (
      <Button
        asChild={true}
        disabled={disabled}
        variant="solid"
        padding=".5rem 1rem"
        color="white"
        fontSize="sm"
        fontWeight="medium"
        boxShadow="none"
        border="none"
        marginTop="1.25rem"
        backgroundColor="goc.blue"
        transition="background .4s ease, box-shadow .4s ease"
        _hover={{
          textDecoration: "none",
          boxShadow: "md",
          backgroundColor: "rgb(49, 93, 180)", // slightly darker blue than goc.blue
          transition: "background .1s ease, box-shadow .1s ease",
        }}
        _focusVisible={{
          outline: "2px solid black",
          outlineOffset: "2px",
        }}
        {...buttonProps}
      >
        <Link href={href} target={target}>
          {children}
        </Link>
      </Button>
    );
  } else {
    return (
      <Button
        disabled={disabled}
        type={type}
        variant="solid"
        color="white"
        fontSize={{ base: "xs", md: "sm" }}
        fontWeight="medium"
        boxShadow="none"
        border="none"
        marginTop="1.25rem"
        backgroundColor="goc.blue"
        transition="background .4s ease, box-shadow .4s ease"
        _hover={{
          textDecoration: "none",
          boxShadow: disabled ? undefined : "md",
          backgroundColor: disabled ? "goc.blue" : "rgb(49, 93, 180)",
          transition: disabled
            ? undefined
            : "background 50ms ease, box-shadow 50ms ease",
        }}
        _focusVisible={{
          outline: "2px solid black",
          outlineOffset: "2px",
        }}
        {...buttonProps}
      >
        {children}
      </Button>
    );
  }
};

export default GOCButton;
