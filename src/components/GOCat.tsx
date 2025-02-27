import { useState, useEffect } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

const ScrollToBottomButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    toaster.create({
      description: "Congrats! You've found the Bongo Cat! 👀",
      type: "success",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 295 && window.scrollY < 300) {
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
          position="fixed"
          bottom={"-27px"}
          left={"-15px"}
          zIndex={3}
          onClick={handleClick}
          userSelect={"none"}
        >
          <Image
            src="/assets/cat.png"
            width={"64px"}
            height={"64px"}
            transform="rotate(-13deg)"
          />
        </Box>
      )}
    </>
  );
};

export default ScrollToBottomButton;
