function  doGet() {

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName("Overview Analytics");
    const data = ws.getRange("A1").getDataRegion().getValues();
    const headers = data.shift();
  
    const jsonArray = data.map(r => {
      let obj = {};
      headers.forEach((header,index) => {
        obj[header] = r[index];
      });
      return obj;
    });
  
    const response = [{status: 200, data: jsonArray}];
  
    return sendJSON_(response);
  
      
  }