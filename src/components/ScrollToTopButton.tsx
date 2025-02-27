import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { IoIosArrowDropupCircle } from "react-icons/io";

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
          right={{ base: "16px", md: "30px" }}
          transition="opacity 2s ease-in-out"
          pointerEvents={"auto"}
          cursor={"pointer"}
          zIndex={3}
        >
          <IoIosArrowDropupCircle
            style={{ fontSize: "40px", color: "#3366CC" }}
          />
        </Box>
      )}
    </>
  );
}
