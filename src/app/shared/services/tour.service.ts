import { Injectable } from '@angular/core';
import { ITourOptions, ITourStepOptions } from '../models/tour';

@Injectable()
export class TourService {
  public static setupBuilderTourStepOptions(): ITourStepOptions {
    return {
      cancelIcon: {
        enabled: true,
      },
    };
  }

  public static setupBuilderTourSteps(): ITourOptions[] {
    return [
      {
        id: 'intro',
        arrow: false,
        buttons: [
          {
            classes: 'shepherd-button-secondary',
            text: 'Exit',
            type: 'cancel',
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Next',
            type: 'next',
          },
        ],
        title: 'Welcome to Opsonion',
        text: ['This is your canvas for building exciting new websites. Let’s get started.'],
      },
      {
        id: 'step1',
        arrow: false,
        attachTo: {
          element: '.shepherd-step-1',
          on: 'bottom',
        },
        highlightClass: 'highlight',
        buttons: [
          {
            classes: 'shepherd-button-secondary',
            text: 'Exit',
            type: 'cancel',
          },
          {
            classes: 'shepherd-button-secondary',
            text: 'Back',
            type: 'back',
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Next',
            type: 'next',
          },
        ],
        title: 'Pick the perfect name',
        text: [
          'Unhappy with the name of your website? You can start changing it with a simple click.',
        ],
      },
      {
        id: 'step2',
        arrow: false,
        attachTo: {
          element: '.shepherd-step-2',
          on: 'top',
        },
        highlightClass: 'highlight',
        buttons: [
          {
            classes: 'shepherd-button-secondary',
            text: 'Exit',
            type: 'cancel',
          },
          {
            classes: 'shepherd-button-secondary',
            text: 'Back',
            type: 'back',
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Next',
            type: 'next',
          },
        ],
        title: 'Personalise your website',
        text: [
          'Use the editor to create a design that fits your personal style and professional needs.',
        ],
      },
      {
        id: 'step3',
        arrow: false,
        attachTo: {
          element: '.shepherd-step-3',
          on: 'bottom',
        },
        highlightClass: 'highlight',
        buttons: [
          {
            classes: 'shepherd-button-secondary',
            text: 'Back',
            type: 'back',
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Complete',
            type: 'next',
          },
        ],
        title: 'Publish instantly',
        text: [
          'Once you’re done - take your website live on our fast, reliable and hassle-free hosting network.',
        ],
      },
    ];
  }
}
