import { fetchUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";

import { ReactNode } from "react";

export default function LoggedOutTemplate({
  children,
}: {
  children: ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await fetchUserAttributes();
        setLoggedIn(true);
      } catch (error) {
        setLoggedIn(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (loggedIn) window.location.href = "/";
  }, [loggedIn]);

  return children;
}
