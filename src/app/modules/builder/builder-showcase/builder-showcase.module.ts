import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'ngx-sortablejs';
import { SimpleModalModule } from '../../../shared/components/simple-modal/simple-modal.module';
import { SimpleModalService } from '../../../shared/components/simple-modal/simple-modal.service';
import { IframeService } from '../../../shared/services/iframe.service';
import { BuilderComponentsModule } from '../builder-components/builder-components.module';
import { BuilderComponentsService } from '../builder-components/builder-components.service';
import { BuilderToolbarModule } from '../builder-toolbar/builder-toolbar.module';
import { BuilderShowcaseLayoutComponent } from './builder-showcase-layout/builder-showcase-layout.component';
import { BuilderShowcaseToolbarComponent } from './builder-showcase-toolbar/builder-showcase-toolbar.component';
import { BuilderShowcaseComponent } from './builder-showcase.component';

@NgModule({
  declarations: [
    BuilderShowcaseLayoutComponent,
    BuilderShowcaseComponent,
    BuilderShowcaseToolbarComponent,
  ],
  imports: [
    CommonModule,
    BuilderComponentsModule,
    NgbPopoverModule,
    SimpleModalModule,
    BuilderToolbarModule,
    SortablejsModule.forRoot({ animation: 500 }),
    RouterModule,
  ],
  exports: [
    BuilderShowcaseLayoutComponent,
    BuilderShowcaseComponent,
    BuilderShowcaseToolbarComponent,
  ],
  providers: [IframeService, BuilderComponentsService, SimpleModalService],
})
export class BuilderShowcaseModule {}
