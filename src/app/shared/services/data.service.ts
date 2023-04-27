import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';
import { ICalendarYear } from '../models/calendar';
import { ITemplate } from '../models/template';

@Injectable()
export class DataService {
  private readonly dates: Observable<ICalendarYear>;
  private readonly webTemplateBusiness: Observable<ITemplate>;
  private datesDataPath = './assets/data/dates.json';
  private webTemplateBusinessDataPath = './assets/data/web-templates/template-business.json';

  constructor(public httpClient: HttpClient) {
    this.dates = this.httpClient.get<ICalendarYear>(this.datesDataPath);
    this.webTemplateBusiness = this.httpClient.get<ITemplate>(this.webTemplateBusinessDataPath);
  }

  public getAllDates(): Observable<ICalendarYear> {
    return this.dates;
  }

  public getAllWebTemplates(): Observable<[ITemplate]> {
    return combineLatest([this.webTemplateBusiness]);
  }
}
