export function convertDate(isoDate:any) {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0 for January, so we add 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
