import { Event } from "@/pages/Events";

// Google Calendar API configuration
const GOOGLE_CALENDAR_API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
const GOOGLE_CALENDAR_ID =
  import.meta.env.VITE_GOOGLE_CALENDAR_ID || "gocateam@gmail.com";

export interface GoogleCalendarEvent {
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  visibility?: "default" | "public" | "private";
}

/**
 * Creates a Google Calendar event using the Google Calendar API
 * @param event - The event data to create in Google Calendar
 * @param accessToken - Google OAuth access token
 * @returns Promise<string> - The created event ID
 */
export const createGoogleCalendarEvent = async (
  event: Event,
  accessToken: string,
): Promise<string> => {
  const calendarEvent: GoogleCalendarEvent = {
    summary: event.title,
    description: event.description,
    location: event.location,
    start: {
      dateTime: event.startDate,
      timeZone: "America/Los_Angeles", // PST/PDT timezone
    },
    end: {
      dateTime: event.endDate || event.startDate,
      timeZone: "America/Los_Angeles",
    },
    visibility: "public",
  };

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calendarEvent),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to create Google Calendar event: ${errorData.error?.message || response.statusText}`,
    );
  }

  const createdEvent = await response.json();
  return createdEvent.id;
};

/**
 * Generates a Google Calendar URL for adding an event
 * This is a fallback method that doesn't require API authentication
 * @param event - The event data
 * @returns string - Google Calendar URL
 */
export const generateGoogleCalendarUrl = (event: Event): string => {
  const baseUrl = "https://calendar.google.com/calendar/render";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatDateForUrl(event.startDate)}/${formatDateForUrl(event.endDate || event.startDate)}`,
    details: event.description,
    location: event.location,
    ctz: "America/Los_Angeles",
  });

  return `${baseUrl}?${params.toString()}`;
};

/**
 * Formats a date string for Google Calendar URL
 * @param dateString - ISO date string
 * @returns string - Formatted date for Google Calendar URL (YYYYMMDDTHHMMSSZ)
 */
const formatDateForUrl = (dateString: string): string => {
  const date = new Date(dateString);
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
};

/**
 * Initiates Google OAuth flow for Calendar access
 * @returns Promise<string> - Access token
 */
export const getGoogleCalendarAccessToken = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Check if Google API is loaded
    if (typeof window.gapi === "undefined") {
      reject(new Error("Google API not loaded"));
      return;
    }

    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();

          authInstance
            .signIn({
              scope: "https://www.googleapis.com/auth/calendar",
            })
            .then((googleUser: any) => {
              const accessToken = googleUser.getAuthResponse().access_token;
              resolve(accessToken);
            })
            .catch((error: any) => {
              reject(new Error(`Google OAuth failed: ${error.error || error}`));
            });
        })
        .catch((error: any) => {
          reject(new Error(`Failed to initialize Google Auth: ${error}`));
        });
    });
  });
};

/**
 * Loads the Google API script dynamically
 * @returns Promise<void>
 */
export const loadGoogleAPI = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window.gapi !== "undefined") {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google API"));
    document.head.appendChild(script);
  });
};

// Type declarations for Google API
declare global {
  interface Window {
    gapi: any;
  }
}
