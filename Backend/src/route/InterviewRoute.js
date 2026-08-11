const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const interviewController = require("../controllers/InterviewReportController")
const upload = require("../middlewares/FileMiddleware")

const interviewRouter = express.Router()

interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)

interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportController);

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportController);

interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)

module.exports = interviewRouter;