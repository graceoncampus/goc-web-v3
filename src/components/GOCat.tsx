import { useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

const ScrollToBottomButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    toaster.create({
      title: "Congrats! (Easter Egg 🥚)",
      description: "You've found the Bongo Cat!",
      type: "success",
      duration: 144_000,
      action: {
        label: "👀",
        onClick: () => toaster.dismiss(),
      },
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      const min = 200;
      const max = 1000;
      const start = Math.floor(Math.random() * (max - min)) + min;
      const end = start + 5;
      if (window.scrollY > start && window.scrollY < end) {
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
