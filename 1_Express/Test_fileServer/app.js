const express = require('express');
const fs = require('fs'); // built in node.js module use to read files and folders
const path = require('path'); // helps safely build file path

const app = express();
const filesDir = path.join(__dirname, 'files');/*__dirname = current folder where this JS file exists
                                               'files' = folder that contains text files*/

/**
 * GET /files
 * Returns list of files in ./files directory
 * Returns list of files in ./files directory
 */
app.get('/files', (req, res) => {
  fs.readdir(filesDir, (err, files) => {  //Reads all file names inside filesDir
    if (err) {
      return res.status(500).send('Error reading files');
    }

    res.status(200).json(files);
  });
});

/**
 * GET /file/:filename
 * Returns content of the given file
 */
app.get('/files/:filename', (req, res) => {
  const filename = req.params.filename;  //Extracts filename from URL
  const filePath = path.join(filesDir, filename);//Creates full path to file

  fs.readFile(filePath, 'utf-8', (err, data) => {//Reads file content
    if (err) {
      return res.status(404).send('File not found');
    }
    res.status(200).send(data);
  });
});

/**
 * Handle all other routes
 */
app.use((req, res) => {//Handles all undefined routes , Runs only if no route matched above
  res.status(404).send('Not Found');
});

module.exports = app;
/*Why we write this?

Exports app for:

Testing (Supertest / Jest)

External server file (app.listen() elsewhere)

📌 Very important:

We do NOT start server here

Tests control server lifecycle
*/
