var builder = require("docx-builder");
var docx = new builder.Document();

//You can also do this asynchronously using the insertDocx method.
docx.insertDocxSync(__dirname + "/docx/default.docx");
// docx.insertDocxSync(__dirname + "/docx/a.docx");
docx.insertDocxSync(__dirname + "/docx/b.docx");

//SAVING THE DOCX FILE

docx.save(__dirname + "/output.docx", function (err) {
  if (err) console.log(err);
});
