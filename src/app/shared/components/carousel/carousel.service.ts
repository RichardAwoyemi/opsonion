import { Injectable } from '@angular/core';
import { CarouselButtonDirection } from './carousel';

@Injectable()
export class CarouselService {
  static leftButtonImage =
    'M15.45 17.97L9.5 12.01a.25.25 0 0 1 0-.36l5.87-5.87a.75.75 0 0 0-1.06-1.06l-5.87 5.87c-.69.68-.69 1.8 0 2.48l5.96 5.96a.75.75 0 0 0 1.06-1.06z';
  static rightButtonImage =
    'M8.55 5.78l5.96 5.97c.1.1.1.25 0 .35l-5.87 5.87a.75.75 0 0 0 1.06 1.06l5.87-5.87c.69-.68.69-1.79 0-2.47L9.61 4.72a.75.75 0 0 0-1.06 1.06z';

  static generateCarouselItemsButton(
    buttonDirection: string,
    buttonHeight: string,
    buttonHorizontalPosition: string,
    buttonId: string
  ): string {
    let buttonStyle = `height: ${buttonHeight}px`;
    let buttonImage;
    let buttonClass = `carousel-navigation-button carousel-navigation-button-${buttonDirection}`;
    if (buttonDirection === CarouselButtonDirection.Left) {
      buttonStyle += `;left: ${buttonHorizontalPosition}px`;
      buttonImage = this.leftButtonImage;
      buttonClass += ' carousel-navigation-button-disable';
    } else {
      buttonStyle += `;left: ${buttonHorizontalPosition}px`;
      buttonImage = this.rightButtonImage;
    }
    return (
      `<button id="${buttonId}" class="${buttonClass}" style="${buttonStyle}" data-cy="${buttonId}">` +
      '<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
      `<path fill="currentColor" d="${buttonImage}"></path></svg></span></button>`
    );
  }
}
