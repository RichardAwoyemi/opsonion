import { ISectionElement } from '../../modules/builder/builder-components/builder-section/builder-section';

export interface ITemplate {
  id: string;
  name: string;
  hero?: [
    {
      key: string;
      height: 70;
      elements: ISectionElement;
    }
  ];
}
