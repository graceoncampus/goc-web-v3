/**
 * Timezone utility functions for handling PST/PDT (America/Los_Angeles) timezone
 */

const PST_TIMEZONE = 'America/Los_Angeles';

/**
 * Convert UTC ISO string to PST datetime-local format for display in forms
 * @param utcIsoString - UTC ISO string from the database (e.g., "2024-01-15T22:30:00.000Z")
 * @returns datetime-local format string (YYYY-MM-DDTHH:mm) in PST (e.g., "2024-01-15T14:30")
 * 
 * Example: "2024-01-15T22:30:00.000Z" (10:30 PM UTC) -> "2024-01-15T14:30" (2:30 PM PST)
 */
export function utcToPST(utcIsoString: string): string {
  if (!utcIsoString) return '';
  
  const date = new Date(utcIsoString);
  
  // Get the date/time components in PST timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: PST_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  const parts = formatter.formatToParts(date);
  const year = parts.find(p => p.type === 'year')?.value;
  const month = parts.find(p => p.type === 'month')?.value;
  const day = parts.find(p => p.type === 'day')?.value;
  const hour = parts.find(p => p.type === 'hour')?.value;
  const minute = parts.find(p => p.type === 'minute')?.value;
  
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

/**
 * Convert PST datetime-local format to UTC ISO string for database storage
 * @param pstDatetimeLocal - datetime-local input value in PST (e.g., "2024-01-15T14:30")
 * @returns UTC ISO string (e.g., "2024-01-15T22:30:00.000Z")
 * 
 * Example: "2024-01-15T14:30" (2:30 PM PST) -> "2024-01-15T22:30:00.000Z" (10:30 PM UTC)
 */
export function pstToUTC(pstDatetimeLocal: string): string {
  if (!pstDatetimeLocal) return '';
  
  // Parse the datetime-local value
  const [datePart, timePart] = pstDatetimeLocal.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute] = timePart.split(':').map(Number);
  
  // Create a date string that represents this time in PST
  // We'll use the Intl API to properly handle the conversion
  
  // Create a date object with these values (will be in local timezone initially)
  const localDate = new Date(year, month - 1, day, hour, minute, 0);
  
  // Get what this date/time would be in PST
  const pstFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: PST_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  const pstParts = pstFormatter.formatToParts(localDate);
  const pstYear = parseInt(pstParts.find(p => p.type === 'year')?.value || '0');
  const pstMonth = parseInt(pstParts.find(p => p.type === 'month')?.value || '0');
  const pstDay = parseInt(pstParts.find(p => p.type === 'day')?.value || '0');
  const pstHour = parseInt(pstParts.find(p => p.type === 'hour')?.value || '0');
  const pstMinute = parseInt(pstParts.find(p => p.type === 'minute')?.value || '0');
  
  // Calculate the difference between what we want and what we got
  const wantedMinutes = year * 525600 + month * 43800 + day * 1440 + hour * 60 + minute;
  const gotMinutes = pstYear * 525600 + pstMonth * 43800 + pstDay * 1440 + pstHour * 60 + pstMinute;
  const diffMinutes = wantedMinutes - gotMinutes;
  
  // Adjust the local date by the difference to get the correct UTC time
  const correctedDate = new Date(localDate.getTime() + diffMinutes * 60000);
  
  return correctedDate.toISOString();
}

/**
 * Legacy alias for backward compatibility
 * @deprecated Use utcToPST instead
 */
export function isoToPSTDatetimeLocal(isoString: string): string {
  return utcToPST(isoString);
}

/**
 * Legacy alias for backward compatibility
 * @deprecated Use pstToUTC instead
 */
export function datetimeLocalToPSTISO(datetimeLocal: string): string {
  return pstToUTC(datetimeLocal);
}

/**
 * Format a date string for display in PST timezone
 * @param dateString - ISO string or date string
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string in PST
 */
export function formatDateInPST(
  dateString: string,
  options: Intl.DateTimeFormatOptions
): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  return date.toLocaleDateString('en-US', {
    ...options,
    timeZone: PST_TIMEZONE,
  });
}

/**
 * Format a time string for display in PST timezone
 * @param dateString - ISO string or date string
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted time string in PST
 */
export function formatTimeInPST(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }
): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  return date.toLocaleTimeString('en-US', {
    ...options,
    timeZone: PST_TIMEZONE,
  });
}

/**
 * Format a date and time string for display in PST timezone
 * @param dateString - ISO string or date string
 * @returns Formatted date and time string in PST
 */
export function formatDateTimeInPST(dateString: string): string {
  if (!dateString) return '';
  
  const dateStr = formatDateInPST(dateString, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  const timeStr = formatTimeInPST(dateString);
  
  return `${dateStr} at ${timeStr}`;
}

/**
 * Check if two dates are on the same day in PST timezone
 * @param date1 - First date string
 * @param date2 - Second date string
 * @returns true if dates are on the same day in PST
 */
export function isSameDayInPST(date1: string, date2: string): boolean {
  if (!date1 || !date2) return false;
  
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  const d1PST = new Date(d1.toLocaleString('en-US', { timeZone: PST_TIMEZONE }));
  const d2PST = new Date(d2.toLocaleString('en-US', { timeZone: PST_TIMEZONE }));
  
  return (
    d1PST.getFullYear() === d2PST.getFullYear() &&
    d1PST.getMonth() === d2PST.getMonth() &&
    d1PST.getDate() === d2PST.getDate()
  );
}
