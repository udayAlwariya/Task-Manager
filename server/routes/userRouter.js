const express = require("express")
const { allUsers, updateUserRole, deleteUser } = require("../controllers/userController")
const auth = require("../middleware/auth")
const userRouter = express.Router()

userRouter.get("/all",auth,allUsers)
userRouter.patch("/:id/role", auth, updateUserRole)
userRouter.delete("/:id", auth, deleteUser)

module.exports = userRouter