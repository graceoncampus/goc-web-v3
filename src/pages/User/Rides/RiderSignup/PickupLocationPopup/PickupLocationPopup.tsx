/**
 * Turnaround popup widget.
 */

import React from "react";
import Tippy from "@tippyjs/react";
import { Image } from "react-bootstrap";
import { IconContext } from "react-icons/lib";
import { BiHelpCircle } from "react-icons/bi";

export const PickupLocationPopup = () => {
  return (
    <Tippy content={<TurnaroundImage />} arrow={false}>
      <button type={"button"} className={"remove-button-styling"}>
        <IconContext.Provider value={{ className: "helpCircle" }}>
          <BiHelpCircle />
        </IconContext.Provider>
      </button>
    </Tippy>
  );
};

const TurnaroundImage = () => {
  return <Image fluid rounded src={"/images/PickupLocations.png"} />;
};
