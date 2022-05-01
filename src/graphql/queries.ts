/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const a = /* GraphQL */ `
  query A {
    a
  }
`;
export const getDriver = /* GraphQL */ `
  query GetDriver($id: ID!) {
    getDriver(id: $id) {
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
export const listDrivers = /* GraphQL */ `
  query ListDrivers(
    $filter: ModelDriverFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDrivers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRider = /* GraphQL */ `
  query GetRider($id: ID!) {
    getRider(id: $id) {
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
export const listRiders = /* GraphQL */ `
  query ListRiders(
    $filter: ModelRiderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRiders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getDriversByEventId = /* GraphQL */ `
  query GetDriversByEventId(
    $eventId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelDriverFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getDriversByEventId(
      eventId: $eventId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getDriversByEventIdAndSignupStatus = /* GraphQL */ `
  query GetDriversByEventIdAndSignupStatus(
    $eventId: ID
    $driverSignupStatus: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDriverFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getDriversByEventIdAndSignupStatus(
      eventId: $eventId
      driverSignupStatus: $driverSignupStatus
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getDriversByEventIdAndEmail = /* GraphQL */ `
  query GetDriversByEventIdAndEmail(
    $eventId: ID
    $driverEmail: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDriverFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getDriversByEventIdAndEmail(
      eventId: $eventId
      driverEmail: $driverEmail
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getRidersByEventId = /* GraphQL */ `
  query GetRidersByEventId(
    $eventId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelRiderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getRidersByEventId(
      eventId: $eventId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getRidersByEventIdAndSignupStatus = /* GraphQL */ `
  query GetRidersByEventIdAndSignupStatus(
    $eventId: ID
    $riderSignupStatus: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRiderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getRidersByEventIdAndSignupStatus(
      eventId: $eventId
      riderSignupStatus: $riderSignupStatus
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getRidersByEventIdAndEmail = /* GraphQL */ `
  query GetRidersByEventIdAndEmail(
    $eventId: ID
    $riderEmail: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRiderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getRidersByEventIdAndEmail(
      eventId: $eventId
      riderEmail: $riderEmail
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getEventsByEventId = /* GraphQL */ `
  query GetEventsByEventId(
    $eventId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getEventsByEventId(
      eventId: $eventId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
