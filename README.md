# SPO-Read-Receipt

**Solution Work in Progress**

SharePoint WebPart proof of concept to track reading of important news that would be publish in Sharepoint Online and consumed with Viva Connections.

**Current UI status**
![Example of the current UI to be improved.](/images/001.png)

**Snapshot of the architecture**
![Current & future Architecture of the Solution.](/images/002.png)

**To Do:**

- Build a true List structure for the Read Receipt storage with index
- Implement a setting field to setup the SPO list URL
- Change _OnClick function to PNPjs and use SPO Rest API
- Implement an _OnLoad function to check if user already submitted a read receipt
- Explore the reporting options with PBI
- Build a PowerAutomate to clean the SPO list on a time based approach. We can only store 5M lines in the end.