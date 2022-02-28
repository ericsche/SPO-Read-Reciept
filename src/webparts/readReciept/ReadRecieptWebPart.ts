import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReadRecieptWebPartStrings';
import ReadReciept from './components/ReadReciept';
import { IReadRecieptProps } from './components/IReadRecieptProps';

export interface IReadRecieptWebPartProps {
  description: string;
}

export default class ReadRecieptWebPart extends BaseClientSideWebPart<IReadRecieptWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReadRecieptProps> = React.createElement(
      ReadReciept,
      {
        spContext: this.context,
        description: this.properties.description

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
