var async = require('async');
var officegen = require('officegen');

var fs = require('fs');
var path = require('path');
var docx = officegen({
    type: 'docx',
    orientation: 'portrait'
    // The theme support is NOT working yet...
    // themeXml: themeXml
});
docx.on('error', function (err) {
    console.log(err);
});
var table = [
    [{
        val: "No.",
        opts: {
            cellColWidth: 4261,
            b: false,
            sz: '48',
            // shd: {
            //     // fill: "7F7F7F",//背景填充
            //     themeFill: "text1",//
            //     "themeFillTint": "80"
            // },
            fontFamily: "Avenir Book"
        }
    }, {
        val: "Title1",
        opts: {
            b: true,
            color: "A00000",
              vAlign: "center",
            align: "center",
            // shd: {
            //     // fill: "92CDDC",
            //     themeFill: "text1",
            //     "themeFillTint": "80"
            // }
        }
    }, {
        val: "Title2",
        opts: {
            align: "center",
            vAlign: "center",
            cellColWidth: 42,
            b: true,
            sz: '48',
            // shd: {
            //     fill: "92CDDC",
            //     themeFill: "text1",
            //     "themeFillTint": "80"
            // }
        }
    }],
    [1, 'ccccc', ''],
    [2, 'there is no harm in putting off a piece of work until another day.', ''],
    [3, 'But when it is a matter of baobabs, that always means a catastrophe.', ''],
    [4, 'watch out for the baobabs!', 'END'],
]

var tableStyle = {
    tableColWidth: 4261,
    tableSize: 24,
    tableColor: "ada",
    tableAlign: "center",
    tableFontFamily: "Microsoft Yahei",
    borders: true
}

docx.createTable(table, tableStyle);
var out = fs.createWriteStream('tmp/out.docx');

out.on('error', function (err) {
    console.log(err);
});
async.parallel([
    function (done) {
        out.on('close', function () {
            console.log('Finish to create a DOCX file.');
            done(null);
        });
        docx.generate(out);
    }

], function (err) {
    if (err) {
        console.log('error: ' + err);
    } // Endif.
});