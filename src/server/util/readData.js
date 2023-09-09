const fs = require('fs');
function readData(address) {
  const data = fs.readFileSync(address, 'utf-8');
  return data;
}
module.exports = readData;
