const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer=require('puppeteer')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `You are an experienced Senior Technical Recruiter, Hiring Manager and Software Engineering Interview Coach.

                    Analyze the candidate's resume, self-description and the job description very carefully.

                    Generate a complete interview preparation report.

                    Instructions:

                    1. Calculate a realistic ATS/job match score between 0-100.

                    2. Generate exactly 6 technical interview questions.
                    Each question should:
                    - be directly related to the job description
                    - increase gradually in difficulty
                    - include:
                        - question
                        - interviewer's intention
                        - a detailed sample answer

                    3. Generate exactly 5 behavioral interview questions.
                    Use STAR methodology while writing the sample answer.

                    4. Identify 5 important skill gaps.
                    Assign severity:
                    low
                    medium
                    high

                    5. Generate a complete 7-day preparation plan.
                    Each day should contain:
                    - focus topic
                    - at least 3 actionable tasks

                    6. Never return empty arrays.

                    7. Every field in the JSON must be populated.

                    8. Return ONLY valid JSON matching the provided schema.

                    Candidate Resume:

                    ${resume}

                    Candidate Self Description:

                    ${selfDescription}

                    Job Description:

                    ${jobDescription}
                    `

    // const response = await ai.models.generateContent({
    //     model: "gemini-3-flash-preview",
    //     contents: prompt,
    //     config: {
    //         temperature: 0.3,
    //         topP: 0.9,
    //         topK: 40,
    //         responseMimeType: "application/json",
    //         responseSchema: schema,
    //     }
    // });
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            temperature: 0.3,
            topP: 0.9,
            topK: 40,
    
            responseMimeType: "application/json",
    
            //We made schema inside the gemin ai model so ai wan't be confused and give proper output
            responseSchema: {
                type: "OBJECT",
    
                properties: {
                    matchScore: {
                        type: "NUMBER",
                        description: "Match score between 0 and 100."
                    },

                    title:{
                        type:"STRING",
                        description:"The title of the job for which interview report is generated"
                    },
    
                    technicalQuestions: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                question: {
                                    type: "STRING"
                                },
                                intention: {
                                    type: "STRING"
                                },
                                answer: {
                                    type: "STRING"
                                }
                            },
                            required: [
                                "question",
                                "intention",
                                "answer"
                            ]
                        }
                    },
    
                    behavioralQuestions: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                question: {
                                    type: "STRING"
                                },
                                intention: {
                                    type: "STRING"
                                },
                                answer: {
                                    type: "STRING"
                                }
                            },
                            required: [
                                "question",
                                "intention",
                                "answer"
                            ]
                        }
                    },
    
                    skillGaps: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                skill: {
                                    type: "STRING"
                                },
                                severity: {
                                    type: "STRING",
                                    enum: [
                                        "low",
                                        "medium",
                                        "high"
                                    ]
                                }
                            },
                            required: [
                                "skill",
                                "severity"
                            ]
                        }
                    },
    
                    preparationPlan: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                day: {
                                    type: "INTEGER"
                                },
                                focus: {
                                    type: "STRING"
                                },
                                tasks: {
                                    type: "ARRAY",
                                    items: {
                                        type: "STRING"
                                    }
                                }
                            },
                            required: [
                                "day",
                                "focus",
                                "tasks"
                            ]
                        }
                    }
                },
    
                required: [
                    "matchScore",
                    "title",
                    "technicalQuestions",
                    "behavioralQuestions",
                    "skillGaps",
                    "preparationPlan"
                ]
            }
        }
    });

    return JSON.parse(response.text)
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true
    });

    try {
        const page = await browser.newPage();

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        });

        await page.emulateMediaType("print");

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: "12mm",
                bottom: "12mm",
                left: "14mm",
                right: "14mm"
            }
        });

        return pdfBuffer;

    } finally {
        await browser.close();
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type:"OBJECT",
                properties:{
                    html:{
                        type:"STRING",
                        description:"The HTML content of the resume which can be converted to PDF using any library like puppeteer"
                    }
                }
            }
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = {generateInterviewReport,generateResumePdf};