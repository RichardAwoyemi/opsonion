import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IComponentMetadata } from '../../builder-components/builder-components';
import { BuilderDeleteComponentModalComponent } from '../builder-delete-component-modal/builder-delete-component-modal.component';

@Component({
  selector: 'app-builder-component-toolbar',
  templateUrl: './builder-component-toolbar.component.html',
})
export class BuilderComponentToolbarComponent implements OnInit {
  @Input() componentName;
  @Input() componentId;
  @Input() activeComponentMetadata: IComponentMetadata;
  activeRoute: string;

  constructor(private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.activeRoute = this.router.url;
  }

  deleteComponent(): void {
    const modal = this.modalService.open(BuilderDeleteComponentModalComponent, {
      windowClass: 'modal-holder',
      centered: true,
    });
    modal.componentInstance.componentId = this.activeComponentMetadata.component.componentId;
  }

  toggleComponentToolbarVisibility(): boolean {
    if (
      this.activeComponentMetadata &&
      this.activeComponentMetadata.component.componentId === this.componentId
    ) {
      return this.activeRoute !== '/preview';
    } else {
      return false;
    }
  }
}
