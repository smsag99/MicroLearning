const SData = require("simple-data-storage");
const axios = require("axios");
const { ApiError } = require("../api/middlewares/errorHandling.middleware");

const min = 1000;
const max = 9999;

function getRandomInt() {
  return Math.floor(Math.random() * max) + min;
}
async function sendSMS(code, number) {
  axios
    .get(
      `https://api.kavenegar.com/v1/627269524D4A464252476F584B6264684A4D6B6A57387654343461645A713644344C7348674A67567943513D/verify/lookup.json?receptor=${number}&token=${code}&template=MicroLearning`
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      throw new ApiError(500, "kaveh negar error");
    });
}

async function saveCodeInDB(code, number) {
  await SData(number, { code, time: Date.now() });
}
async function generateNewCodeForThisNumber(number) {
  const code = getRandomInt();
  await saveCodeInDB(code, number);
  await sendSMS(code, number);
}
async function CheckIfCorrect(code, number) {
  try {
    console.log(code);
    const savedCode = await SData(number);
    console.log("test");
    if (Date.now() - savedCode.time <= 120000) {
      console.log("test2");
      console.log("saved code", savedCode.code);

      if (savedCode.code === Number(code)) {
        console.log("saved code", savedCode.code);
        SData.clear(number);
        return true;  
      }
      return false;
    }
  } catch (err) {
    return false;
  }
}
module.exports = { generateNewCodeForThisNumber, CheckIfCorrect };
