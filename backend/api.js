const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const api = express.Router();

app.use(bodyParser.json());

api.post('/CreateAccount/:base64_str', (req, res) => {
  const emailPasswordStr = atob(req.params.base64_str).toString('utf-8');
  const [email, password] = emailPasswordStr.split(':');

  fs.readFile('account.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const accounts = JSON.parse(data);
    accounts[email] = password;

    fs.writeFile('account.json', JSON.stringify(accounts), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      return res.status(201).json({ message: `Account for ${email} created successfully` });
    });
  });
});

api.get('/Login/:base64_str', (req, res) => {
  const emailPasswordStr = atob(req.params.base64_str).toString('utf-8');
  const [email, password] = emailPasswordStr.split(':');

    fs.readFile('account.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const accounts = JSON.parse(data);
    if (!(email in accounts)) {
      return res.status(404).json({ message: `Account for ${email} does not exist` });
    }

    if (accounts[email] === password) {
      return res.status(200).json({ message: 'SUCCESS' });
    } else {
      return res.status(401).json({ message: 'FAILURE' });
    }
  });
});

app.use('/', api);

app.listen(6263, () => {
    console.log('[!] Backend API server started on 127.0.0.1:6263');
});