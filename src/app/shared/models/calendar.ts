export interface ICalendarYear {
  Jan: ICalendarMonth;
  Feb: ICalendarMonth;
  Mar: ICalendarMonth;
  Apr: ICalendarMonth;
  May: ICalendarMonth;
  Jun: ICalendarMonth;
  Jul: ICalendarMonth;
  Aug: ICalendarMonth;
  Sep: ICalendarMonth;
  Oct: ICalendarMonth;
  Nov: ICalendarMonth;
}

export interface ICalendarMonth {
  name: string;
  short: string;
  number: number;
  days: number;
}
