import db from "../models";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const handleUpdateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          error_code: 1,
          message: "Missing required param",
        });
        return;
      }
      const user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.phoneNumber = data.phoneNumber;
        user.address = data.address;
        user.gender = data.gender === "1" ? true : false;
        user.roleId = data.roleId;
        user.image = data.image;

        await user.save();
        resolve({
          error_code: 0,
          message: "Success",
        });
      } else {
        resolve({
          error_code: 2,
          message: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleCreateNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password) {
        resolve({
          error_code: 1,
          message: "Missing required param",
        });
        return;
      }
      const checkMail = await handleCheckMail(data.email);
      if (checkMail) {
        resolve({
          error_code: 1,
          message: "Email isn't exist",
        });
      } else {
        const hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
        });
        resolve({
          error_code: 0,
          message: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const handleDataLogin = (userEmail, userPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let user = await handleCheckMail(userEmail);
      if (user) {
        const checkPass = await bcrypt.compareSync(userPassword, user.password);
        if (checkPass) {
          userData.error_code = 0;
          userData.message = "Success";
          userData.data = user;
        } else {
          userData.error_code = 2;
          userData.message = "Password wrong!";
        }
      } else {
        userData.error_code = 2;
        userData.message = "Email not found!";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

const handleCheckMail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
        raw: true,
      });

      if (user) {
        resolve(user);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleGetUser = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users;
      if (idUser == "all") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (idUser != "all" && idUser) {
        users = await db.User.findOne({
          where: { id: idUser },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleDataLogin,
  handleGetUser,
  handleCreateNewUser,
  handleUpdateUser,
};
