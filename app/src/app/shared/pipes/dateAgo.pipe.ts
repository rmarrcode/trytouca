// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

import { Pipe, PipeTransform } from '@angular/core';
import {
  differenceInBusinessDays,
  differenceInSeconds,
  format
} from 'date-fns';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {
  transform(input: number | string | Date): string {
    const inputDate = new Date(input);
    const seconds = differenceInSeconds(new Date(), inputDate);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    if (minutes <= 1) {
      return `${seconds} seconds ago`;
    } else if (minutes < 45) {
      return `${minutes} minutes ago`;
    } else if (hours === 1) {
      return `${hours} hour ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days === 1) {
      return `${days} day ago`;
    } else if (differenceInBusinessDays(new Date(), inputDate) < 6) {
      return `${days} days ago`;
    }
    return format(inputDate, 'LLL dd');
  }
}
