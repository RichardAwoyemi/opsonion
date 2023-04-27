export interface ITourOptions {
  id: string;
  arrow: boolean;
  attachTo?: ITourAttachOptions;
  buttons: ITourButtonOptions[];
  highlightClass?: string;
  title: string;
  text: string[];
}

export interface ITourStepOptions {
  cancelIcon: {
    enabled: boolean;
  };
}

export interface ITourButtonOptions {
  classes: string;
  text: string;
  type: string;
}

export interface ITourAttachOptions {
  element: string;
  on: string;
}
