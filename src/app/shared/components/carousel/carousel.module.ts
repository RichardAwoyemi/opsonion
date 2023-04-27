import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel.component';
import { CarouselService } from './carousel.service';

@NgModule({
  declarations: [CarouselComponent],
  imports: [CommonModule, RouterModule],
  exports: [CarouselComponent],
  providers: [CarouselService],
})
export class CarouselModule {}
