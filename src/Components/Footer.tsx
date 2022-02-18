/**
 * Footer.
 */

 import React from 'react';
 import { Button, Row, Col, Container, Form} from 'react-bootstrap';
 
 import './Footer.scss'
 
 export const Footer = () => {
     return (
         <Container fluid className={'footer'}>
             <Row className={'footer-content'}>
                <Col xs={4}>
                    <a href={'https://www.gracechurch.org/'}><img className={'gcc-logo'} src={'./assets/logo-gcc.png'} alt={'Grace Community Church'}></img></a>
                    <br />
                    <br />
                    <span className={'footer-label'}>&nbsp;FOLLOW US</span>
                    <br />
                    <img className={'logo-icon'} src={'./assets/logo-facebook.png'} alt={'Facebook'}></img>
                    <img className={'logo-icon'} src={'./assets/logo-instagram.png'} alt={'Instagram'}></img>
                    <img className={'logo-icon'} src={'./assets/logo-vimeo.png'} alt={'Vimeo'}></img>
                    <img className={'logo-icon'} src={'./assets/logo-wordpress.png'} alt={'Wordpress'}></img>
                </Col>
                <Col>
                    <span className={'footer-label'}>GRACE ON CAMPUS</span>
                    <br />
                    <span className={'footer-text'}>Fridays at 7pm</span>
                    <br />
                    <span className={'footer-text'}>Broad Art Center 2160E</span>
                    <br />
                    <br />
                    <span className={'footer-label'}>CONTACT US</span>
                    <br />
                    <span className={'footer-text'}>Phillip Ko</span>
                    <br />
                    <span className={'footer-text'}>(510) 612-7862</span>
                    <br />
                    <span className={'footer-text'}>gocateam@gmail.com</span>
                </Col>
                <Col>
                    <span className={'footer-label'}>NEW TO GOC?</span>
                    <br />
                    <span className={'footer-text'}>We'd love to get in touch with you!</span>
                    <Form>
                        <Form.Group controlId={'name'}>
                            <Form.Label className={'newcomer-form-label'}> Name </Form.Label>
                            <Form.Control placeholder={'Enter your name'} />
                        </Form.Group>

                        <Form.Group controlId={'email'}>
                            <Form.Label className={'newcomer-form-label'}> Email </Form.Label>
                            <Form.Control type={'email'} placeholder={'Enter your email'} />
                        </Form.Group>

                        <Button className={'newcomer-form-submit'} variant={'submit'} type={'submit'}>
                            SUBMIT
                        </Button>
                    </Form>
                </Col>
             </Row>
             
         </Container>
     );
 };