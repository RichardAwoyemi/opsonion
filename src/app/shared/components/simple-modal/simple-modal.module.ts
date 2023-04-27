import { NgModule } from '@angular/core';
import { SimpleModalComponent } from './simple-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleModalService } from './simple-modal.service';

@NgModule({
  declarations: [SimpleModalComponent],
  imports: [NgbModalModule],
  exports: [SimpleModalComponent],
  providers: [SimpleModalService],
  entryComponents: [SimpleModalComponent],
})
export class SimpleModalModule {}
