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
  const head1 = await createPage("概述");
  var file1 = fs.readFileSync(
    path.resolve(__dirname, "docx/d1.docx"),
    "binary"
  );
  const head2 = await createPage("技术规格要求");
  var file2 = fs.readFileSync(
    path.resolve(__dirname, "docx/d2.docx"),
    "binary"
  );
  const head3 = await createPage("售后技术服务");
  var file3 = fs.readFileSync(
    path.resolve(__dirname, "docx/d9.docx"),
    "binary"
  );
  const head4 = await createPage("项目执行要求");
  var file4 = fs.readFileSync(
    path.resolve(__dirname, "docx/d6.docx"),
    "binary"
  );
  var docx = new DocxMerger({ pageBreak: false }, [
    head1,
    file1,
    head2,
    file2,
    head3,
    file3,
    head4,
    file4,
  ]);

  //SAVING THE DOCX FILE
  // TODO: 处理模板文件合并时，部分无序列表样式失效问题
  // FIXME: 处理模板文件合并时，标题样式非原模板文件样式

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
