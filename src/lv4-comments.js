const fs = require('fs');
const data = fs.readFileSync('../test/lv4-comment-a.json', 'utf-8');

//parse JSON string to JSON object
const bodyJSON = JSON.parse(data);

const urlString = "https://www.tiktok.com/@lv4official/video/"

const commentObj = bodyJSON.comments.map(items => items);
//console.log(bodyJSON.extra.now);

const commentText = commentObj.map(items => items.text);
// console.log(commentText);

const replyCommentObj = commentObj
                            .filter(items => items.reply_comment !== null)
                            .map(items => items.reply_comment);
//console.log(replyCommentObj);

const replyCommentText = replyCommentObj.map(items => items[0].text);
//console.log(replyCommentText);

const commentUserUniqueID = commentObj.map(items => items.user.unique_id);
// console.log(commentUserUniqueID);

const commentUserNickname = commentObj.map(items => items.user.nickname);
// console.log(commentUserNickname);

const commentMediaID = commentObj.map(items => urlString + items.aweme_id);
// console.log(commentMediaID);

const commentID = commentObj.map(items => items.cid);
// console.log(commentID);

const replies = commentObj.map(items => items.reply_comment_total);
// console.log(replies);

const id_replies = commentObj
                        .filter(items => items.reply_comment_total > 0)
                        .map(items => items.cid);
console.log(id_replies);

const commentDate = commentObj.map(items => { 
                    var epochTime = items.create_time;
                    epochConvert = new Date(epochTime * 1000);
                    creationDate = epochConvert.toLocaleDateString();
                return creationDate;
                });
// console.log(commentDate);

const pullDate = new Date(bodyJSON.extra.now).toLocaleDateString();
//console.log(pullDate);

/* create array of arrays in the format:
[
    [ '10/20/2021', 'glitchboiuno', 'glitchboiuno', 'No' ],
    [ '10/20/2021', 'marion1_2', 'Marion1_2', 'No' ],
    ...
]  */

var commentListArray = new Array();
for (let i = 0; i < commentObj.length; i++) {
    //initialize Array order[i]
    commentListArray[i] = new Array();
    //add elements
    commentListArray[i].push(
    pullDate,
    commentDate[i],
    commentText[i], 
    commentUserUniqueID[i], 
    commentUserNickname[i],
    commentID[i],
    replies[i],
    commentMediaID[i]);
}
//console.log(commentListArray);