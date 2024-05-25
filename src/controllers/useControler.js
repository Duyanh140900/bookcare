import {
  handleDataLogin,
  handleGetUser,
  handleCreateNewUser,
  handleUpdateUser,
} from "../services/userServices";

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("handleLoginUser", req.body);
  if (!email || !password) {
    return res.status(500).json({
      error_code: 1,
      message: "Missing value!",
    });
  } else {
    let userData = await handleDataLogin(email, password);

    return res.status(200).json({
      error_code: userData.error_code,
      message: userData.message,
      data: { email: userData.data.email, roleId: userData.data.roleId },
    });
  }
};

const getUser = async (req, res) => {
  console.log("getUser", req);
  const id = req.query.id;
  if (!id) {
    return res.status(200).json({
      error_code: 1,
      message: "Missing value!",
    });
  }

  let users = await handleGetUser(id);
  return res.status(200).json({
    error_code: 0,
    message: "ok",
    data: users,
  });
};

const createUser = async (req, res) => {
  let message = await handleCreateNewUser(req.body);
  return res.status(200).json(message);
};

const updateUser = async (req, res) => {
  let message = await handleUpdateUser(req.body);
  return res.status(200).json(message);
};

module.exports = {
  handleLoginUser,
  getUser,
  createUser,
  updateUser,
};
