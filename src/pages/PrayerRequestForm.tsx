/**
 * Prayer request form.
 */

import { Box, Button, Center, Fieldset, Heading, Input, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "components/ui/native-select";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
//  import { CreatePrayerInput } from 'Api';

//import { getEventsByEventId } from 'graphql/queries';
//import { createDriver } from 'graphql/mutations';
/*

 */

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

  const [prayerName, setPrayerName] = useState<string>("");
  const [prayerEmail, setPrayerEmail] = useState<string>("");
  const [prayerComments, setPrayerComments] = useState<string>("");

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    const prayerSignup = {
      prayerName,
      prayerEmail,
      prayerComments,
    };
    console.log(prayerSignup);

    // const prayerSingupData: CreatePrayerInput = {
    //   prayerName: prayerName,
    //   prayerEmail: prayerEmail,
    //   prayerComments: prayerComments,

    // };
  };

  prayerRequestFormProps.setPrayerRequestCompleted(true);
  return (
    <Center width={"100%"} margin={"20px"}>
      <Fieldset.Root maxWidth={"500px"}>
        <Heading>How can we be praying for you?</Heading>
        <form className="text-center" onSubmit={handleFormSubmit}>
          <Stack textAlign="start">
            <Field label="Name">
              <Input
                id="prayerName"
                placeholder="Enter your name"
                onChange={({ target: { value } }) => setPrayerName(value)}
                required
              />
            </Field>
            <Field label="Email">
              <Input
                id="prayerEmail"
                type="email"
                placeholder="Enter your email"
                onChange={({ target: { value } }) => setPrayerEmail(value)}
                required
              />
            </Field>
            <Field label="Prayer Request *">
              <Textarea
                id="prayerComments"
                placeholder="Philippians 4:6-7"
                as="textarea"
                onChange={({ target: { value } }) => setPrayerComments(value)}
              />
            </Field>
          </Stack>

          <Button backgroundColor={"goc.blue"} marginTop={"20px"} variant="solid" type="submit" colorScheme="teal">
            <strong>SUBMIT</strong>
          </Button>
        </form>
      </Fieldset.Root>
    </Center>
  );
};
