import * as React from 'react';
import { IReadRecieptProps } from './IReadRecieptProps';
import { IReadRecieptState } from './IReadRecieptState';
import {Provider } from "@fluentui/react-teams";
import { TeamsTheme } from '@fluentui/react-teams/lib/cjs/themes';
import { Checkbox, Flex, Button, Alert} from '@fluentui/react-northstar';
import { HttpClient, IHttpClientOptions } from "@microsoft/sp-http";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';




export default class ReadReciept extends React.Component<IReadRecieptProps,IReadRecieptState, {}> {
  constructor(props: IReadRecieptProps, state: IReadRecieptState) {
    super(props);
    // Initialize the state of the component
    this.state = {
      checked : true,
      loading : false
    };
    console.log("_GetSettings");
    //() => this._GetSettings();

  }
  public render(): React.ReactElement<IReadRecieptProps> {
    let Itheme:TeamsTheme = TeamsTheme.Default;
    let Ilang:string = "en-US";


    if(this.props.spContext.sdks.microsoftTeams)
    {
      Itheme = this.props.spContext.sdks.microsoftTeams.context.theme as TeamsTheme;
      Ilang = this.props.spContext.sdks.microsoftTeams.context.locale;
    }

    return (

      <Provider themeName={Itheme}  lang={Ilang} >

      <div >
      <Flex >
        <Flex.Item >
          <Checkbox id="Check" label="I attest having read the news" onChange={()=> {this.setState({checked: !this.state.checked}) ;}} />
        </Flex.Item>
        <Flex.Item >
          <Button  id="Button" content="Send" primary disabled={this.state.checked} loading={this.state.loading} onClick ={()=> this._OnClick()}/>
        </Flex.Item>
      </Flex>

      <Alert  success content="This is a success alert" />
      <Alert  danger content="This is a success alert" />

      </div>
      </Provider>

    );
  }

  private _OnClick = () : void => {
          // Log the current operation
          console.log("Using _OnClick() method");
          this.setState({loading: !this.state.loading});

          const body: string = JSON.stringify({
            'user': this.props.spContext.pageContext.user.email,
            'PageTitle': this.props.spContext.pageContext.web.title,
            'URL': this.props.spContext.pageContext.site.serverRequestPath
          });
          
          
          const spOpts: IHttpClientOptions = {
            body: body
          };



    this.props.spContext.httpClient
    .post("https://prod-161.westeurope.logic.azure.com:443/workflows/1c20ff9dff5c4beba4592862cef279d8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vq4AcWMXJtC3lRfF5SkzLBclZy-vc0TneqlSOM3XSEo",HttpClient.configurations.v1,spOpts)
    .then(
      () =>{this.setState({loading: !this.state.loading});}
    )
    .catch(
      (err) =>{this.setState({loading: !this.state.loading});console.log(err);}
    );


  }

  private async _GetSettings() {
    console.log("_Starting Get Settings");
    try{
      const webAbsoluteUrl = this.context.pageContext.web.absoluteUrl;
      const apiUrlSiteID = `${webAbsoluteUrl}/sites/site/_api/web/GetStorageEntity('RRspSiteID')`;
      const apiUrlListID = `${webAbsoluteUrl}/sites/site/_api/web/GetStorageEntity('RRspListID')`;
      const dataSiteID: SPHttpClientResponse = await this.context.spHttpClient.get(apiUrlSiteID, SPHttpClient.configurations.v1);
      if(dataSiteID.ok){
        const results = await dataSiteID.json();
        console.log(results);
      }
    }
    catch(error){
      console.error(error.message);
      
    }
  } 
}

