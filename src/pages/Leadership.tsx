import { NavbarActiveKey } from "components/Navbar";
import { BannerTemplate } from "layouts/BannerTemplate";

export const LeadershipPage = () => {
  return (
    <BannerTemplate
      title="Leadership"
      activeKey={NavbarActiveKey.LEADERSHIP}
      imageSrc="/images/leadership.jpg"
      alt="Leadership page banner"
    >
      <LeadershipBody />
    </BannerTemplate>
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
          <div className="row">
            <div className="col-lg-6 mb-4">
              <img className="img-fluid" src="images/matt.jpg" alt="Matt Ng" />
            </div>
            <div className="description col-lg-6">
              <h4 className="mb-3">Matt Ng</h4>
              <p>
                Matt was born in San Francisco and raised in a Christian home,
                coming to saving faith at a young age. He moved to Los Angeles
                to attend UCLA, and became actively involved at Grace on Campus
                and Grace Community Church during his college years. A graduate
                of The Master’s Seminary, he has served as the shepherd of Grace
                on Campus since 2021. Matt and his wife Kimmie (also from San
                Francisco and a UCLA alum) are blessed with three boys and a
                girl. In their spare time, the Ngs enjoy watching the Warriors
                when they win, visiting coffee shops around town, and smoking
                meat in their backyard smoker.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
