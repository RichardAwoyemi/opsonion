export enum ActiveSettings {
  Adjust = 'adjust',
  Animate = 'animate',
  Colour = 'colour',
  Elements = 'elements',
  Font = 'font',
  Layout = 'layout',
  Options = 'options',
  Pages = 'pages',
  Photos = 'photos',
  Templates = 'templates',
  Text = 'text',
  Uploads = 'uploads',
}

export enum ActiveElements {
  Default = 'none',
}

export enum ActiveComponents {
  Features = 'features',
  Hero = 'hero',
  Navbar = 'navbar',
  Placeholder = 'placeholder',
  Section = 'section',
}

export enum ActiveComponentsDisplayNames {
  Features = 'features',
  Hero = 'hero',
  Navbar = 'navbar',
  Placeholder = 'Placeholder',
  Section = 'Section',
}

export enum ActiveComponentsPartialSelector {
  Placeholder = 'app-builder-placeholder',
}

export enum ActiveTemplates {
  Default = 'default',
  Quick = 'business-1',
  Front = 'business-2',
}

export enum ActiveStructures {
  Default = 'default',
}

export enum ActiveThemes {
  Default = 'Default',
  Stanley = 'Stanley',
}

export enum ActiveOrientations {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile',
}

export enum ActiveToolbar {
  Body = 'bodyText',
  Button = 'buttonSettings',
  ComponentMenu = 'componentMenu',
  Placeholder = 'defaultMenu',
  ShortText = 'shortText',
  LinkText = 'linkText',
  LinkIcon = 'linkIcon',
}

export enum toolbarButton {
  Animate = 'animate',
  Adjust = 'adjustMenu',
  Align = 'textAlign',
  Bold = 'textEditorBold',
  Colour = 'iconColour',
  Copy = 'copy',
  ColoursMenu = 'colourMenu',
  ComponentMenu = 'componentMenu',
  Delete = 'delete',
  FontSize = 'textFontSize',
  FontName = 'textFontName',
  FontColour = 'textFontColour',
  Italic = 'textEditorItalic',
  LayoutMenu = 'layoutMenu',
  Link = 'link',
  List = 'textEditorList',
  OptionsMenu = 'optionsMenu',
  Orientation = 'orientation',
  Position = 'position',
  Underline = 'textEditorUnderline',
}

export enum ActiveUploadTypes {
  Image = 'images',
  Video = 'videos',
}

export enum ActiveDragType {
  Button = 'button',
  Component = 'component',
  Image = 'image',
  SectionElement = 'sectionElement',
  Text = 'text',
}

export enum ActiveLinkTypes {
  Url = 'url',
  Page = 'page',
  Element = 'elementId',
  Email = 'email',
  Phone = 'phone',
  Placeholder = 'Placeholder'
}

export const MAX_NUMBER_OF_PAGES = 4,
  MIN_BUILDER_WINDOW_WIDTH = 1024,
  S3_MEDIA_BUCKET_URL = 'https://s3-eu-west-1.amazonaws.com/media.opsonion.com';
