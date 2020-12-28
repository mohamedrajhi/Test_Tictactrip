const express = require('express');
const jwt = require('jsonwebtoken');
const limitRequestsMiddleware = require('./middleware/ratelimiter')
const verifyToken = require('./middleware/TokenVerfier')
const MailVerifierMiddleware = require('./middleware/MailVerifier')
const app = express();
const bodyParser = require('body-parser')
// create application/json parser
const jsonParser = bodyParser.json()

app.use(bodyParser.text())
app.use(express.static("./apidoc"))
//function to justify text
function justify(text, length) {
  text = text.replace(/(\r\n\r\n)/gm, "\r ");
  text = text.replace(/(\r\n | \n)/gm, "");
  let words = text.split(" ");
  let lines = [];
  let i = 0;
  lines[i] = [];
  for (let j in words) {
    //counting the numbers of chars including the spaces in every gap
    LinesWithSpacesLength = lines[i].join(' ').length;
    WordLength = words[j].length;
    //if the word contain \r we must go to the next line even if we have not reached 80 chars
    //to ensure that the global format of the given text remain the same 
    if (words[j].includes('\r')) {
      lines[i].push(words[j]);
      i = i + 1;
      lines[i] = [];
    } else if (LinesWithSpacesLength === 0 && WordLength <= length) {
      lines[i].push(words[j]);
    } else if ((LinesWithSpacesLength + WordLength + 1) <= length) {
      lines[i].push(words[j]);
    } else {
      i = i + 1;
      lines[i] = [];
      lines[i].push(words[j]);
    }
  }
  for (let i in lines) {

    let line = lines[i].join(" ");
    let NumberOfSpaces = length - line.length;

    // last line
    if (i == lines.length - 1) {
      lines[i] = addSpaces(line, NumberOfSpaces);
    }
    // just 1 word on the line
    else if (lines[i].length == 1) {
      let line = lines[i].join("");
      NumberOfSpaces = length - word.length;
      lines[i] = addSpaces(line, NumberOfSpaces);
    } else {
      let line_i = lines[i];
      //NumberOfGaps=number_of_words_in_the_line - 1
      let NumberOfGaps = line_i.length - 1;
      //counting the number of spaces
      NumberOfSpaces = length - line_i.join("").length;
      //counting the extra spaces
      let NumberOfExtraSpaces = NumberOfSpaces % NumberOfGaps;
      //counting the number of spaces per gap
      let NumberOfSpacesPerGap = Math.floor(NumberOfSpaces / NumberOfGaps);
      line = "";
      for (let j = 0; j < line_i.length; j++) {
        let SpacesToAdd = 0;
        if (NumberOfExtraSpaces > 0) {
          SpacesToAdd = 1;
          NumberOfExtraSpaces -= 1;
        }
        let TotalSpacesPerGap = NumberOfSpacesPerGap + SpacesToAdd;
        if (j == line_i.length - 1) {
          line += line_i[j];
        } else {
          line += addSpaces(line_i[j], TotalSpacesPerGap);
        }
      }

      lines[i] = line;
    }
  }
  return lines.join("\n");
}

//add to a word a specific number of spaces
function addSpaces(word, NumberOfSpaces) {
  for (let i = 0; i < NumberOfSpaces; i++) {
    word += " ";
  }
  return word;
}

/**
 * @api {post} /api/justify Justify text
 * @apiName Justify text
 * @apiGroup API
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} text text to justify.
 * @apiSuccess {String} text justified text.
 */
//API to justify text
//Use a token of this Format
// Authorization: Bearer <access_token>
//post data  with a body's contentType text/plain
app.post('/api/justify', bodyParser.text(), limitRequestsMiddleware, verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      JustifiedText = justify(req.body, 80);
      res.send(JustifiedText)
    }
  });
});

/**
 * @api {post} /api/token obtain a token
 * @apiName Token
 * @apiGroup API
 * @apiParam {json} email user's email.
 * @apiParamExample {json} Request-Example:
 *               { "email": "foo@foo.com" }
 * @apiSuccess {json} token user's token.
 */
//API to get a token
//post a json data of this form {"email:foo@foo.co"} in order to get the token
app.post('/api/token', jsonParser, MailVerifierMiddleware, (req, res) => {
  const user = {
    email: req.body.email
  }
  jwt.sign({
    user
  }, 'secretkey', {
    expiresIn: '30000000s'
  }, (err, token) => {
    res.json({
      token
    });
  });
});




let port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server started on port', port));