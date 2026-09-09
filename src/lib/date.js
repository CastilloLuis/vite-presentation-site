/**
 * Dates are stored as an ISO day. Parsed at UTC and formatted in UTC so the
 * day never shifts under a reader west of the meridian — and so a prerendered
 * page and its hydration agree on what day it is.
 */
export function formatDay(iso) {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    })
}
