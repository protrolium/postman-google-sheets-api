function doPost(e) {

  const requiredColumns = ["Captions","Date Posted", "Time Posted (UTC)"]
  let jsonResponse;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const contentAnalyticsSheet = ss.getSheetByName("Content Analytics");
  const headers = contentAnalyticsSheet.getRange(1,1,1,contentAnalyticsSheet.getLastColumn()).getValues()[0];
  const headersOriginalOrder = headers.slice();
  headers.sort();

  const body = e.postData.contents;
  const bodyJSON = JSON.parse(body);
  const headersPassed = Object.keys(bodyJSON).sort();

  if(!compareTwoArray_(headers,headersPassed,requiredColumns)) {
    jsonResponse = {status: 500,message:"Invalid arugments passed"};
    return sendJSON_(jsonResponse);
  }

  const arrayOfData = headersOriginalOrder.map(header => bodyJSON[header]);
  const arrayColumnA = contentAnalyticsSheet.getRange(2,2,contentAnalyticsSheet.getLastRow(),1).getValues();
  contentAnalyticsSheet.appendRow(arrayOfData);
}

function compareTwoArray_(arrAllColumns,arrColumnsPassed,arrRequiredColumns) {
  if(!arrRequiredColumns.every(item => arrColumnsPassed.includes(item))) return false;
  if(!arrColumnsPassed.every(item => arrAllColumns.includes(item))) return false;
  return true;
}
