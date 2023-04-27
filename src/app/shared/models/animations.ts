import { animate, AnimationTransitionMetadata, style, transition } from '@angular/animations';

export function fadeIn(): AnimationTransitionMetadata[] {
  return [
    transition(':enter', [style({ opacity: 0 }), animate('400ms ease-in', style({ opacity: 1 }))]),
  ];
}
