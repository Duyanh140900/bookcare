import { handleDataLogin } from '../services/userServices'

const handleLoginUser = async (req, res) => {
    const { email, password } = req.body
    console.log("handleLoginUser", email, password);
    if (!email || !password) {
        return res.status(500).json({
            error_code: 1,
            message: "Missing value!"
        })
    } else {
        let userData = await handleDataLogin(email, password)

        return res.status(200).json({
            error_code: userData.error_code,
            message: userData.message
        })
    }
}

module.exports = {
    handleLoginUser
}