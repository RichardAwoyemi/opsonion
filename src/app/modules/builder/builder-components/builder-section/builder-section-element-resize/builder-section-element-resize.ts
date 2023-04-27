export interface IHandle {
  x?: string;
  y?: string;
  settings?: IHandleSettings[];
}

export interface IHandleSettings {
  position: string;
  axis: string;
  dimension: string;
  eventProperty: string;
  translate: boolean;
  deltaMultiplier: number;
}
