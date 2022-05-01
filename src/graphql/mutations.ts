/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const b = /* GraphQL */ `
  mutation B {
    b
  }
`;
export const createDriver = /* GraphQL */ `
  mutation CreateDriver(
    $input: CreateDriverInput!
    $condition: ModelDriverConditionInput
  ) {
    createDriver(input: $input, condition: $condition) {
      id
      eventId
      driverName
      driverEmail
      driverPhoneNumber
      driverEventTime
      driverAddress
      driverNumRiderSeats
      driverComments
      driverSignupStatus
      createdAt
      updatedAt
    }
  }
`;
export const updateDriver = /* GraphQL */ `
  mutation UpdateDriver(
    $input: UpdateDriverInput!
    $condition: ModelDriverConditionInput
  ) {
    updateDriver(input: $input, condition: $condition) {
      id
      eventId
      driverName
      driverEmail
      driverPhoneNumber
      driverEventTime
      driverAddress
      driverNumRiderSeats
      driverComments
      driverSignupStatus
      createdAt
      updatedAt
    }
  }
`;
export const deleteDriver = /* GraphQL */ `
  mutation DeleteDriver(
    $input: DeleteDriverInput!
    $condition: ModelDriverConditionInput
  ) {
    deleteDriver(input: $input, condition: $condition) {
      id
      eventId
      driverName
      driverEmail
      driverPhoneNumber
      driverEventTime
      driverAddress
      driverNumRiderSeats
      driverComments
      driverSignupStatus
      createdAt
      updatedAt
    }
  }
`;
export const createRider = /* GraphQL */ `
  mutation CreateRider(
    $input: CreateRiderInput!
    $condition: ModelRiderConditionInput
  ) {
    createRider(input: $input, condition: $condition) {
      id
      eventId
      riderName
      riderEmail
      riderPhoneNumber
      riderEventPickupLocation
      riderEventTime
      riderComments
      riderSignupStatus
      createdAt
      updatedAt
    }
  }
`;
export const updateRider = /* GraphQL */ `
  mutation UpdateRider(
    $input: UpdateRiderInput!
    $condition: ModelRiderConditionInput
  ) {
    updateRider(input: $input, condition: $condition) {
      id
      eventId
      riderName
      riderEmail
      riderPhoneNumber
      riderEventPickupLocation
      riderEventTime
      riderComments
      riderSignupStatus
      createdAt
      updatedAt
    }
  }
`;
export const deleteRider = /* GraphQL */ `
  mutation DeleteRider(
    $input: DeleteRiderInput!
    $condition: ModelRiderConditionInput
  ) {
    deleteRider(input: $input, condition: $condition) {
      id
      eventId
      riderName
      riderEmail
      riderPhoneNumber
      riderEventPickupLocation
      riderEventTime
      riderComments
      riderSignupStatus
      createdAt
      updatedAt
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      eventId
      eventName
      eventPickupLocations
      eventTimes {
        timeHeading
        timeSubtext
      }
      eventStatus
      createdAt
      updatedAt
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      eventId
      eventName
      eventPickupLocations
      eventTimes {
        timeHeading
        timeSubtext
      }
      eventStatus
      createdAt
      updatedAt
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      eventId
      eventName
      eventPickupLocations
      eventTimes {
        timeHeading
        timeSubtext
      }
      eventStatus
      createdAt
      updatedAt
    }
  }
`;
