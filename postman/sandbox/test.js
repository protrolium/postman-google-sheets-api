tests["Status code is 200"] = (responseCode.code === 200);
var moment = require('moment');

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}

function toPercent(p) {
    p = Number(p);
    return (p * 100).toFixed(5) + '%';
}

if (responseCode.code === 200) {
    try {
        var result = JSON.parse(responseBody);
            views = result.video_info.statistics.play_count;
            duration = (result.video_info.video.duration / 1000);
            likes = result.video_info.statistics.digg_count;
            comments = result.video_info.statistics.comment_count;
            shares = result.video_info.statistics.share_count;
            engagements = likes + comments + shares;
            downloads = result.video_info.statistics.download_count;
            forwards = result.video_info.statistics.forward_count;
            whatsapp = result.video_info.statistics.whatsapp_share_count;
            avgTimeWatched = (result.video_per_duration.value / 1000);
            watchFullVidPercent = toPercent(result.finish_rate.value);
            vidTotalDuration = secondsToHms(result.video_total_duration.value);
            vidTotalTimeWatched = result.video_output_time;
            sources = result.video_page_percent.value;
            flatSources = Object.assign({}, ...sources.map(item => ({[item.key]:item.value})));
            persProfile_v = toPercent(flatSources["Personal Profile"]);
            forYou_v = toPercent(flatSources["For You"]);
            follow_v = toPercent(flatSources["Follow"]);
            regPer_1_k = result.video_region_percent.value[0].key;
            regPer_1_v = toPercent(result.video_region_percent.value[0].value);
            regPer_2_k = result.video_region_percent.value[1].key;
            regPer_2_v = toPercent(result.video_region_percent.value[1].value);
            regPer_3_k = result.video_region_percent.value[2].key;
            regPer_3_v = toPercent(result.video_region_percent.value[2].value);
            regPer_4_k = result.video_region_percent.value[3].key;
            regPer_4_v = toPercent(result.video_region_percent.value[3].value);
            regPer_5_k = result.video_region_percent.value[4].key;
            regPer_5_v = toPercent(result.video_region_percent.value[4].value);
    }
    catch(e) {
        console.log(e);
    }

    //console.log(comments);
    pm.environment.set("currentDate", moment().format(("YYYY-MM-DD")));
    pm.environment.set("lv4-vid-views", views);
    pm.environment.set("lv4-vid-duration", duration);
    pm.environment.set("lv4-vid-likes", likes);
    pm.environment.set("lv4-vid-comment-count", comments);
    pm.environment.set("lv4-vid-shares", shares);
    pm.environment.set("lv4-vid-engagements", engagements);
    pm.environment.set("lv4-vid-downloads", downloads);
    pm.environment.set("lv4-vid-forwards", forwards);
    pm.environment.set("lv4-vid-whatsapp", whatsapp);
    pm.environment.set("lv4-vid-avgTimeWatched", avgTimeWatched);
    pm.environment.set("lv4-vid-watchFullVidPercent", watchFullVidPercent);
    pm.environment.set("lv4-vid-vidTotalDuration", vidTotalDuration);
    pm.environment.set("lv4-vid-vidTotalTimeWatched", vidTotalTimeWatched);

    //pm.environment.set("lv4-vid-persProfile_k", persProfile_k);
    pm.environment.set("lv4-vid-persProfile_v", persProfile_v);
    //pm.environment.set("lv4-vid-forYou_k", forYou_k);
    pm.environment.set("lv4-vid-forYou_v", forYou_v);
    //pm.environment.set("lv4-vid-follow_k", follow_k);
    pm.environment.set("lv4-vid-follow_v", follow_v);

    pm.environment.set("lv4-vid-regPer_1_k", regPer_1_k);
    pm.environment.set("lv4-vid-regPer_1_v", regPer_1_v);
    pm.environment.set("lv4-vid-regPer_2_k", regPer_2_k);
    pm.environment.set("lv4-vid-regPer_2_v", regPer_2_v);
    pm.environment.set("lv4-vid-regPer_3_k", regPer_3_k);
    pm.environment.set("lv4-vid-regPer_3_v", regPer_3_v);
    pm.environment.set("lv4-vid-regPer_4_k", regPer_4_k);
    pm.environment.set("lv4-vid-regPer_4_v", regPer_4_v);
    pm.environment.set("lv4-vid-regPer_5_k", regPer_5_k);
    pm.environment.set("lv4-vid-regPer_5_v", regPer_5_v);

    //get the counter value and array length
    var counter = pm.environment.get('counter');
    var arrayLength = pm.environment.get("idArrayLength");

    //check to see if there are more indexes in the array to go through, and if so
    if (counter < arrayLength) {
        postman.setNextRequest('video info');
    }
    else {
        postman.setNextRequest(null);
    }
}
