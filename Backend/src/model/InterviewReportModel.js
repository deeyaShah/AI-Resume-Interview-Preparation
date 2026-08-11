const mongoose = require("mongoose");

// Technical Question Schema
const technicalQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "Technical question is required"],
            trim: true
        },

        intention: {
            type: String,
            required: [true, "Technical question intention is required"],
            trim: true
        },

        answer: {
            type: String,
            required: [true, "Technical sample answer is required"],
            trim: true
        }
    },
    {
        _id: false
    }
);


// Behavioral Question Schema
const behavioralQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "Behavioral question is required"],
            trim: true
        },

        intention: {
            type: String,
            required: [true, "Behavioral question intention is required"],
            trim: true
        },

        answer: {
            type: String,
            required: [true, "Behavioral sample answer is required"],
            trim: true
        }
    },
    {
        _id: false
    }
);


// Skill Gap Schema
const skillGapSchema = new mongoose.Schema(
    {
        skill: {
            type: String,
            required: [true, "Skill is required"],
            trim: true
        },

        severity: {
            type: String,
            enum: ["low", "medium", "high"],
            required: [true, "Severity is required"]
        }
    },
    {
        _id: false
    }
);


// Preparation Plan Schema
const preparationPlanSchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: [true, "Day is required"],
            min: 1
        },

        focus: {
            type: String,
            required: [true, "Focus is required"],
            trim: true
        },

        tasks: {
            type: [String],
            required: [true, "Tasks are required"],
            validate: {
                validator: function (tasks) {
                    return tasks.length > 0;
                },
                message: "At least one task is required"
            }
        }
    },
    {
        _id: false
    }
);


// Main Interview Report Schema
const interviewReportSchema = new mongoose.Schema(
    {
        jobDescription: {
            type: String,
            required: [true, "Job description is required"],
            trim: true
        },

        resume: {
            type: String,
            required: [true, "Resume is required"]
        },

        selfDescription: {
            type: String,
            required: [true, "Self description is required"],
            trim: true
        },

        matchScore: {
                    type: Number,
                    min: 0,
                    max: 100,
                },

        technicalQuestions: {
            type: [technicalQuestionSchema],
            default: []
        },

        behavioralQuestions: {
            type: [behavioralQuestionSchema],
            default: []
        },

        skillGaps: {
            type: [skillGapSchema],
            default: []
        },

        preparationPlan: {
            type: [preparationPlanSchema],
            default: []
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },

        title:{
            type:String,
            required:[true,"Job title is required"]
        }
    },
    {
        timestamps: true
    }
);


const interviewReportModel = mongoose.model(
    "InterviewReport",
    interviewReportSchema
);

module.exports = interviewReportModel;