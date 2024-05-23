import db from "../models"
import bcrypt from "bcryptjs";

const handleDataLogin = (userEmail, userPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let user = await handleCheckMail(userEmail)
            if (user) {
                const checkPass = await bcrypt.compareSync(userPassword, user.password);
                if (checkPass) {
                    userData.error_code = 0
                    userData.message = "Success"
                } else {
                    userData.error_code = 2
                    userData.message = "Password wrong!"
                }
            } else {
                userData.error_code = 2
                userData.message = "Email not found!"
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

const handleCheckMail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
                raw: true,
            })

            if (user) {
                resolve(user)
            } else {
                resolve()
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleDataLogin
}