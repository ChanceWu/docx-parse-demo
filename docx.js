const {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} = require("docx");
const fs = require("fs");
var path = require("path");
var DocxMerger = require("docx-merger");

function createPage(text) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: text,
            heading: HeadingLevel.HEADING_1,
          }),
        ],
      },
    ],
  });
  return Packer.toBuffer(doc);
}

async function init() {
  const head1 = await createPage("文件一");
  var file1 = fs.readFileSync(path.resolve(__dirname, "docx/a.docx"), "binary");
  const head2 = await createPage("文件二");
  var file2 = fs.readFileSync(path.resolve(__dirname, "docx/b.docx"), "binary");
  const head3 = await createPage("文件三");
  var file3 = fs.readFileSync(path.resolve(__dirname, "docx/c.docx"), "binary");
  var docx = new DocxMerger({ pageBreak: false }, [
    head1,
    file1,
    head2,
    file2,
    head3,
    file3,
  ]);

  //SAVING THE DOCX FILE

  docx.save("nodebuffer", function (data) {
    console.log(data);
    // fs.writeFile("output.zip", data, function(err){/*...*/});
    fs.writeFile(path.resolve(__dirname, "output.docx"), data, function (err) {
      /*...*/
      if (err) throw new Error(err);
    });
  });
}

init();
