var fs = require('fs');
const unzipper = require('unzipper')
var xml2js = require("xml2js");
const handleArchiver = require('./utils').handleArchiver

const docxArr = [
    '/docx/default.docx',
    '/docx/a.docx',
    '/docx/b.docx',
    '/docx/c.docx',
]
function unzipperFn() {
    // console.log(__dirname + '/docx/a.docx')
    // fs.createReadStream(__dirname + '/docx/a.docx')
    //       .pipe(unzip.Extract({ path: __dirname + '/file/1' }));
    docxArr.forEach((docxpath, index) => {
        fs.createReadStream(__dirname + docxpath)
          .pipe(unzipper.Extract({ path: __dirname + '/file/' + index }));
    })
}

function parseFn(url) {
    const xml = fs.readFileSync(url, 'utf-8');
    return xml2js.parseStringPromise(xml, { explicitArray: true, explicitRoot: true })
}

async function mergeDocx() {
    const basePath = __dirname + '/file/0/word/document.xml';
    const dPath1 = __dirname + '/file/1/word/document.xml';
    const dPath2 = __dirname + '/file/2/word/document.xml';
    const dPath3 = __dirname + '/file/3/word/document.xml';
    // const data = await parseFn(basePath)
    // console.log(JSON.stringify(data));
    // console.log(data["w:document"]["w:body"])
    // var parser = new xml2js.Parser();
    // fs.readFile(dPath1, 'utf8', (err, data) => {
    //     if (err) throw err;
    //     parser.parseString(data, (err, result) => {
    //         if (err) throw err;
    //         console.log('result', result["w:document"]["w:body"]);
    //     });
    // });
    // var xml = "<root>Hello xml2js!</root>"
    const baseXml = fs.readFileSync(basePath, 'utf-8');
    xml2js.parseString(baseXml, { explicitArray: true, explicitRoot: true }, async function (err, result) {
        const body = result["w:document"]["w:body"];
        // const data1 = await parseFn(dPath1);
        const data2 = await parseFn(dPath2);
        // const data3 = await parseFn(dPath3);
        console.log(JSON.stringify(result["w:document"]["w:body"]))
        console.log(JSON.stringify(data2["w:document"]["w:body"]))
        // body.push(...data1["w:document"]["w:body"]);
        body.push(...data2["w:document"]["w:body"]);
        // body.push(...data3["w:document"]["w:body"]);
        // body['w:p'].push(...data1["w:document"]["w:body"][0]['w:p']);
        // if (!body['w:sdt']) body['w:sdt'] = []
        // body['w:sdt'].push(...data1["w:document"]["w:body"][0]['w:sdt']);
        // body['w:sectPr'].push(...data1["w:document"]["w:body"][0]['w:sectPr']);
        // console.log(JSON.stringify(data1["w:document"]["w:body"]));
        var builder = new xml2js.Builder({
            renderOpts: { pretty: false, indent: " ", newline: "" }
        });
        var xmlTest = builder.buildObject({...data2});
        // console.log(basePath, xmlTest)
        // fs.writeFile(basePath, xmlTest, function(err) {
        //     if (err) {
        //         console.log('error')
        //         return console.error(err);
        //     }
        //     console.log("数据写入成功！");
        //     handleArchiver(__dirname+'/output.docx', __dirname+'/file/0')
        // });
        handleArchiver(__dirname+'/output.docx', __dirname+'/file/0')

    });
}

function init() {
    // unzipperFn();
    mergeDocx();
}
init();