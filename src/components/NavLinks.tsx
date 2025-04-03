/*
 *  FORMAT
 *
 *  name: string
 *  link: string
 *  sublinks: SublinkProps[] (have dropdown)
 *      name: string
 *      link: string
 *      external: boolean (when true, adds external link icon)
 */
import { SocialMedia } from "@/constants/Links";

const NavLinks = [
  {
    name: "About",
    sublinks: [
      {
        name: "About Us",
        link: "/about",
      },
      {
        name: "Our Beliefs",
        link: "/ourbeliefs",
      },
      {
        name: "Leadership",
        link: "/leadership",
      },
    ],
  },
  {
    name: "Get involved",
    sublinks: [
      {
        name: "Small Groups",
        link: "/smallgroups",
      },
      {
        name: "Ministry Teams",
        link: "/ministryteams",
      },
    ],
  },
  {
    name: "Resources",
    sublinks: [
      {
        name: "Sermons",
        link: "/sermons",
      },
      {
        name: "John Study Guide",
        link: "/john-study-guide",
      },
      {
        name: "Linktree",
        link: SocialMedia.linktree,
        external: true,
      },
    ],
  },
  // NOT CURRENTLY IN USE
  // {
  //   name: "Prayer Requests",
  //   link: "/prayer-request",
  // },
  {
    name: "Events",
    link: "/events",
  },
  {
    name: "Rides",
    link: "/rides",
  },
];

export default NavLinks;
