var fs = require('fs');
var archiver = require('archiver');
const unzipper = require('unzipper')

const docxArr = [
  '/docx/default.docx',
  '/docx/a.docx',
  '/docx/b.docx',
  '/docx/c.docx',
]
/**
 * 将docx文件解压缩为文件夹
 * @returns Promise<boolean>
 */
function unzipperFn() {
  return new Promise((resolve, reject) => {
      let count = 0;
      docxArr.forEach((docxpath, index) => {
          const readStream = fs.createReadStream(__dirname + docxpath);
          readStream.pipe(unzipper.Extract({ path: __dirname + '/file/' + index }));
          readStream.on('end', () => {
              count++;
              if (count === 4) {
                  resolve()
              }
          });
      })
  })
}

/**
 * 将docx文件夹重新打包生成docx文件
 * @param {string} outputPath 
 * @param {string} dataPath 
 */
const handleArchiver = (outputPath, dataPath) => {
    var output = fs.createWriteStream(outputPath);
    var archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    
    
    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    
    output.on('end', function() {
      console.log('Data has been drained');
    });
    
    
    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        throw err;
      }
    });
    
    archive.on('error', function(err) {
      throw err;
    });
    
    archive.pipe(output);
    
    archive.directory(dataPath, false);
    
    archive.finalize();
}


module.exports = {
  unzipperFn,
  handleArchiver
}