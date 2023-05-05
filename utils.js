var fs = require('fs');
var archiver = require('archiver');

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
  handleArchiver
}