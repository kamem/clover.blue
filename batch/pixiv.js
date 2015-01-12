/// <reference path="../typings/tsd.d.ts" />
var request = require('request');
var apiToDatabase = require('./apiToDatabase');
var API_URI = 'http://spapi.pixiv.net/iphone/member_illust.php';
var USER_ID = 112090;
var dbItems = new apiToDatabase.Items('pixiv');
var SaveApi = (function () {
    function SaveApi() {
        request.get(API_URI + '?id=' + USER_ID, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var res = body.split(',');
                var it = [];
                res.forEach(function (item, i) {
                    if (!!item && item !== '' && item !== "0") {
                        it.push(item);
                    }
                    ;
                });
                var items = [];
                var itemNum = 0;
                it.forEach(function (item, i) {
                    if (item.indexOf('\n') >= 0)
                        itemNum++;
                    if (!items[itemNum])
                        items[itemNum] = [];
                    items[itemNum].push(item.replace('\n', '').replace(/\"/g, ''));
                });
                items.pop();
                var pixivs = [];
                items.forEach(function (item, i) {
                    pixivs[i] = {};
                    pixivs[i].uuid = item[0];
                    pixivs[i].updated = item[8];
                    pixivs[i].title = item[14];
                    pixivs[i].img = item[7];
                    pixivs[i].tags = item[9].split(' ');
                    pixivs[i].thumbnail = item[6];
                });
                dbItems.saveDatabase(pixivs, {
                    uuid: 'uuid',
                    updated: 'updated',
                    title: 'title',
                    img: 'img',
                    tags: 'tags',
                    thumbnail: 'thumbnail'
                });
                console.log('complate!');
            }
            else {
                console.log(error);
            }
        });
    }
    return SaveApi;
})();
exports.SaveApi = SaveApi;
var save = new SaveApi();
