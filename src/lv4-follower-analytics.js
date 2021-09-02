function doPost(e) {

  let jsonResponse;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const topTerritoriesSheet = ss.getSheetByName("Top Territories");
  const genderSheet = ss.getSheetByName("Gender");
  const followerActivitySheet = ss.getSheetByName("Follower Activity");

  const body = e.postData.contents;
  const bodyJSON = JSON.parse(body);

  // Regions Table
  const regionsArray = bodyJSON.follower_region_percent.value.map(items => [
    new Date().toLocaleString().split(',')[0],
    items.key,
    (items.value * 100).toFixed(5) + '%'
    ]);
  const lastRowTopTerritoriesSheet = topTerritoriesSheet.getLastRow();
  topTerritoriesSheet.getRange(lastRowTopTerritoriesSheet + 1, 1, 5, 3).setValues(regionsArray);


  //Follower Active Hours Table
  const activeHistoryHoursArray = bodyJSON.follower_active_history_hours[0].value.map(items => [
    new Date().toLocaleString().split(',')[0]
  ]);
  const activeHistoryHoursArray_0 = bodyJSON.follower_active_history_hours[0].value;
  const activeHistoryHoursArray_1 = bodyJSON.follower_active_history_hours[1].value;
  const activeHistoryHoursArray_2 = bodyJSON.follower_active_history_hours[2].value;

  var hours = [];
    var text_hour;
    for (var i = 0; i < 24; i++) {
      if (i > 9) {
      text_hour = i+':00';
    } else {
      text_hour = '0'+i+':00';
    }
   hours.push(text_hour);
  }

  for (let i = 0; i < activeHistoryHoursArray.length; i++) {
    activeHistoryHoursArray[i].push(
    hours[i],
    activeHistoryHoursArray_0[i],
    activeHistoryHoursArray_1[i],
    activeHistoryHoursArray_2[i]);
  }

  const lastRowFollowerActivitySheet = followerActivitySheet.getLastRow();
  followerActivitySheet.getRange(lastRowFollowerActivitySheet + 1, 1, 24, 5).setValues(activeHistoryHoursArray);

  // Gender Table
  const genderArray = bodyJSON.follower_gender_percent.value.map(items => (items.value));
  const followerNum = bodyJSON.follower_num.value;
  const genderSheetArray = [
    new Date().toLocaleString().split(',')[0],
    (genderArray[0] * 100).toFixed(5) + '%',
    (genderArray[1] * 100).toFixed(5) + '%',
    followerNum
  ];
  //console.log(genderSheetArray)
  const lastRowGenderSheet = genderSheet.getLastRow();
  genderSheet.appendRow(genderSheetArray);
}
