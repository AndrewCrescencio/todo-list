export function useDateFormatter() {
  /**
   * Converts an ISO 8601 timestamp to a human-readable date format.
   * 
   * @param {string} isoString - The ISO 8601 timestamp.
   * @returns {string} - Formatted date string (e.g., "October 8, 2024, 5:52 AM").
   */
  function formatTimestamp(isoString: string): string {
    try {
      const date = new Date(isoString);

      // Formatting options
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        // second: "numeric",
        // timeZoneName: "short",
      };

      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "Invalid date";
    }
  }

  return { formatTimestamp };
}
