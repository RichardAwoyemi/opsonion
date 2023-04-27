export interface ITheme {
  name: string;
  colour: IThemeColour;
}

export interface IThemeColour {
  'primary-background': string;
  'primary-text': string;
  'secondary-background': string;
  'secondary-text': string;
  'button-background': string;
  'button-border': string;
  'button-text': string;
}
