/**
 * Driver email form.
 */

 import React, { useEffect, useState } from 'react';
 import { Button, Col, Container, Form, Row } from 'react-bootstrap';
 import Chip from '@mui/material/Chip';
 import Autocomplete from '@mui/material/Autocomplete';
 import TextField from '@mui/material/TextField';

 import 'css/common/forms.scss';

 export const DriverEmailForm = () => {
   const [recipientOptions, setRecipientOptions] = useState<string[]>([]);
   const [recipientList, setRecipientList] = useState<string[]>([]);
   const [message, setMessage] = useState<string>('');
   const [btnClicked, setBtnClicked] = useState<string>('');

   const list = [ 
     { email: 'jpan287@ucla.edu', name: 'Johnny Pan' },
     { email: 'issac@ucla.edu', name: 'Issac Li' },
     { email: 'james@ucla.edu', name: 'James Wang' },
     { email: 'ricky@ucla.edu', name: 'Ricky Guo' },
     { email: 'tim@ucla.edu', name: 'Tim Tai' }
   ]

   useEffect(() => {
    setRecipientOptions([]);
   }, []);

   const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    switch (btnClicked) {
      case 'send':
        console.log("Send");
        break;
      case 'save':
        console.log("Save");
        break;
      case 'discard':
        console.log("Discard");
        break;
      default:
        console.log("Error");
        break;
    }
   }

   return (
     <Container>
       <Col className={'mx-auto text-left'} lg={'8'}>
         <Form className={'text-left'} onSubmit={handleFormSubmit}>
           <span className={'signup-form-title'}>Driver Email</span>
           <Form.Group className={'mb-3'}>
             <Form.Label className={'signup-form-radio-text'}>Recipients:</Form.Label>
             <Autocomplete
               multiple
               id="emailAutocomplete"
               options={list.map((option) => option.email)}
               freeSolo
               onChange={(event, newValue) => {
                setRecipientList(newValue);
               }}
               renderTags={(value: readonly string[], getTagProps) =>
                 value.map((option: string, index: number) => (
                   <Chip variant="filled" label={option} {...getTagProps({ index })} />
                 ))
               }
               renderInput={(params) => (
                 <TextField
                   {...params}
                   hiddenLabel
                   label="Enter emails..."
                 />
               )}
             />
           </Form.Group>

           <Form.Group className={'mb-3'}>
             <Form.Label className={'signup-form-radio-text'}>Message:</Form.Label>
             <Form.Control as='textarea'
                           rows={7}
                           placeholder={'Default text here...'}
                           onChange={({target: {value}}) => setMessage(value)}
                           required/>
           </Form.Group>

          <Button className={'ms-3 float-end'} onClick={() => setBtnClicked('send')} type='submit' name='sendBtn'>Send Email</Button>
          <Button className={'ms-3 float-end'} onClick={() => setBtnClicked('save')} type='submit' name='saveBtn'>Save Draft</Button>
          <Button className={'ms-3 float-end'} onClick={() => setBtnClicked('discard')} type='submit' name='discardBtn'>Discard</Button>
         </Form>
       </Col>
     </Container>
   )
 }