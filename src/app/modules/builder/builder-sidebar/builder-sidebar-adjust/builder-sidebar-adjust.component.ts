import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IComponentMetadata } from '../../builder-components/builder-components';
import { BuilderService } from '../../builder.service';
import { IAdjustTabSettings } from './builder-sidebar-adjust';
import { ActiveSettings } from '../../builder';
// import { IAdjustTabSettings } from './builder-sidebar-adjust';

@Component({
  selector: 'app-builder-sidebar-adjust',
  templateUrl: './builder-sidebar-adjust.component.html',
  styleUrls: ['./builder-sidebar-adjust.component.css'],
})
export class BuilderSidebarAdjustComponent implements OnInit, OnDestroy {
  @Input() tabName;
  @Input() activeSetting;

  activeComponentMetadata: IComponentMetadata;
  ngUnsubscribe = new Subject<void>();
  componentSliders: IAdjustTabSettings;
  settingsName = ActiveSettings.Adjust;

  constructor(private builderService: BuilderService) {}

  ngOnInit(): void {
    // const services = {};
    // this.builderService.activeComponentMetadata
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe((response) => {
    //     if (response) {
    //       this.activeComponentMetadata = response;
    //       this.componentSliders = componentSliderDetails[
    //         this.activeComponentMetadata['componentName']
    //       ] || { data: { componentService: '' } };
    //       this.componentSliders['data']['componentService'] =
    //         services[this.activeComponentMetadata['componentName']] || '';
    //     }
    //   });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
