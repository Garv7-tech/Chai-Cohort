import axios from 'axios'

// Returns the Judge0 language ID corresponding to the given language name
export const getJudge0LanguageId = (language) => {
    const languageMap = {
        "PYTHON": 71,
        "JAVA": 62,
        "JAVASCRIPT": 63,
    }

    // Convert language name to uppercase for consistent mapping
    return languageMap[language.toUpperCase()]
}

// Utility function to pause execution for given milliseconds (used for polling)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Polls Judge0 API repeatedly until all submissions are done processing
export const pollBatchResults = async (tokens) => {
    while (true) {
        // Make a GET request to fetch batch results from Judge0 API
        const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
            params: {
                tokens: tokens.join(","),   // Join tokens into a comma-separated string
                base64_encoded: false       // Set to false to get plain text output
            }
        })

        // Extract the results array from the response
        const results = data.submissions

        // Check if all submissions have finished (i.e., not in status 1 or 2)
        const isAllDone = results.every(
            (r) => r.status.id !== 1 && r.status.id !== 2
        )

        // If all submissions are complete, return the results
        if (isAllDone) return results

        // Otherwise, wait for 1 second and poll again
        await sleep(1000)
    }
}

// Submits multiple code snippets to Judge0 API and returns their tokens
export const submitBatch = async(submissions) => {
    // Post submissions to Judge0 and get response with tokens
    const data = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, { submissions })

    console.log("Submissions Results : ", data)
    return data // Response contains an array of tokens
}

// Converts Judge0 language ID back to human-readable language name
export function getLanguageName(languageId) {
    const LANGUAGE_NAMES = {
        74: "TypeScript",
        63: "JavaScript",
        71: "Python",
        62: "Java",
    }

    // Return the name if found, else return "Unknown"
    return LANGUAGE_NAMES[languageId] || "Unknown"
}
