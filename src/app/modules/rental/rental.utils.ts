import { isValid, parse } from 'date-fns';
import { TSchedule } from './rental.interface';

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

// ===============================================================
//'HH:mm'
export const TimeFormattingHHmm = (date: Date): string => {
  // Get hours and minutes
  const hours = String(date.getHours()).padStart(2, '0'); // Ensure 2 digits for hours
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2 digits for minutes

  // Format as "HH:mm"
  const timeString = `${hours}:${minutes}`;
  return timeString;
};
// ===============================================================

export const TimeConflict = (
  assignedSchedule: TSchedule[],
  newSchedule: TSchedule,
): boolean => {
  for (const schedule of assignedSchedule) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};
