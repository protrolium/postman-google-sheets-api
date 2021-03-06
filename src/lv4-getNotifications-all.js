const fs = require('fs');
const data = fs.readFileSync('../test/getNotifications-all-d.json', 'utf-8');
//parse JSON string to JSON object
const bodyJSON = JSON.parse(data);

const urlString = "https://www.tiktok.com/@lv4official/video/"

const noticeList = bodyJSON.notice_lists[0].notice_list;
//console.log(noticeList);

/* ~ GET COMMENTS ~ */ 

//filter by type 31 comment
const commentObj = noticeList.filter(items => items.type === 31);
console.log('COMMENTS COMMENTS COMMENTS COMMENTS');
console.log(commentObj.length);
// console.log(commentObj.map(items => items.comment));


// check if content is our own by matching our userID and then map to an array
const comments = commentObj
                .filter(items => items.comment.aweme.author.uid === '6938141470256251910')
                .map(items => items.comment.comment.text);
// console.log(comments);

const commentUserUniqueID = commentObj
                .filter(items => items.comment.aweme.author.uid === '6938141470256251910')
                .map(items => items.comment.comment.user.unique_id);
// console.log(commentUserUniqueID);

const commentUserNickname = commentObj
                .filter(items => items.comment.aweme.author.uid === '6938141470256251910')
                .map(items => items.comment.comment.user.nickname);
// console.log(commentUserNickname);

const commentMediaID = commentObj
                .filter(items => items.comment.aweme.author.uid === '6938141470256251910')
                .map(items => urlString + items.comment.aweme.aweme_id);
// console.log(commentMediaID);

const commentDate = commentObj
                .filter(items => items.comment.aweme.author.uid === '6938141470256251910')
                //.map(items => items.create_time);
                .map(items => { 
                    var epochTime = items.create_time;
                    epochConvert = new Date(epochTime * 1000);
                    creationDate = epochConvert.toLocaleDateString();
                return creationDate;
                });
//console.log(commentDate);

/* create array of arrays in the format:
[
    [ '10/20/2021', 'glitchboiuno', 'glitchboiuno', 'No' ],
    [ '10/20/2021', 'marion1_2', 'Marion1_2', 'No' ],
    ...
]  */

var commentListArray = new Array();
for (let i = 0; i < comments.length; i++) {
    //initialize Array order[i]
    commentListArray[i] = new Array();
    //add elements
    commentListArray[i].push(
    commentDate[i],
    comments[i], 
    commentUserUniqueID[i], 
    commentUserNickname[i], 
    commentMediaID[i]);
}
console.log(commentListArray);


/* ~ GET FOLLOWS ~ */ 

//filter by type 33 follow
const followersObj = noticeList.filter(items => items.type === 33)
console.log('FOLLOWS FOLLOWS FOLLOWS FOLLOWS');
console.log(followersObj.length);

const followUserUniqueID = followersObj.map(items => items.follow.from_user.unique_id);
// console.log(followUserUniqueID);

const followUserNickname = followersObj.map(items => items.follow.from_user.nickname);
// console.log(followUserNickname);

const followDate = followersObj.map(items => { 
                    var epochTime = items.create_time;
                    epochConvert = new Date(epochTime * 1000);
                    creationDate = epochConvert.toLocaleDateString();
                return creationDate;
                });
// console.log(followDate);

const isVerified = followersObj.map(boolean => {
    if (boolean.follow.from_user.verification_type === 0) {
        return 'No';
    } else {
        return 'Yes';
    }
});
// console.log(isVerified);


/* create array of arrays in the format:
[
    [ '10/20/2021', 'glitchboiuno', 'glitchboiuno', 'No' ],
    [ '10/20/2021', 'marion1_2', 'Marion1_2', 'No' ],
    ...
]  */

var followerListArray = new Array();
for (let i = 0; i < followersObj.length; i++) {
    //initialize Array order[i]
    followerListArray[i] = new Array();
    //add elements
    followerListArray[i].push(
    followDate[i], 
    followUserUniqueID[i], 
    followUserNickname[i], 
    isVerified[i]);
}

console.log(followerListArray);


/* ~ GET LIKES ~ */ 

//filter by type 41 likes
const likeObj = noticeList.filter(items => items.type === 41);
console.log('LIKES LIKES LIKES LIKES');
console.log(likeObj.map(items => items.digg.digg_type));


//const lastRowFollowersListSheet = followersListSheet.getLastRow();
//followersListSheet.getRange(lastRowFollowersListSheet + 1, 1, 20, 5).setValues(followerListArray);