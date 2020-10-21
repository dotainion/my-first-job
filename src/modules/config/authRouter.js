const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { getData, compareAndQueryData, addData, updateData, removeData } = require("./dbConfig");


export const login = async (email, password) => {
  //Remove Expired Tokens from DB
  console.log("start login proccess")
  try {
    const previousTokens = await getData("invalidTokens");
    let oldDate;
    for (let i = 0; i < previousTokens.length; i++) {
      oldDate = new Date(previousTokens[i].info.date);
      oldDate = oldDate.setDate(oldDate.getDate() + 1);
      let newDate = Date.now();
      if (oldDate < newDate) {
        await removeData("invalidTokens", previousTokens[i].id);
      }
    }
  } catch (err) {}

  //Check if user is in DataBase
  const user = await compareAndQueryData("users", "email", email);
  if (user.length < 1) return { message: "Invalid Email" };

  //Check for valid password
  const validPassword = await bcrypt.compare(password, user[0].info.password);
  if (!validPassword) return  { message: "Invalid Password" };

  //If everything is valid Create and assign a token. Token Expires in 12 hours
  const accessToken = jwt.sign(
    { id: user[0].id, type: user[0].info.type, status: user[0].info.status },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "6000s", //"43200s 12 hours",
    }
  );
  return res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "strict" }).redirect("/dashboard");

  //Save accessToken to Client's Browser Cookie and Redirect to Dashboard
  //res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "strict" }).redirect("/dashboard");
};

