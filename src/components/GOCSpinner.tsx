import { Stack, Spinner, Text } from "@chakra-ui/react";

const LoadingSpinner: React.FC = () => {
  return (
    <Stack marginY="1rem" align="center">
      <Spinner color="goc.blue" animationDuration="0.8s" borderWidth="3px" />
      <Text color="goc.blue">Loading...</Text>
    </Stack>
  );
};

export default LoadingSpinner;
