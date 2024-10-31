import { Template } from "Components/User/Template/Template";
import { HeaderNavbarActiveKey } from "../Header/Header";

import "./Leadership.scss";

export const Leadership = () => {
  return (
    <Template
      activeKey={HeaderNavbarActiveKey.LEADERSHIP}
      body={<LeadershipBody />}
    />
  );
};

const LeadershipBody = () => {
  return (
    <div>
      <div className="overlay" id="small-groups">
        <h1>Leadership</h1>
      </div>
      <div className="leadership-section-container">
        <div className="section">
          <h2>Shepherd</h2>
          <h4>Header 2</h4>
          <body>filler text</body>
        </div>
      </div>
    </div>
  );
};
