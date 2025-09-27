import { Injectable } from '@nestjs/common';

@Injectable()
export class applicationUtilService {
  constructor() {}

  formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
}

declare global {
  interface Date {
    toCustomFormat(separator?: string): string;
  }
}

Date.prototype.toCustomFormat = function (separator: string = '-'): string {
  const day = this.getDate().toString().padStart(2, '0');
  const month = (this.getMonth() + 1).toString().padStart(2, '0');
  const year = this.getFullYear().toString();
  return `${day}${separator}${month}${separator}${year}`;
};
