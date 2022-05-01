/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePrayerInput = {
  prayerName: string,
  prayerEmail: string,
  prayerComments: string,
};


export type CreateDriverInput = {
  id?: string | null,
  eventId: string,
  driverName: string,
  driverEmail: string,
  driverPhoneNumber: string,
  driverEventTime: string,
  driverAddress: string,
  driverNumRiderSeats: number,
  driverComments: string,
  driverSignupStatus: RideSignupStatus,
};

export enum RideSignupStatus {
  IN_PROGRESS = "IN_PROGRESS",
  MATCHED = "MATCHED",
}


export type ModelDriverConditionInput = {
  eventId?: ModelIDInput | null,
  driverName?: ModelStringInput | null,
  driverEmail?: ModelStringInput | null,
  driverPhoneNumber?: ModelStringInput | null,
  driverEventTime?: ModelStringInput | null,
  driverAddress?: ModelStringInput | null,
  driverNumRiderSeats?: ModelIntInput | null,
  driverComments?: ModelStringInput | null,
  driverSignupStatus?: ModelRideSignupStatusInput | null,
  and?: Array< ModelDriverConditionInput | null > | null,
  or?: Array< ModelDriverConditionInput | null > | null,
  not?: ModelDriverConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelRideSignupStatusInput = {
  eq?: RideSignupStatus | null,
  ne?: RideSignupStatus | null,
};

export type Driver = {
  __typename: "Driver",
  id: string,
  eventId: string,
  driverName: string,
  driverEmail: string,
  driverPhoneNumber: string,
  driverEventTime: string,
  driverAddress: string,
  driverNumRiderSeats: number,
  driverComments: string,
  driverSignupStatus: RideSignupStatus,
  createdAt: string,
  updatedAt: string,
};

export type UpdateDriverInput = {
  id: string,
  eventId?: string | null,
  driverName?: string | null,
  driverEmail?: string | null,
  driverPhoneNumber?: string | null,
  driverEventTime?: string | null,
  driverAddress?: string | null,
  driverNumRiderSeats?: number | null,
  driverComments?: string | null,
  driverSignupStatus?: RideSignupStatus | null,
};

export type DeleteDriverInput = {
  id: string,
};

export type CreateRiderInput = {
  id?: string | null,
  eventId: string,
  riderName: string,
  riderEmail: string,
  riderPhoneNumber: string,
  riderEventPickupLocation: string,
  riderEventTime: string,
  riderComments?: string | null,
  riderSignupStatus: RideSignupStatus,
};

export type ModelRiderConditionInput = {
  eventId?: ModelIDInput | null,
  riderName?: ModelStringInput | null,
  riderEmail?: ModelStringInput | null,
  riderPhoneNumber?: ModelStringInput | null,
  riderEventPickupLocation?: ModelStringInput | null,
  riderEventTime?: ModelStringInput | null,
  riderComments?: ModelStringInput | null,
  riderSignupStatus?: ModelRideSignupStatusInput | null,
  and?: Array< ModelRiderConditionInput | null > | null,
  or?: Array< ModelRiderConditionInput | null > | null,
  not?: ModelRiderConditionInput | null,
};

export type Rider = {
  __typename: "Rider",
  id: string,
  eventId: string,
  riderName: string,
  riderEmail: string,
  riderPhoneNumber: string,
  riderEventPickupLocation: string,
  riderEventTime: string,
  riderComments?: string | null,
  riderSignupStatus: RideSignupStatus,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRiderInput = {
  id: string,
  eventId?: string | null,
  riderName?: string | null,
  riderEmail?: string | null,
  riderPhoneNumber?: string | null,
  riderEventPickupLocation?: string | null,
  riderEventTime?: string | null,
  riderComments?: string | null,
  riderSignupStatus?: RideSignupStatus | null,
};

export type DeleteRiderInput = {
  id: string,
};

export type CreateEventInput = {
  id?: string | null,
  eventId: string,
  eventName: string,
  eventPickupLocations: Array< string | null >,
  eventTimes: Array< EventTimeOptionInput | null >,
  eventStatus: EventStatus,
};

export type EventTimeOptionInput = {
  timeHeading: string,
  timeSubtext: string,
};

export enum EventStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
}


export type ModelEventConditionInput = {
  eventId?: ModelIDInput | null,
  eventName?: ModelStringInput | null,
  eventPickupLocations?: ModelStringInput | null,
  eventStatus?: ModelEventStatusInput | null,
  and?: Array< ModelEventConditionInput | null > | null,
  or?: Array< ModelEventConditionInput | null > | null,
  not?: ModelEventConditionInput | null,
};

export type ModelEventStatusInput = {
  eq?: EventStatus | null,
  ne?: EventStatus | null,
};

export type Event = {
  __typename: "Event",
  id: string,
  eventId: string,
  eventName: string,
  eventPickupLocations: Array< string | null >,
  eventTimes:  Array<EventTimeOption | null >,
  eventStatus: EventStatus,
  createdAt: string,
  updatedAt: string,
};

export type EventTimeOption = {
  __typename: "EventTimeOption",
  timeHeading: string,
  timeSubtext: string,
};

export type UpdateEventInput = {
  id: string,
  eventId?: string | null,
  eventName?: string | null,
  eventPickupLocations?: Array< string | null > | null,
  eventTimes?: Array< EventTimeOptionInput | null > | null,
  eventStatus?: EventStatus | null,
};

export type DeleteEventInput = {
  id: string,
};

export type ModelDriverFilterInput = {
  eventId?: ModelIDInput | null,
  driverName?: ModelStringInput | null,
  driverEmail?: ModelStringInput | null,
  driverPhoneNumber?: ModelStringInput | null,
  driverEventTime?: ModelStringInput | null,
  driverAddress?: ModelStringInput | null,
  driverNumRiderSeats?: ModelIntInput | null,
  driverComments?: ModelStringInput | null,
  driverSignupStatus?: ModelRideSignupStatusInput | null,
  and?: Array< ModelDriverFilterInput | null > | null,
  or?: Array< ModelDriverFilterInput | null > | null,
  not?: ModelDriverFilterInput | null,
};

export type ModelDriverConnection = {
  __typename: "ModelDriverConnection",
  items:  Array<Driver | null >,
  nextToken?: string | null,
};

export type ModelRiderFilterInput = {
  eventId?: ModelIDInput | null,
  riderName?: ModelStringInput | null,
  riderEmail?: ModelStringInput | null,
  riderPhoneNumber?: ModelStringInput | null,
  riderEventPickupLocation?: ModelStringInput | null,
  riderEventTime?: ModelStringInput | null,
  riderComments?: ModelStringInput | null,
  riderSignupStatus?: ModelRideSignupStatusInput | null,
  and?: Array< ModelRiderFilterInput | null > | null,
  or?: Array< ModelRiderFilterInput | null > | null,
  not?: ModelRiderFilterInput | null,
};

export type ModelRiderConnection = {
  __typename: "ModelRiderConnection",
  items:  Array<Rider | null >,
  nextToken?: string | null,
};

export type ModelEventFilterInput = {
  eventId?: ModelIDInput | null,
  eventName?: ModelStringInput | null,
  eventPickupLocations?: ModelStringInput | null,
  eventStatus?: ModelEventStatusInput | null,
  and?: Array< ModelEventFilterInput | null > | null,
  or?: Array< ModelEventFilterInput | null > | null,
  not?: ModelEventFilterInput | null,
};

export type ModelEventConnection = {
  __typename: "ModelEventConnection",
  items:  Array<Event | null >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type BMutation = {
  b?: boolean | null,
};

export type CreateDriverMutationVariables = {
  input: CreateDriverInput,
  condition?: ModelDriverConditionInput | null,
};

export type CreateDriverMutation = {
  createDriver?:  {
    __typename: "Driver",
    id: string,
    eventId: string,
    driverName: string,
    driverEmail: string,
    driverPhoneNumber: string,
    driverEventTime: string,
    driverAddress: string,
    driverNumRiderSeats: number,
    driverComments: string,
    driverSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDriverMutationVariables = {
  input: UpdateDriverInput,
  condition?: ModelDriverConditionInput | null,
};

export type UpdateDriverMutation = {
  updateDriver?:  {
    __typename: "Driver",
    id: string,
    eventId: string,
    driverName: string,
    driverEmail: string,
    driverPhoneNumber: string,
    driverEventTime: string,
    driverAddress: string,
    driverNumRiderSeats: number,
    driverComments: string,
    driverSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDriverMutationVariables = {
  input: DeleteDriverInput,
  condition?: ModelDriverConditionInput | null,
};

export type DeleteDriverMutation = {
  deleteDriver?:  {
    __typename: "Driver",
    id: string,
    eventId: string,
    driverName: string,
    driverEmail: string,
    driverPhoneNumber: string,
    driverEventTime: string,
    driverAddress: string,
    driverNumRiderSeats: number,
    driverComments: string,
    driverSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRiderMutationVariables = {
  input: CreateRiderInput,
  condition?: ModelRiderConditionInput | null,
};

export type CreateRiderMutation = {
  createRider?:  {
    __typename: "Rider",
    id: string,
    eventId: string,
    riderName: string,
    riderEmail: string,
    riderPhoneNumber: string,
    riderEventPickupLocation: string,
    riderEventTime: string,
    riderComments?: string | null,
    riderSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRiderMutationVariables = {
  input: UpdateRiderInput,
  condition?: ModelRiderConditionInput | null,
};

export type UpdateRiderMutation = {
  updateRider?:  {
    __typename: "Rider",
    id: string,
    eventId: string,
    riderName: string,
    riderEmail: string,
    riderPhoneNumber: string,
    riderEventPickupLocation: string,
    riderEventTime: string,
    riderComments?: string | null,
    riderSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRiderMutationVariables = {
  input: DeleteRiderInput,
  condition?: ModelRiderConditionInput | null,
};

export type DeleteRiderMutation = {
  deleteRider?:  {
    __typename: "Rider",
    id: string,
    eventId: string,
    riderName: string,
    riderEmail: string,
    riderPhoneNumber: string,
    riderEventPickupLocation: string,
    riderEventTime: string,
    riderComments?: string | null,
    riderSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateEventMutationVariables = {
  input: CreateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type CreateEventMutation = {
  createEvent?:  {
    __typename: "Event",
    id: string,
    eventId: string,
    eventName: string,
    eventPickupLocations: Array< string | null >,
    eventTimes:  Array< {
      __typename: "EventTimeOption",
      timeHeading: string,
      timeSubtext: string,
    } | null >,
    eventStatus: EventStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateEventMutationVariables = {
  input: UpdateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type UpdateEventMutation = {
  updateEvent?:  {
    __typename: "Event",
    id: string,
    eventId: string,
    eventName: string,
    eventPickupLocations: Array< string | null >,
    eventTimes:  Array< {
      __typename: "EventTimeOption",
      timeHeading: string,
      timeSubtext: string,
    } | null >,
    eventStatus: EventStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEventMutationVariables = {
  input: DeleteEventInput,
  condition?: ModelEventConditionInput | null,
};

export type DeleteEventMutation = {
  deleteEvent?:  {
    __typename: "Event",
    id: string,
    eventId: string,
    eventName: string,
    eventPickupLocations: Array< string | null >,
    eventTimes:  Array< {
      __typename: "EventTimeOption",
      timeHeading: string,
      timeSubtext: string,
    } | null >,
    eventStatus: EventStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type AQuery = {
  a?: boolean | null,
};

export type GetDriverQueryVariables = {
  id: string,
};

export type GetDriverQuery = {
  getDriver?:  {
    __typename: "Driver",
    id: string,
    eventId: string,
    driverName: string,
    driverEmail: string,
    driverPhoneNumber: string,
    driverEventTime: string,
    driverAddress: string,
    driverNumRiderSeats: number,
    driverComments: string,
    driverSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDriversQueryVariables = {
  filter?: ModelDriverFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDriversQuery = {
  listDrivers?:  {
    __typename: "ModelDriverConnection",
    items:  Array< {
      __typename: "Driver",
      id: string,
      eventId: string,
      driverName: string,
      driverEmail: string,
      driverPhoneNumber: string,
      driverEventTime: string,
      driverAddress: string,
      driverNumRiderSeats: number,
      driverComments: string,
      driverSignupStatus: RideSignupStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRiderQueryVariables = {
  id: string,
};

export type GetRiderQuery = {
  getRider?:  {
    __typename: "Rider",
    id: string,
    eventId: string,
    riderName: string,
    riderEmail: string,
    riderPhoneNumber: string,
    riderEventPickupLocation: string,
    riderEventTime: string,
    riderComments?: string | null,
    riderSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRidersQueryVariables = {
  filter?: ModelRiderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRidersQuery = {
  listRiders?:  {
    __typename: "ModelRiderConnection",
    items:  Array< {
      __typename: "Rider",
      id: string,
      eventId: string,
      riderName: string,
      riderEmail: string,
      riderPhoneNumber: string,
      riderEventPickupLocation: string,
      riderEventTime: string,
      riderComments?: string | null,
      riderSignupStatus: RideSignupStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEventQueryVariables = {
  id: string,
};

export type GetEventQuery = {
  getEvent?:  {
    __typename: "Event",
    id: string,
    eventId: string,
    eventName: string,
    eventPickupLocations: Array< string | null >,
    eventTimes:  Array< {
      __typename: "EventTimeOption",
      timeHeading: string,
      timeSubtext: string,
    } | null >,
    eventStatus: EventStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEventsQueryVariables = {
  filter?: ModelEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEventsQuery = {
  listEvents?:  {
    __typename: "ModelEventConnection",
    items:  Array< {
      __typename: "Event",
      id: string,
      eventId: string,
      eventName: string,
      eventPickupLocations: Array< string | null >,
      eventTimes:  Array< {
        __typename: "EventTimeOption",
        timeHeading: string,
        timeSubtext: string,
      } | null >,
      eventStatus: EventStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDriversByEventIdQueryVariables = {
  eventId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDriverFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetDriversByEventIdQuery = {
  getDriversByEventId?:  {
    __typename: "ModelDriverConnection",
    items:  Array< {
      __typename: "Driver",
      id: string,
      eventId: string,
      driverName: string,
      driverEmail: string,
      driverPhoneNumber: string,
      driverEventTime: string,
      driverAddress: string,
      driverNumRiderSeats: number,
      driverComments: string,
      driverSignupStatus: RideSignupStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDriversByEventIdAndSignupStatusQueryVariables = {
  eventId?: string | null,
  driverSignupStatus?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDriverFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetDriversByEventIdAndSignupStatusQuery = {
  getDriversByEventIdAndSignupStatus?:  {
    __typename: "ModelDriverConnection",
    items:  Array< {
      __typename: "Driver",
      id: string,
      eventId: string,
      driverName: string,
      driverEmail: string,
      driverPhoneNumber: string,
      driverEventTime: string,
      driverAddress: string,
      driverNumRiderSeats: number,
      driverComments: string,
      driverSignupStatus: RideSignupStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDriversByEventIdAndEmailQueryVariables = {
  eventId?: string | null,
  driverEmail?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDriverFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetDriversByEventIdAndEmailQuery = {
  getDriversByEventIdAndEmail?:  {
    __typename: "ModelDriverConnection",
    items:  Array< {
      __typename: "Driver",
      id: string,
      eventId: string,
      driverName: string,
      driverEmail: string,
      driverPhoneNumber: string,
      driverEventTime: string,
      driverAddress: string,
      driverNumRiderSeats: number,
      driverComments: string,
      driverSignupStatus: RideSignupStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRidersByEventIdQueryVariables = {
  eventId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRiderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetRidersByEventIdQuery = {
  getRidersByEventId?:  {
    __typename: "ModelRiderConnection",
    items:  Array< {
      __typename: "Rider",
      id: string,
      eventId: string,
      riderName: string,
      riderEmail: string,
      riderPhoneNumber: string,
      riderEventPickupLocation: string,
      riderEventTime: string,
      riderComments?: string | null,
      riderSignupStatus: RideSignupStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRidersByEventIdAndSignupStatusQueryVariables = {
  eventId?: string | null,
  riderSignupStatus?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRiderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetRidersByEventIdAndSignupStatusQuery = {
  getRidersByEventIdAndSignupStatus?:  {
    __typename: "ModelRiderConnection",
    items:  Array< {
      __typename: "Rider",
      id: string,
      eventId: string,
      riderName: string,
      riderEmail: string,
      riderPhoneNumber: string,
      riderEventPickupLocation: string,
      riderEventTime: string,
      riderComments?: string | null,
      riderSignupStatus: RideSignupStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRidersByEventIdAndEmailQueryVariables = {
  eventId?: string | null,
  riderEmail?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRiderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetRidersByEventIdAndEmailQuery = {
  getRidersByEventIdAndEmail?:  {
    __typename: "ModelRiderConnection",
    items:  Array< {
      __typename: "Rider",
      id: string,
      eventId: string,
      riderName: string,
      riderEmail: string,
      riderPhoneNumber: string,
      riderEventPickupLocation: string,
      riderEventTime: string,
      riderComments?: string | null,
      riderSignupStatus: RideSignupStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEventsByEventIdQueryVariables = {
  eventId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetEventsByEventIdQuery = {
  getEventsByEventId?:  {
    __typename: "ModelEventConnection",
    items:  Array< {
      __typename: "Event",
      id: string,
      eventId: string,
      eventName: string,
      eventPickupLocations: Array< string | null >,
      eventTimes:  Array< {
        __typename: "EventTimeOption",
        timeHeading: string,
        timeSubtext: string,
      } | null >,
      eventStatus: EventStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CSubscription = {
  c?: boolean | null,
};

export type OnCreateDriverSubscription = {
  onCreateDriver?:  {
    __typename: "Driver",
    id: string,
    eventId: string,
    driverName: string,
    driverEmail: string,
    driverPhoneNumber: string,
    driverEventTime: string,
    driverAddress: string,
    driverNumRiderSeats: number,
    driverComments: string,
    driverSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDriverSubscription = {
  onUpdateDriver?:  {
    __typename: "Driver",
    id: string,
    eventId: string,
    driverName: string,
    driverEmail: string,
    driverPhoneNumber: string,
    driverEventTime: string,
    driverAddress: string,
    driverNumRiderSeats: number,
    driverComments: string,
    driverSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDriverSubscription = {
  onDeleteDriver?:  {
    __typename: "Driver",
    id: string,
    eventId: string,
    driverName: string,
    driverEmail: string,
    driverPhoneNumber: string,
    driverEventTime: string,
    driverAddress: string,
    driverNumRiderSeats: number,
    driverComments: string,
    driverSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRiderSubscription = {
  onCreateRider?:  {
    __typename: "Rider",
    id: string,
    eventId: string,
    riderName: string,
    riderEmail: string,
    riderPhoneNumber: string,
    riderEventPickupLocation: string,
    riderEventTime: string,
    riderComments?: string | null,
    riderSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRiderSubscription = {
  onUpdateRider?:  {
    __typename: "Rider",
    id: string,
    eventId: string,
    riderName: string,
    riderEmail: string,
    riderPhoneNumber: string,
    riderEventPickupLocation: string,
    riderEventTime: string,
    riderComments?: string | null,
    riderSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRiderSubscription = {
  onDeleteRider?:  {
    __typename: "Rider",
    id: string,
    eventId: string,
    riderName: string,
    riderEmail: string,
    riderPhoneNumber: string,
    riderEventPickupLocation: string,
    riderEventTime: string,
    riderComments?: string | null,
    riderSignupStatus: RideSignupStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateEventSubscription = {
  onCreateEvent?:  {
    __typename: "Event",
    id: string,
    eventId: string,
    eventName: string,
    eventPickupLocations: Array< string | null >,
    eventTimes:  Array< {
      __typename: "EventTimeOption",
      timeHeading: string,
      timeSubtext: string,
    } | null >,
    eventStatus: EventStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEventSubscription = {
  onUpdateEvent?:  {
    __typename: "Event",
    id: string,
    eventId: string,
    eventName: string,
    eventPickupLocations: Array< string | null >,
    eventTimes:  Array< {
      __typename: "EventTimeOption",
      timeHeading: string,
      timeSubtext: string,
    } | null >,
    eventStatus: EventStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEventSubscription = {
  onDeleteEvent?:  {
    __typename: "Event",
    id: string,
    eventId: string,
    eventName: string,
    eventPickupLocations: Array< string | null >,
    eventTimes:  Array< {
      __typename: "EventTimeOption",
      timeHeading: string,
      timeSubtext: string,
    } | null >,
    eventStatus: EventStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};
