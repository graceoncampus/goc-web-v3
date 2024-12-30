import { Template } from "layouts/Template";
import React from "react";
import { Button } from "react-bootstrap";
import { NavbarActiveKey } from "components/Navbar";

interface TemplateProps {
  activeKey: NavbarActiveKey;
  body: React.ReactNode;
}

export const SmallGroups = () => {
  return (
    <Template activeKey={NavbarActiveKey.SMALL_GROUPS}>
      <SmallGroupsBody />
    </Template>
  );
};

const SmallGroupsBody = () => {
  return (
    <div className={"text-center"}>
      <div className="overlay" id="small-groups">
        <h1>Small Groups</h1>
      </div>
      <div className="sg-container">
        <div className="upper-body">
          <h2>What are Small Groups?</h2>
          Small groups are the backbone of our discipleship ministry. Each small
          group focuses on Bible study, prayer, fellowship, and accountability.
          In these smaller, more intimate groups, we have the opportunity to
          develop deep relationships so that we can better love, serve, and care
          for each other. Each small group has a leader who will minister to
          your spiritual needs, counsel you through life’s tough issues, and
          spur you on in your walk with the Lord.
        </div>
        <div className="lower-body">
          <h2>I want to join a small group!</h2>
          Awesome! Men's and women's small group leaders are listed in the
          following links, along with a quick intro so you can get to know them
          better.
        </div>
        <Button
          variant="dark"
          className="button"
          href="/docs/sgl-men.pdf"
          target="_blank"
        >
          Men's Small Group Leaders
        </Button>
        <Button
          className="button"
          variant="dark"
          href="/docs/sgl-women.pdf"
          target="_blank"
        >
          Women's Small Group Leaders
        </Button>
      </div>
    </div>
  );
};
