import { isValid, parse } from 'date-fns';

export const validateDate = (dateStr: string): boolean => {
  const parseDate = parse(dateStr, 'yyyy-MM-dd', new Date());
  return isValid(parseDate);
};

export const formatDate = (dateTime: Date): string => {
  const date = new Date(dateTime);

  const year = date.getUTCFullYear();

  const month = String(date.getUTCMonth() + 1).padStart(2, '0');

  const day = String(date.getUTCDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
