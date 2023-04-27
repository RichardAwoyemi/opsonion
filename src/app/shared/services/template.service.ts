import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  ActiveComponents,
  ActiveComponentsPartialSelector,
  ActiveTemplates,
  ActiveThemes,
} from '../../modules/builder/builder';
import { IComponent } from '../../modules/builder/builder-components/builder-components';
import { BuilderComponentsService } from '../../modules/builder/builder-components/builder-components.service';
import { ISectionElement } from '../../modules/builder/builder-components/builder-section/builder-section';
import { BuilderService } from '../../modules/builder/builder.service';
import { ITemplate } from '../models/template';
import { IPageStructure, IWebsite } from '../models/website';
import { FontsService } from './fonts.service';
import { UtilService } from './util.service';

@Injectable()
export class TemplateService {
  static selectedTemplates: ITemplate[];
  static availableTemplates: ITemplate[];
  activeTemplate = new BehaviorSubject<ITemplate>(null);
  selectedTemplate: Subject<ITemplate> = new Subject<ITemplate>();
  private TEMPLATE_FOLDER = './assets/data/web-templates/';
  private PAGE_STRUCTURES_FOLDER = './assets/data/web-page-structures/';

  constructor(
    private httpClient: HttpClient,
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
    private fontsService: FontsService
  ) {}

  static parseTemplates(templates: ITemplate[]): ITemplate[] {
    const parsedTemplates = new Array<ITemplate>();
    for (let i = 0; i < templates.length; i++) {
      parsedTemplates.push({
        id: templates[i].id,
        name: templates[i].name,
      });
    }
    return parsedTemplates;
  }

  static parseAvailableTemplates(templates: ITemplate[]): void {
    this.availableTemplates = this.parseTemplates(templates);
  }

  static parseSelectedTemplates(templates: ITemplate[]): void {
    this.selectedTemplates = this.parseTemplates(templates);
  }

  async getRequestedJson<T>(path: string): Promise<T> {
    return await this.httpClient.get<T>(path).toPromise();
  }

  async getWebsite(templateId: string, structureId = 'default'): Promise<IWebsite> {
    let pageStructure = {} as IPageStructure;
    let website = {} as IWebsite;
    let styleTemplate;
    await this.getRequestedJson(`${this.PAGE_STRUCTURES_FOLDER}${structureId}.json`).then(
      async (pageStructureResponse) => {
        pageStructure = <IPageStructure>pageStructureResponse;
        website.pages = pageStructure.pages;
        await this.getRequestedJson(`${this.TEMPLATE_FOLDER}${templateId}.json`).then(
          async (styleResponse) => {
            styleTemplate = <ITemplate>styleResponse;
            website.template = templateId;
            this.builderComponentsService.activeTemplate.next(
              <ITemplate>UtilService.shallowClone(styleTemplate)
            );
            website = this.generateWebsitePagePlaceholders(website);
            website = this.getWebsiteComponents(website, styleTemplate);
            this.builderComponentsService.website.next(website);
            return website;
          }
        );
        return website;
      }
    );
    return website;
  }

  getComponent(
    componentName: string,
    key = 'default',
    template = this.builderComponentsService.activeTemplate.getValue(),
    index: number = null,
    pageIndex: number = null
  ): IComponent {
    const componentTemplate = template[ActiveComponents[componentName]].find(
      (component) => component.key === key
    );
    const componentId = `${ActiveComponents[componentName]}-${UtilService.generateRandomString(8)}`;
    (componentTemplate.elements as ISectionElement[]).map(
      (element) => (element.elementId = `${element.type}-${UtilService.generateRandomString(8)}`)
    );
    return UtilService.shallowClone(<IComponent>{
      ...(index === null ? {} : { componentIndex: index }),
      ...(pageIndex === null ? {} : { pageIndex: pageIndex }),
      componentId: componentId,
      [`${ActiveComponents[componentName]}Theme`]: ActiveThemes.Default,
      componentType: ActiveComponents.Section,
      componentName: ActiveComponentsPartialSelector[componentName],
      timestamp: new Date().getTime(),
      style: componentTemplate.style,
      elements: componentTemplate.elements,
      height: componentTemplate.height,
    });
  }

  setTemplate(templateId: string): void {
    if (
      Object.values(ActiveTemplates)
        .map((value) => value.toString())
        .includes(<ActiveTemplates>templateId)
    ) {
      this.httpClient.get(`${this.TEMPLATE_FOLDER}${templateId}.json`).subscribe((response) => {
        if (response) {
          const newStyle = response;
          const website = this.builderComponentsService.website.getValue();
          website.template = templateId;
          for (let i = 0; i < website.pages.length; i++) {
            for (let j = 0; j < website.pages[i].components.length; j++) {
              if (website.pages[i].components[j].style) {
                website.pages[i].components[j].style = UtilService.shallowClone(
                  newStyle[website.pages[i].components[j].componentType].style
                );
              }
            }
          }
          this.builderComponentsService.website.next(website);
          this.fontsService.setActiveFonts(website);
          this.builderService.clearActiveComponent();
          this.builderComponentsService.activeTemplate.next(
            <ITemplate>UtilService.shallowClone(response)
          );
        }
      });
    }
  }

  getTemplateStyle(templateId: string): Observable<ITemplate> {
    if (
      Object.values(ActiveTemplates)
        .map((value) => value.toString())
        .includes(<ActiveTemplates>templateId)
    ) {
      return this.httpServiceRequest(`${this.TEMPLATE_FOLDER}${templateId}.json`);
    } else {
      return null;
    }
  }

  generateWebsitePagePlaceholders(website: IWebsite): IWebsite {
    for (let i = 0; i < website.pages.length; i++) {
      website.pages[i].components = BuilderComponentsService.addPlaceholders(
        website.pages[i].components
      );
    }
    return website;
  }

  getComponentIds(website: IWebsite, partialSelector: string): string {
    if (this.builderComponentsService.checkIfComponentExists(partialSelector, website)) {
      const position = this.builderComponentsService.getTargetComponentByName(
        partialSelector,
        website
      )[0];
      return website.pages[position['activePageIndex']].components[position['activeComponentIndex']]
        .componentId;
    }
    return null;
  }

  private getWebsiteComponents(website: IWebsite, template = null) {
    for (let i = 0; i < website.pages.length; i++) {
      for (let j = 0; j < website.pages[i].components.length; j++) {
        if (website.pages[i].components[j].componentType !== ActiveComponents.Placeholder) {
          const componentName = (website.pages[i].components[j] as unknown) as string;
          website.pages[i].components[j] = this.getComponent(
            componentName,
            'default',
            template,
            j,
            i
          );
        }
      }
    }
    return website;
  }

  private httpServiceRequest(location): Observable<ITemplate> {
    return this.httpClient.get<ITemplate>(location);
  }
}
