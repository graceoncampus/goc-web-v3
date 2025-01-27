import { NavbarActiveKey } from "components/Navbar";
import { useEffect, useState } from "react";
import { BannerTemplate } from "layouts/BannerTemplate";

const mockTeams: MinistryTeam[] = [
  {
    title: "Welcome and Follow Up Team",
    description:
      "Welcome and Follow Up is an outreach ministry team that exists to obey the call of Romans 15:7 to “welcome one another as Christ has welcomed you, for the glory of God”. We serve on Fridays during large group and have biweekly meetings every even Monday. Our ministry team seeks to encourage our members to grow a greater love for the church body and for nonbelievers through the means of outreach.",
    leaders: "Cameron Ong, Britney Burnasky",
    contact: "cameron262002@gmail.com, (650) 450-7321",
  },
  {
    title: "Music Team",
    description:
      "Welcome and Follow Up is an outreach ministry team that exists to obey the call of Romans 15:7 to “welcome one another as Christ has welcomed you, for the glory of God”. We serve on Fridays during large group and have biweekly meetings every even Monday. Our ministry team seeks to encourage our members to grow a greater love for the church body and for nonbelievers through the means of outreach.",
    leaders: "Cameron Ong, Britney Burnasky",
    contact: "cameron262002@gmail.com, (650) 450-7321",
  },
  {
    title: "Sound Team",
    description:
      "Welcome and Follow Up is an outreach ministry team that exists to obey the call of Romans 15:7 to “welcome one another as Christ has welcomed you, for the glory of God”. We serve on Fridays during large group and have biweekly meetings every even Monday. Our ministry team seeks to encourage our members to grow a greater love for the church body and for nonbelievers through the means of outreach.",
    leaders: "Cameron Ong, Britney Burnasky",
    contact: "cameron262002@gmail.com, (650) 450-7321",
  },
];

export const MinistryTeamsPage: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  // Fire only on refresh/load
  useEffect(() => {
    const userLoginCheck = async () => {
      // Replace with actual login check logic
      // const loggedIn = await checkIsLoggedIn(); // Example API call
      // setIsUserLoggedIn(loggedIn);
    };

    userLoginCheck();
  }, []);

  // TODO: Get rid of active key eventually? Suggested by Sam
  return (
    <BannerTemplate
      title="Ministry Teams"
      activeKey={NavbarActiveKey.MINISTRY_TEAMS}
      imageSrc="/images/ministry_teams.jpg"
      alt="Ministry Teams page banner"
    >
      <TeamsBody MinistryTeams={mockTeams} isUserLoggedIn={isUserLoggedIn} />
    </BannerTemplate>
  );
};

interface MinistryTeam {
  title: string;
  description: string;
  leaders: string;
  contact: string;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

const TeamsBody: React.FC<{
  MinistryTeams: MinistryTeam[];
  isUserLoggedIn: boolean;
}> = ({ MinistryTeams, isUserLoggedIn }) => {
  return (
    <div className={"text-center"}>
      <div className="col-md-6 mx-auto px-3 py-4 my-2 order-md-1 left-align">
        <h2>List of Ministry Teams</h2>
        <hr />
        <ul>
          {MinistryTeams.map((MinistryTeam, index) => (
            <li key={index}>
              <a
                href={`#${slugify(MinistryTeam.title)}`}
                style={{ textDecoration: "none" }}
              >
                {MinistryTeam.title}
              </a>
            </li>
          ))}
        </ul>
        <hr className="mb-4" />

        {MinistryTeams.map((MinistryTeam, index) => (
          <div key={index} className="mt-5">
            <h2 className="anchor" id={slugify(MinistryTeam.title)}>
              {MinistryTeam.title}
            </h2>
            <hr />
            <p>{MinistryTeam.description}</p>
            {isUserLoggedIn ? (
              <>
                <p>
                  <strong>Leader(s):</strong> {MinistryTeam.leaders}
                </p>
                <p>
                  <strong>Contact:</strong> {MinistryTeam.contact}
                </p>
              </>
            ) : (
              <p>
                You need to be logged in to view the leader and contact
                information.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
