export const listPublicGOCEvents = /* GraphQL */ `
  query ListPublicGOCEvents(
    $filter: TableGOCEventsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGOCEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        description
        endDate
        id
        imageLink
        location
        price
        startDate
        title
        active
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const listPublicRecurringEvents = /* GraphQL */ `
  query ListPublicRecurringEvents(
    $filter: TableRecurringEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecurringEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        signupLink
        signupDeadline
        description
        time
        location
        imageLink
        addToGoogleCalendar
        __typename
      }
      nextToken
      __typename
    }
  }
`;
