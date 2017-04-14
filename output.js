'user strict'
const fs = require('fs');
const path = require('path');
const DOMParser = require('xmldom').DOMParser;
function output({ content, donetime, forWho, name, type }) {
    let output;
    fs.readFile(path.join(__dirname, 'template.xml'), 'utf-8', (err, data) => {
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
            fs.writeFile(`${fileDate.getMonth() + 1}.${fileDate.getDate()}.${fileDate.getTime()}(${name}).xml`, doc, (err) => {
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

module.exports = { output }