function doPost(e) {

  const requiredColumns = ["Comment History","Follower Number"]
  let jsonResponse;  

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("Overview Analytics");
  const headers = ws.getRange(1,1,1,ws.getLastColumn()).getValues()[0];
  const headersOriginalOrder = headers.slice();
  //headersOriginalOrder.shift();
  //remove first column
  //headers.shift();
  headers.sort();

  const body = e.postData.contents;
  const bodyJSON = JSON.parse(body);
  const headersPassed = Object.keys(bodyJSON).sort();
  
  if(!compareTwoArray_(headers,headersPassed,requiredColumns)) {
    jsonResponse = {status: 500,message:"Invalid arugments passed"};
    return sendJSON_(jsonResponse);
  }

  const arrayOfData = headersOriginalOrder.map(header => bodyJSON[header]);
  const arrayColumnA = ws.getRange(2,2,ws.getLastRow()-1,1).getValues();
  const newIdNumber = getMaxFromArrayOfArray_(arrayColumnA) + 1;
  //arrayOfData.unshift(newIdNumber);
  ws.appendRow(arrayOfData);
  //bodyJSON.id = newIdNumber;
  return sendJSON_(bodyJSON);

}

function compareTwoArray_(arrAllColumns,arrColumnsPassed,arrRequiredColumns) {
  if(!arrRequiredColumns.every(item => arrColumnsPassed.includes(item))) return false;
  if(!arrColumnsPassed.every(item => arrAllColumns.includes(item))) return false;
  return true;
}

function sendJSON_(jsonResponse) {
  return ContentService
  .createTextOutput(JSON.stringify(jsonResponse))
  .setMimeType(ContentService.MimeType.JSON);
}

// return the highest number / first column
function getMaxFromArrayOfArray_(aoa) {
  let maxID = 0;
  aoa.forEach(row => {
    if(row[0] > maxID) maxID = row[0];
  });
  return maxID;
}