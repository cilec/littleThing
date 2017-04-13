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
        doc.getElementById('time').textContent = new Date().toLocaleDateString();
        doc.getElementById('toWho').textContent = "涂涂";
        doc.getElementById('type').textContent = "服务";
        doc.getElementById('content').textContent = "摔了一跤";
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
