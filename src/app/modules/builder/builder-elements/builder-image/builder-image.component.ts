import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IComponentMetadata, IDragData } from '../../builder-components/builder-components';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-image',
  templateUrl: './builder-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderImageComponent implements OnInit {
  @Input() componentMetadata: IComponentMetadata;
  @Input() elementName: string;
  @Input() elementId: string;
  @Input() src: string;
  @Input() alt: string;
  @Input() imageStyle = {};
  @Input() containerStyle = {};
  @Input() prependContainerClass = '';
  @Input() prependClass = 'img-fluid';
  @Input() displayOption = true;
  @Input() activeSettings = 'Options';
  @Input() cyContainerTag: string;
  @Input() cyImageTag: string;
  @Input() applyBuilderContainerStyles = false;
  @Input() save = true;

  @Output() srcValue = new EventEmitter();
  @Output() altValue = new EventEmitter();

  imageChangeCounter = 0;
  imageStore = { src: null, alt: null };
  ngUnsubscribe = new Subject<void>();
  activeDragData: IDragData = {};
  triggerInternalDragEvents = false;
  acceptableTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  constructor(private builderService: BuilderService) {}

  ngOnInit(): void {
    this.elementId =
      this.elementId || this.componentMetadata['componentId'] + '-' + this.elementName;
    this.cyContainerTag =
      this.cyContainerTag ||
      this.componentMetadata.componentName + '-' + this.elementName + '-container';
    this.cyImageTag =
      this.cyImageTag || this.componentMetadata.componentName + '-' + this.elementName + '-image';
    this.builderService.activeDragData.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      this.activeDragData = response;
    });
  }
}
