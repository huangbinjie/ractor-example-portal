const fs = require('fs');

function fromJSONFile(filename) {
  return (req, res) => {
      const data = fs.readFileSync(`mock/data/${filename}.json`).toString();
      const json = JSON.parse(data);
      return res.json(json);
  };
}
const baseUrl = '/system-configuration/v1';
const proxy = {
  'GET /app/test': fromJSONFile('test'),
  'POST /api/login/account': fromJSONFile('profile'),
  'DELETE /api/user/:id': fromJSONFile('profile'),
  'GET /system-configuration/v1/widget/list': fromJSONFile('widgets'),
  'POST /system-configuration/v1/widget/list': fromJSONFile('widgets'),
  'GET /system-configuration/v1/corporation': fromJSONFile('identify'),
};


module.exports = proxy;