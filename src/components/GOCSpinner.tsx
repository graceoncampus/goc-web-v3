import { Stack, Spinner, Text } from "@chakra-ui/react";

interface LoadingSpinnerProps {
  text?: string;
  marginY?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Loading...",
  marginY = "1rem",
}) => {
  return (
    <Stack marginY={marginY} align="center">
      <Spinner color="goc.blue" animationDuration="0.8s" borderWidth="3px" />
      <Text color="goc.blue">{text}</Text>
    </Stack>
  );
};

export default LoadingSpinner;
