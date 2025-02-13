import { IconButton, Image } from "@chakra-ui/react";
import { BiHelpCircle } from "react-icons/bi";
import { Tooltip } from "components/ui/tooltip";

export const PickupLocationPopup = () => {
  return (
    <Tooltip
      content={<TurnaroundImage />}
      positioning={{ placement: "right-end" }}
      openDelay={0}
      showArrow
    >
      <IconButton aria-label="Pickup location help" variant="ghost" size="lg">
        <BiHelpCircle />
      </IconButton>
    </Tooltip>
  );
};

const TurnaroundImage = () => {
  return (
    <Image
      src="/images/PickupLocations.png"
      alt="Pickup Locations"
      borderRadius="md"
    />
  );
};
