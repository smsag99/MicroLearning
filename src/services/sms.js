const SData = require("simple-data-storage");
const Kavenegar = require("kavenegar");
const axios = require("axios");
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
      //console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function saveCodeInDB(code, number) {
  await SData(number, { code: code, time: Date.now() });
}
async function generateNewCodeForThisNumber(number) {
  const code = getRandomInt();
  await saveCodeInDB(code, number);
  await sendSMS(code, number);
}
async function CheckIfCorrect(code, number) {
  try {
    const savedCode = await SData(number);
    if (Date.now() - savedCode.time <= 120000)
      if (savedCode.code == code) {
        SData.clear(number);
        return true;
      } else {
        return false;
      }
  } catch (err) {
    return false;
  }
}
module.exports = { generateNewCodeForThisNumber, CheckIfCorrect };
