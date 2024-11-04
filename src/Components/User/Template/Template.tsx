/**
 * Template page to body between header and footer.
 */

import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Footer } from "../Footer/Footer";
import { Header, HeaderNavbarActiveKey } from "../Header/Header";

import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { observer } from "mobx-react-lite";
import { useStore } from "store/StoreContext";
import "./Template.scss";

interface TemplateProps {
  activeKey: HeaderNavbarActiveKey;
  body: React.ReactElement;
}

export const Template = observer((templateProps: TemplateProps) => {
  const userStore = useStore();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
        const userAttributes = await fetchUserAttributes();
        userStore.setName(userAttributes?.name || "");
        console.log(userAttributes);
      } catch (err) {
        console.log(err);
      } finally {
      }
    };

    if (!userStore.isLoggedIn()) {
      checkLogin();
    }
  }, []);

  return (
    <div className={"page-container"}>
      <Header activeKey={templateProps.activeKey} />

      <Container fluid className={"body-container"}>
        {templateProps.body}
      </Container>

      <Footer />
    </div>
  );
});
