import { CarouselService } from './carousel.service';
import { AfterViewInit, Component, Input } from '@angular/core';
import { CarouselButtonDirection, CarouselEvent } from './carousel';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any;

@Component({
  selector: 'app-carousel',
  templateUrl: 'carousel.component.html',
})
export class CarouselComponent implements AfterViewInit {
  @Input() carouselItemId;
  @Input() carouselItemParentComponent;
  @Input() carouselItemParentService;
  @Input() carouselItemButtonHeight;
  @Input() carouselItemButtonLeftPosition;
  @Input() carouselItemButtonRightPosition;
  @Input() carouselLoopOption;
  @Input() carouselNavOption;
  carouselId: string;
  carouselNavigationLeftButtonId: string;
  carouselNavigationRightButtonId: string;

  ngOnInit(): void {
    this.carouselId = `${this.carouselItemParentComponent}-carousel-${this.carouselItemId}`;
    this.carouselNavigationRightButtonId = `${this.carouselItemParentComponent}-carousel-${this.carouselItemId}-navigation-button-right`;
    this.carouselNavigationLeftButtonId = `${this.carouselItemParentComponent}-carousel-${this.carouselItemId}-navigation-button-left`;
  }

  ngAfterViewInit(): void {
    function callback(e: CarouselEvent) {
      let activeCarouselItemIndex = e.item.index + 1 - e['relatedTarget']._clones.length / 2;
      const carouselItemCount = e.item.count;
      if (activeCarouselItemIndex > carouselItemCount || activeCarouselItemIndex === 0) {
        activeCarouselItemIndex = carouselItemCount - (activeCarouselItemIndex % carouselItemCount);
      }

      if (e.target.id) {
        const carouselNavigationLeftButtonId = `${e.target.id}-navigation-button-left`;
        const carouselNavigationRightButtonId = `${e.target.id}-navigation-button-right`;
        $(e.target)
          .children()
          .find('.carousel-navigation-button-left')
          .attr('id', carouselNavigationLeftButtonId);
        $(e.target)
          .children()
          .find('.carousel-navigation-button-right')
          .attr('id', carouselNavigationRightButtonId);
        if (activeCarouselItemIndex === 1) {
          $(`#${carouselNavigationLeftButtonId}`).addClass('carousel-navigation-button-disable');
        } else {
          $(`#${carouselNavigationLeftButtonId}`).removeClass('carousel-navigation-button-disable');
        }
      }
    }

    $(`.owl-carousel-${this.carouselId}`).owlCarousel({
      margin: 10,
      loop: this.carouselLoopOption,
      nav: this.carouselNavOption,
      dots: false,
      lazyLoad: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      onTranslate: callback,
      navText: [
        CarouselService.generateCarouselItemsButton(
          CarouselButtonDirection.Left,
          this.carouselItemButtonHeight,
          this.carouselItemButtonLeftPosition,
          this.carouselNavigationLeftButtonId
        ),
        CarouselService.generateCarouselItemsButton(
          CarouselButtonDirection.Right,
          this.carouselItemButtonHeight,
          this.carouselItemButtonRightPosition,
          this.carouselNavigationRightButtonId
        ),
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 3,
        },
      },
    });
  }
}
