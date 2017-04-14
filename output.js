'user strict'
const fs = require('fs');
const path = require('path');
const DOMParser = require('xmldom').DOMParser;
function output(content, donetime, forWho, name, type) {
    switch (type) {
        case '1':
            type = '服务';
            break;
        case '2':
            type = '民生';
            break;
        case '3':
            type = '发展';
            break;
        case '4':
            type = '环境';
            break;
        case '5':
            type = '管理';
            break;
        default:
            break;
    }

    // let data = fs.readFileSync(path.join(__dirname, 'template.xml'), 'utf-8');
    // let doc = new DOMParser().parseFromString(data, 'text/xml');
    // doc.getElementById('name').textContent = name;
    // doc.getElementById('time').textContent = donetime;
    // doc.getElementById('toWho').textContent = forWho;
    // doc.getElementById('type').textContent = type;
    // doc.getElementById('content').textContent = content;
    // let fileDate = new Date();
    // fs.writeFileSync(path.join(__dirname, `${fileDate.getMonth() + 1}月${fileDate.getDate()}日${fileDate.getHours()}:${fileDate.getMinutes()}(${name}).xml`), doc);


    fs.readFile(path.join(__dirname, 'template.xml'), 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            // console.log(data);
            let doc = new DOMParser().parseFromString(data, 'text/xml');
            doc.getElementById('name').textContent = name;
            doc.getElementById('time').textContent = donetime;
            doc.getElementById('toWho').textContent = forWho;
            doc.getElementById('type').textContent = type;
            doc.getElementById('content').textContent = content;
            let fileDate = new Date();
            fs.writeFile(path.join(__dirname,`(${formatTime(fileDate)})${name}.xml`), doc, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('ok.');
                }
            })
            // console.log(doc.getElementById('title').textContent);
        }
    });

}
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
module.exports = { output }