import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from '../../../../../shared/components/simple-modal/simple-modal.service';

@Component({
  selector: 'app-settings-billing',
  templateUrl: './settings-billing.component.html',
})
export class SettingsBillingComponent implements OnInit {
  unavailableHeading: string;
  unavailableMessage: string;

  constructor(private simpleModalService: SimpleModalService) {}

  ngOnInit(): void {
    this.unavailableHeading = '😅';
    this.unavailableMessage =
      'We are currently working on perfecting the feature! Thanks for your patience.';
  }

  openAddCardModal(): void {
    this.simpleModalService.displayMessage(this.unavailableHeading, this.unavailableMessage);
  }

  openUpgradeSubscriptionModal(): void {
    this.simpleModalService.displayMessage(this.unavailableHeading, this.unavailableMessage);
  }

  openRedeemCodeModal(): void {
    this.simpleModalService.displayMessage(this.unavailableHeading, this.unavailableMessage);
  }
}
