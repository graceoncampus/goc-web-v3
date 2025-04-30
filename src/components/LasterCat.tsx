import { useState, useEffect, useRef } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { FaCat } from "react-icons/fa";

const LaserCat: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  const [score, setScore] = useState(0);
  const [dot, setDot] = useState({ x: 150, y: 150 });
  const [cat, setCat] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  const MIN_DIST_AWAY_FROM_CAT = 110;
  const CATCH_THRESHOLD = 12;
  const MARGIN = 20;

  const startGame = () => {
    setScore(0);
    setDot({ x: 150, y: 150 });
    setCat({ x: 0, y: 0 });
    setGameOver(false);
  };

  const onLaserHover = () => {
    if (gameOver || !stageRef.current) return;

    setScore(score + 1);

    const { width, height } = stageRef.current.getBoundingClientRect();
    let x: number, y: number;

    do {
      x = Math.random() * (width - MARGIN * 2) + MARGIN;
      y = Math.random() * (height - MARGIN * 2) + MARGIN;
    } while (Math.hypot(x - cat.x, y - cat.y) < MIN_DIST_AWAY_FROM_CAT);

    setDot({ x, y });
  };

  // Score notification
  useEffect(() => {
    if (score > 0 && score % 10 === 0 && score < 100) {
      toaster.create({
        title: `You've reached a score of ${score}`,
        description: "Keep it up!",
        type: "success",
        duration: 1500,
      });
    } else if (score === 100) {
      toaster.create({
        title: `Achievement Unlocked! (Easter Egg 🥚)`,
        description: "You reached 100 points! Let Yeadam know for a prize 🎁",
        type: "success",
        duration: 144_000,
      });
    }
  }, [score]);

  // Cat chase loop
  useEffect(() => {
    let rafId: number;

    const chase = () => {
      setCat((prev) => {
        const dx = dot.x - prev.x;
        const dy = dot.y - prev.y;
        const dist = Math.hypot(dx, dy);

        // Laer has been caught!
        if (dist < CATCH_THRESHOLD) {
          setGameOver(true);
          return prev; // Freeze cat
        }

        const speed = 1.5;
        return {
          x: prev.x + (dx / dist) * speed,
          y: prev.y + (dy / dist) * speed,
        };
      });

      if (!gameOver) rafId = requestAnimationFrame(chase);
    };

    rafId = requestAnimationFrame(chase);
    return () => cancelAnimationFrame(rafId);
  }, [dot, gameOver]);

  return (
    <Box position="relative" width="300px" height="300px">
      {/* Gameover overlay */}
      {gameOver && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={30}
          pointerEvents="auto"
          textAlign="center"
          bg="rgba(0,0,0,0.5)"
          paddingX={"4rem"}
          paddingY={"2rem"}
          borderRadius="md"
        >
          <Text fontSize="lg" fontWeight="bold" color="white">
            Game&nbsp;Over
          </Text>
          <Text fontSize="md" color="white">
            Score: {score}
          </Text>
          <Button
            size="sm"
            onClick={startGame}
            backgroundColor={"goc.blue"}
            marginTop={"1rem"}
          >
            Restart
          </Button>
        </Box>
      )}

      {/* Stage */}
      <Box
        ref={stageRef}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        pointerEvents="none"
        overflow="hidden"
      >
        {/* Laser dot */}
        <Box
          position="absolute"
          width="18px"
          height="18px"
          borderRadius="50%"
          backgroundColor="red.500"
          left={`${dot.x}px`}
          top={`${dot.y}px`}
          _hover={{ cursor: "pointer" }}
          onMouseEnter={onLaserHover}
          pointerEvents="auto"
        />

        {/* Cat */}
        <Box
          as={FaCat}
          position="absolute"
          fontSize="2xl"
          left={`${cat.x}px`}
          top={`${cat.y}px`}
          pointerEvents="none"
          transform={`rotate(${Math.atan2(dot.y - cat.y, dot.x - cat.x)}rad)`}
          transition="transform 0.1s linear"
        />
      </Box>
    </Box>
  );
};

export default LaserCat;
