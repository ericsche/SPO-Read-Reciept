import { WebPartContext } from "@microsoft/sp-webpart-base";


export interface IReadRecieptProps {
  spContext: WebPartContext;
  description: string;
  spSiteID?: string;
  spListID?: string;
}
