/**
 * Rider signup higher order conditional rendering component.
 */

import React, { useState } from "react";
import { Image } from "react-bootstrap";

import { Button } from "react-bootstrap";

import { Template } from "layouts/Template";
import { NavbarActiveKey } from "../Header/Header";

export const AboutUs = () => {
  return <Template activeKey={NavbarActiveKey.ABOUT} body={<AboutUsBody />} />;
};

const AboutUsBody = () => {
  return (
    <div className="text-center">
      <Image fluid rounded src={"/images/AboutUsBackground.png"} />
      <h1 className="about-us">
        {" "}
        <strong> About Us </strong>
      </h1>
      <h2>Who We Are</h2>
      <div className="about-us-container">
        <div className="about-us-body">
          <p>
            We are a ministry of Grace Community Church on the UCLA campus. We are a student group that exists to
            glorify God and spread a passion for His glory by making disciples, shepherding them to value Jesus Christ
            above all else, and training up the next generation of Christian leaders. In other words, we exist to edify
            and equip the saints, evangelize the lost, and exalt the Lord Jesus Christ in all things.
          </p>
          <p>
            Every Friday night we gather for a time of singing, hearing God's Word taught, and fellowship. It is during
            these weekly large group meetings that GOC comes together corporately to worship our great God.
          </p>
        </div>
      </div>
      <Button variant="dark">Welcome Packet</Button>
      <div className="about-us-video">
        <iframe src="https://www.youtube.com/embed/5T5BY1j2MkE" title="YouTube video" width="560" height="315"></iframe>
      </div>
    </div>
  );
};
