import React from 'react';
import { Button, Form } from 'react-bootstrap';

import { Turnarounds } from "../../../Constants/RidesConstants";

export const RiderSignup = () => {
    return (
        <div className={'container'}>
            <div className={'col-lg-10 mx-auto text-center'}>
                <h1>
                    Sign up for a ride to Church!
                </h1>

                <Form className={'text-center'}>
                    <div className={'text-start'}>
                        <Form.Group className={'mb-3'} controlId={'riderName'}>
                            <Form.Label> Name * </Form.Label>
                            <Form.Control
                                placeholder={'Enter your name'}
                            />
                        </Form.Group>

                        <Form.Group className={'mb-3'} controlId={'riderEmail'}>
                            <Form.Label> Email * </Form.Label>
                            <Form.Control
                                type={'email'}
                                placeholder={'Enter your email'}
                            />
                        </Form.Group>

                        <Form.Group className={'mb-3'} controlId={'riderPhoneNumber'}>
                            <Form.Label> Phone Number * </Form.Label>
                            <Form.Control
                                placeholder={'Enter your phone number'}
                            />
                        </Form.Group>

                        <Form.Group className={'mb-3'} controlId={'riderTurnaround'}>
                            <Form.Label> Turnaround * </Form.Label>
                            {
                                Turnarounds.map((turnaroundName: string) => {
                                    return (
                                        <Form.Check
                                            name={'rider-turnaround'}
                                            type={'radio'}
                                            id={`${turnaroundName}-turnaround-radio`}
                                            label={`${turnaroundName}`}
                                        />
                                    );
                                })
                            }
                        </Form.Group>

                        <Form.Group className={'mb-3'} controlId={'riderTime'}>
                            <Form.Label> Time * </Form.Label>
                            <Form.Check
                                name={'rider-time'}
                                type={'radio'}
                                id={'morning-time-radio'}
                                label={'Morning (9AM-12:30PM)'}
                            />

                            <Form.Check
                                name={'rider-time'}
                                type={'radio'}
                                id={'evening-time-radio'}
                                label={'Evening (6PM-7:30PM)'}
                            />

                            <Form.Check
                                name={'rider-time'}
                                type={'radio'}
                                id={'staying-time-radio'}
                                label={'Staying (9AM-7:30PM)'}
                            />

                            <Form.Check
                                name={'rider-time'}
                                type={'radio'}
                                id={'morning-evening-time-radio'}
                                label={'Morning/Evening (9AM-12:30PM & 6-7:30PM)'}
                            />
                        </Form.Group>

                        <Form.Group className={'mb-3'} controlId={'riderComments'}>
                            <Form.Label> Comments </Form.Label>
                            <Form.Control
                                as={'textarea'}
                            />
                        </Form.Group>
                    </div>

                    <Button variant={'primary'} type={'submit'}>
                        Sign Up
                    </Button>
                </Form>
            </div>
        </div>
    );
};