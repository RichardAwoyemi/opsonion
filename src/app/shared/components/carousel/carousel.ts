import { HTMLInputEvent } from '../../models/html-input-event';

export enum CarouselButtonDirection {
  Left = 'left',
  Right = 'right',
}

export interface CarouselEvent extends HTMLInputEvent {
  element: string;
  item: CarouselItem;
  page: CarouselPage;
}

export interface CarouselItem {
  count: number;
  index: number;
}

export interface CarouselPage {
  count: number;
  index: number;
  size: number;
}
