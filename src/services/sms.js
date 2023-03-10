const { Level } = require("level");
const Kavenegar = require("kavenegar");
const axios = require("axios");
const db = new Level("example", { valueEncoding: "json" });
const min = 1000,
  max = 9999;

function getRandomInt() {
  return Math.floor(Math.random() * max) + min;
}
async function sendSMS(code, number) {
  axios
    .get(
      "https://api.kavenegar.com/v1/627269524D4A464252476F584B6264684A4D6B6A57387654343461645A713644344C7348674A67567943513D/verify/lookup.json?receptor=" +
        number +
        "&token=" +
        code +
        "&template=MicroLearning"
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function saveCodeInDB(code, number) {
  await db.put(number, code);
}
async function generateNewCodeForThisNumber(number) {
  const code = getRandomInt();
  await saveCodeInDB(code, number);
  await sendSMS(code, number);
}
async function CheckIfCorrect(code, number) {
  if ((await db.get(number)) == code) {
    saveCodeInDB("", number);
    return true;
  } else {
    return false;
  }
}
module.exports = { generateNewCodeForThisNumber, CheckIfCorrect };
