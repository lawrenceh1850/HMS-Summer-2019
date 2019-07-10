const https = require("https");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const xml2js = require("xml2js");

const BASE_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?";

const queryObj = {
  db: "pubmed",
  term: "'focal cortical dysplasia' immunotherapy"
};

https
  .get(BASE_URL.concat(querystring.stringify(queryObj)), res => {
    let responseString = "";

    res.on("data", chunk => {
      responseString = responseString.concat(chunk);
    });

    res.on("end", () => {
      console.log(
        `\nDONE RECEIVING: responseString is ${
          responseString.length
        } chars long`
      );

      xml2js.parseString(responseString, function(err, parsed) {
        if (err) {
          return console.error(err);
        }

        fs.writeFile(path.join(__dirname, "parsed.json"), parsed, function(
          err
        ) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        });
      });
    });
  })
  .on("error", err => {
    console.error(err);
  });
