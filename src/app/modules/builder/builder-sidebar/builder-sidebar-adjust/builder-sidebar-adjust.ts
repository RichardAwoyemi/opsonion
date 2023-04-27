import { IElementData, IElementSettings } from '../builder-sidebar-config/builder-sidebar-config';

export const componentSliderDetails = {
  features: {
    data: {},
    settings: [
      {
        name: 'featuresItemArray',
        sectionHeader: 'Items',
        floor: 1,
        ceil: 7,
        getInitialValue: 'getFeatureCount',
        setNewValue: 'setNumberOfFeatures',
        getDefaultValue: 'resetFeatureCount',
      },
    ],
  },
  teamCards: {
    data: {},
    settings: [
      {
        name: 'teamCardsDetailsArray',
        sectionHeader: 'Cards',
        getInitialValue: 'getTeamCardCount',
        setNewValue: 'setNumberOfTeamCards',
        getDefaultValue: 'resetTeamCardCount',
        floor: 1,
        ceil: 25,
      },
      {
        name: 'teamCardsPerRow',
        sectionHeader: 'Columns',
        floor: 2,
        ceil: 4,
      },
      {
        name: 'teamCardsContainerStyle',
        childKey: 'max-width',
        sectionHeader: 'Box Size',
        getInitialValue: 'getContainerWidth',
        setNewValue: 'setContainerWidth',
        getDefaultValue: 'resetContainerWidth',
        floor: 1,
        ceil: 100,
      },
    ],
  },
};

export interface IAdjustTabSettings {
  features: {
    data?: IElementData;
    settings: IElementSettings;
  };
  teamCards: {
    data?: IElementData;
    settings: IElementSettings;
  };
}
