/**
 * Prayer request form.
 */

 import React, { useEffect, useState } from 'react';
 import { Button, Col, Container, Form, Row } from 'react-bootstrap';
 import { useSearchParams } from 'react-router-dom';
//  import { CreatePrayerInput } from 'Api';

 //import { getEventsByEventId } from 'graphql/queries';
 //import { createDriver } from 'graphql/mutations';
 /*

 */
 
 //import { API, graphqlOperation } from 'aws-amplify';
 
 import 'css/common/forms.scss';
 
 
 interface PrayerRequestFormProps {
   setPrayerRequestCompleted: (prayerRequestValue: boolean) => void;
 }

   /**
    * Get search params from url (fires on render).
    */
   /**
    * Pull event data from GraphQL backend (fires only when eventId changes).
    */
   /*
   const handleFormSubmit = async (event: any) => {
     event.preventDefault();
 
     const prayerRequestData: CreatePrayerInput = {
       prayerName: prayerName,
       prayerEmail: prayerEmail,
       prayerComments: prayerComments
       //prayerRequestStatus: prayerRequestStatus.IN_PROGRESS
     };
 
   };
 */
export const PrayerRequestForm = (prayerRequestFormProps: PrayerRequestFormProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
  
    const [prayerName, setPrayerName] = useState<string>('');
    const [prayerEmail, setPrayerEmail] = useState<string>('');
    const [prayerComments, setPrayerComments] = useState<string>('');
    
    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        const prayerSignup = {
          prayerName,
          prayerEmail,
          prayerComments
        }
        console.log(prayerSignup)
    
        // const prayerSingupData: CreatePrayerInput = {
        //   prayerName: prayerName,
        //   prayerEmail: prayerEmail,       
        //   prayerComments: prayerComments,

        // };
    };
    prayerRequestFormProps.setPrayerRequestCompleted(true);
   return (
     <Container>
       <Col className={'mx-auto text-center'} lg={'8'}>
         <span className={'signup-form-title'}>How can we be praying for you?</span>
 
         <Form className={'text-center'} onSubmit={handleFormSubmit}>
           <Row className={'text-start gx-5'}>
             <Col className={'mx-auto text-center'} lg={'6'}>
               <Form.Group className={'mb-3'} controlId={'prayerName'}>
                 <Form.Label as={Row} className={'signup-form-label position-relative m-0'}> 
                   {' '}
                    Name{' '}
                 </Form.Label>
                    
                        <Form.Control placeholder={'Enter your name'}
                               onChange={({target: {value}}) => setPrayerName(value)}
                               required />
               </Form.Group>
               <Form.Group className={'mb-3'} controlId={'prayerEmail'}>
                 <Form.Label as={Row} className={'signup-form-label position-relative m-0'}>
                   {' '}
                   Email{' '}
                 </Form.Label>
                 <Form.Control type={'email'} placeholder={'Enter your email'}
                               onChange={({target: {value}}) => setPrayerEmail(value)}
                               required />
               </Form.Group>
               <Form.Group className={'mb-3'} controlId={'prayerComments'}>
                <Form.Label as={Row} className={'signup-form-label position-relative m-0'}>
                  {' '}
                  Prayer Request *{' '}
                </Form.Label>
                <Form.Control placeholder={'Philippians 4:6-7'}
                    as={'textarea'}
                    rows={4}
                    onChange={({target: {value}}) => setPrayerComments(value)} />
              </Form.Group>
             </Col>
           </Row>
 
           <Button variant={'submit'} type={'submit'}>
             <strong>SUBMIT</strong>
           </Button>
         </Form>
       </Col>
     </Container>
   );
 };