const express = require("express")
const authRouter = require("./authRouter")
const taskRouter = require("./taskRouter")
const userRouter = require("./userRouter")

const mainRouter = express.Router()

mainRouter.use("/auth",authRouter)
mainRouter.use("/tasks",taskRouter)
mainRouter.use("/users",userRouter)

module.exports = mainRouter