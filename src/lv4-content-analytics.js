function doPost(e) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const contentAnalyticsSheet = ss.getSheetByName("Content Analytics");
  const contentAnalyticsAppendedSheet = ss.getSheetByName("Content Analytics Appended");
  const headers_ca = contentAnalyticsSheet.getRange(1,1,1,contentAnalyticsSheet.getLastColumn()).getValues()[0];
  const headersOriginalOrder_ca = headers_ca.slice();
  const headers_caa = contentAnalyticsAppendedSheet.getRange(1,1,1,contentAnalyticsAppendedSheet.getLastColumn()).getValues()[0];
  const headersOriginalOrder_caa = headers_caa.slice();
  headers_ca.sort();
  headers_caa.sort();

  const body = e.postData.contents;
  const bodyJSON = JSON.parse(body);

  const contentAnalyticsArray = headersOriginalOrder_ca.map(header => bodyJSON[header]);
  const contentAnalyticsAppendedArray = headersOriginalOrder_caa.map(header => bodyJSON[header]);
  contentAnalyticsAppendedSheet.appendRow(contentAnalyticsAppendedArray);
  contentAnalyticsSheet.appendRow(contentAnalyticsArray);
}
