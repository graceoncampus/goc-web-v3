/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const c = /* GraphQL */ `
  subscription C {
    c
  }
`;
export const onCreateDriver = /* GraphQL */ `
  subscription OnCreateDriver {
    onCreateDriver {
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
export const onUpdateDriver = /* GraphQL */ `
  subscription OnUpdateDriver {
    onUpdateDriver {
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
export const onDeleteDriver = /* GraphQL */ `
  subscription OnDeleteDriver {
    onDeleteDriver {
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
export const onCreateRider = /* GraphQL */ `
  subscription OnCreateRider {
    onCreateRider {
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
export const onUpdateRider = /* GraphQL */ `
  subscription OnUpdateRider {
    onUpdateRider {
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
export const onDeleteRider = /* GraphQL */ `
  subscription OnDeleteRider {
    onDeleteRider {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
