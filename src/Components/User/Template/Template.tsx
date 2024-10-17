/**
 * Template page to body between header and footer.
 */

import React, { useEffect, useState } from "react";
import { HeaderNavbarActiveKey, Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Container } from "react-bootstrap";

import "./Template.scss";
import { User, userStore } from "../../../store/User";
import { observer } from "mobx-react-lite";
import { useStore } from "store/StoreContext";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";

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
