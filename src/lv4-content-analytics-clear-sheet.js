function doPost(e) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const contentAnalyticsSheet = ss.getSheetByName("Content Analytics");

  // clear the spreadsheet
  contentAnalyticsSheet.deleteRows(2, contentAnalyticsSheet.getLastRow());
}
