import {
  IComponent,
  IStyle,
  IToolbarColours,
} from '../../modules/builder/builder-components/builder-components';

export interface IWebsite {
  createdBy?: string;
  id?: string;
  name?: string;
  pages?: IPage[];
  template?: string;
  uploads?: IUploadType;
}

export interface IPageStructure {
  pages: IPage[];
}

export interface IPage {
  name: string;
  components: IComponent[];
}

export interface IUploadType {
  images?: IUploadFile[];
  videos?: IUploadFile[];
}

export interface IUploadFile {
  key?: string;
  src?: string;
  alt?: string;
  deleteHash?: string;
  preview?: string;
  uploadState?: string;
  style?: IStyle;
  colours?: IToolbarColours[];
}
