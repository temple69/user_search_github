// Function to convert UTC timestamp to local time
export  function convertUtcToLocal(utcTimestamp: string): string {
  const utcDate = new Date(utcTimestamp);
  const localDate = new Date(
    utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
  );
  return localDate.toLocaleDateString();
}
//Function to format date
export function formatDate(inputDate: string): string {
    // Split the input date into day, month, and year parts
    const [day, month, year] = inputDate.split('/').map(Number);

    // Create a Date object with the given parts (months are 0-indexed in JavaScript)
    const date = new Date(year, month - 1, day);

    // Format the date as "day Month Year" without the suffix for the day
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);

    return formattedDate;
}




