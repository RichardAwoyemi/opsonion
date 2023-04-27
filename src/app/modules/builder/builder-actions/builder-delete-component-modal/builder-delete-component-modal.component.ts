import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { IWebsite } from '../../../../shared/models/website';
import { ActiveComponentsPartialSelector, ActiveSettings } from '../../builder';
import { IComponent } from '../../builder-components/builder-components';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderService } from '../../builder.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-builder-delete-component-modal',
  templateUrl: './builder-delete-component-modal.component.html',
})
export class BuilderDeleteComponentModalComponent implements IModalComponent, OnInit, OnDestroy {
  @Input() componentId;
  website: IWebsite;
  components: IComponent[];
  activePage: string;
  activePageIndex: number;

  ngUnsubscribe = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.builderService.activePageSetting
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((activePageSettingsResponse) => {
        if (activePageSettingsResponse) {
          this.activePage = activePageSettingsResponse;
          this.builderComponentsService.website
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
              if (response) {
                this.website = response;
                for (let i = 0; i < this.website.pages.length; i++) {
                  if (this.website.pages[i].name === this.activePage) {
                    this.activePageIndex = i;
                    this.components = this.website.pages[i].components.filter(function (a) {
                      return a.componentName !== ActiveComponentsPartialSelector.Placeholder;
                    });
                  }
                }
              }
            });
        }
      });
  }

  onConfirmButtonClick(): void {
    const website = this.builderComponentsService.website.getValue();
    let components = BuilderComponentsService.deleteComponentById(
      this.components,
      this.componentId
    );
    components = BuilderComponentsService.addPlaceholders(components);
    website.pages[this.activePageIndex].components = components;
    this.builderService.clearActiveComponent();
    this.builderService.activeSetting.next(ActiveSettings.Templates);
    this.builderService.activeComponentMetadata.next(null);
    this.builderComponentsService.website.next(UtilService.shallowClone(website));
    this.toastrService.success('Your component has been deleted.', 'Great!');
    this.activeModal.dismiss();
  }

  onCloseButtonClick(): void {
    this.activeModal.dismiss();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
