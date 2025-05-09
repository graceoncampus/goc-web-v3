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
import { PRAYER_GOOGLE_FORM_LINK, SocialMedia } from "@/constants/Links";

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
    ],
  },
  {
    name: "Linktree",
    link: SocialMedia.linktree,
    external: true,
  },
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
