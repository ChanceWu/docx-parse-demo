var DocxMerger = require("docx-merger");

var fs = require("fs");
var path = require("path");

var file1 = fs.readFileSync(path.resolve(__dirname, "docx/a.docx"), "binary");

var file2 = fs.readFileSync(path.resolve(__dirname, "docx/b.docx"), "binary");

var file3 = fs.readFileSync(path.resolve(__dirname, "docx/c.docx"), "binary");

var docx = new DocxMerger({ pageBreak: false }, [file1, file2, file3]);

//SAVING THE DOCX FILE

docx.save("nodebuffer", function (data) {
  console.log(data);
  // fs.writeFile("output.zip", data, function(err){/*...*/});
  fs.writeFile(path.resolve(__dirname, "output.docx"), data, function (err) {
    /*...*/
    if (err) throw new Error(err);
  });
});
