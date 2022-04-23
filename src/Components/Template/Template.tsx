/**
 * Template page to render header + background image + footer.
 */

import React from 'react';
import { HeaderNavbarActiveKey, Header } from 'Components/Header/Header';
import { Footer } from 'Components/Footer/Footer';
import { Container } from 'react-bootstrap';

import './Template.scss';

interface TemplateProps {
    activeKey: HeaderNavbarActiveKey,
    body: React.ReactNode
};

export const Template = (templateProps: TemplateProps) => {
    return (
        <div>
            <Header activeKey={templateProps.activeKey} />
            <Container fluid className={'body-container'}>
                {templateProps.body}
            </Container>
            <Footer />
        </div>
    );
}