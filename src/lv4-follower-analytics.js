function doPost(e) {

    let jsonResponse;

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const topTerritoriesSheet = ss.getSheetByName("Top Territories");
    const genderSheet = ss.getSheetByName("Gender");
    const followerActivitySheet = ss.getSheetByName("Follower Activity");

  const body = e.postData.contents;
  // const bodyJSON = {"comment_history":null,"extra":{"fatal_item_ids":[],"logid":"20210823234115010245065145405BA945","now":1629762075000},"follower_active_history_days":null,"follower_active_history_hours":[{"status":0,"value":[34067,34002,31937,27742,22763,17484,13094,9652,7418,6457,8225,12749,14998,15277,17560,18663,20027,21282,22753,25668,29547,31896,32576,32684]},{"status":0,"value":[32761,32581,32369,30536,26631,21782,16677,12103,8955,6818,6189,8126,11827,16494,21729,25797,28515,29957,30330,30572,30579,30662,30273,30560]},{"status":0,"value":[30796,31103,31142,29945,26943,23014,18384,13739,9921,7477,6182,7132,10139,14945,20078,24749,28029,29668,30632,30971,31376,31220,31526,31931]}],"follower_gender_percent":{"status":0,"value":[{"key":"Male","value":0.5706590337616904},{"key":"Female","value":0.42934096623830964}]},"follower_num":{"status":0,"value":100862},"follower_num_history":null,"follower_region_percent":{"status":0,"value":[{"key":"US","value":0.9398189910685079},{"key":"MX","value":0.009417222613229711},{"key":"RU","value":0.003390200140762696},{"key":"GB","value":0.003132465627137462},{"key":"BR","value":0.0026863866612476333}]},"like_history":null,"log_pb":{"impr_id":"20210823234115010245065145405BA945"},"message":"","pv_history":null,"share_history":null,"status":"success","user_info":{"ad_cover_url":null,"bold_fields":null,"can_set_geofencing":null,"cha_list":null,"cover_url":null,"events":null,"followers_detail":null,"geofencing":null,"homepage_bottom_toast":null,"item_list":null,"mutual_relation_avatars":null,"need_points":null,"open_insight_time":1616514079,"platform_sync_info":null,"region":"US","relative_users":null,"search_highlight":null,"type_label":null,"unique_id":"lv4official","user_tags":null,"white_cover_url":null},"user_live_cnt_history":null,"user_live_diamonds_history":null,"user_live_duration_time_history":null,"user_live_follower_diamonds_history":null,"user_live_gift_unique_viewers_history":null,"user_live_new_followers_history":null,"user_live_top_viewers_history":null,"user_live_unique_viewers_history":null,"user_live_views_history":null,"vv_history":[{"status":0,"value":432}]};

  const bodyJSON = JSON.parse(body);

  // Regions Table
  const regionsArray = bodyJSON.follower_region_percent.value.map(items => [
    new Date().toLocaleString().split(',')[0],
    items.key,
    (items.value * 100).toFixed(5) + '%'
    ]);
  const lastRowTopTerritoriesSheet = topTerritoriesSheet.getLastRow();
  //console.log(regionsArray);
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
  //console.log(activeHistoryHoursArray);
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
