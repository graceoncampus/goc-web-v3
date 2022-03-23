/**
 * Template page to render header + background image + footer.
 */

import React from 'react';
import { Header } from 'Components/Header/Header';
import { Footer } from 'Components/Footer/Footer';
import { Container } from 'react-bootstrap';

import './Template.scss';

interface TemplateProps {
    headerBackgroundImagePath: string,
    body: React.ReactNode;
}

export const Template = (templateProps: TemplateProps) => {
    return (
        <div>
            <Header headerBackgroundImagePath={templateProps.headerBackgroundImagePath}/>
            <Container fluid className={'body-container'}>
                {templateProps.body}
            </Container>
            <Footer />
        </div>
    );
}