import { useEffect, useState } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { Box, IconButton } from "@chakra-ui/react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <Box
          onClick={scrollToTop}
          position="fixed"
          bottom="20px"
          right={{ base: "16px", md: "84px" }}
          opacity={isVisible ? 1 : 0}
          pointerEvents={isVisible ? "auto" : "none"}
          transition="opacity 0.5s ease-in-out"
          zIndex={3}
        >
          <IconButton size={"sm"} colorScheme="whatsapp" variant="solid">
            <IoIosArrowDropupCircle />
          </IconButton>
        </Box>
      )}
    </>
  );
}
