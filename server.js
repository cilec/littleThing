'user strict'
const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
fs.readFile('template.xml', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        // console.log(data);
        let doc = new DOMParser().parseFromString(data, 'text/xml');
        doc.getElementById('name').textContent = "cc";
        doc.getElementById('name').textContent = "陈诚";
        doc.getElementById('time').textContent = "2017-4-14";
        doc.getElementById('toWho').textContent = "涂涂";
        doc.getElementById('type').textContent = "服务";
        let teststr = ``;
        for (let i = 0; i < 300; i++) {
            teststr += "测试";
        }
        doc.getElementById('content').textContent = teststr;
        fs.writeFile('output.xml', doc, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('ok.');
            }
        })
        // console.log(doc.getElementById('title').textContent);
    }
});
