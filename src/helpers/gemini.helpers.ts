import { GoogleGenerativeAI } from '@google/generative-ai';

import dotenv from 'dotenv';
dotenv.config();

// TODO: Code clean up, remove unusued code, refactor to be more lean, import where relevant dep funcs as utils, etc.
// const projectId = 'experimentation-learning'; // Replace with your project ID
// const location = 'us-central1'; // Replace with your desired location
const modelId = 'gemini-1.5-flash'; // Replace with the desired model ID

// Create a new client
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const model = genAI.getGenerativeModel({
    model: modelId
});

// Function to process questionaire data and a response
export async function generateAiResponse(userInput: string): Promise<string> {
    // The main issue with the code right now is that Gemini has strict safety settings so I cannot get the model to return a response.
    // Define the prompt template
    const systemPrompt = `You are a helpful AI assistant, designed to assist developers with their GitHub issues and pull requests. Your primary goal is to provide constructive feedback, answer questions, and offer solutions.

When responding to issues and pull requests, consider the following:

Code Review:

Analyze the code for potential issues, such as bugs, security vulnerabilities, or performance bottlenecks.
Provide specific suggestions for improvement, including code refactoring, optimization, or error handling.
Suggest alternative approaches or libraries that might be more suitable.
Feature Requests:

Evaluate the feasibility and impact of the requested feature.
Provide technical insights into potential implementation approaches.
Discuss potential drawbacks or limitations of the feature.
Bug Reports:

Attempt to reproduce the bug and identify its root cause.
Offer potential solutions or workarounds.
Suggest additional information that might be helpful in troubleshooting the issue.
General Inquiries:

Answer questions about the project, codebase, or development process.
Provide clear and concise explanations.
Offer helpful resources, such as documentation or tutorials.
Remember to be polite, informative, and respectful in all your responses.

Given the User Input here: ${userInput}, please give the appropiate response:
  
  `;

    try {
        const result = await model.generateContent([systemPrompt]);

        const response = result.response.text();
        console.log(response);

        return response;
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
}

const testGithubIssue = `Describe the feature you'd like to request
TRPC uses superjson by default to provide types beyond json-serializable ones, however this breaks default structural sharing in tanstack-query.
The most obvious impact is that any native Date field in a response object will cause the data object returned by a useQuery hook to have a different identity.

Discussion for context: TanStack/query#6481

Describe the solution you'd like to see
Given that trpc uses superjson by default, I think I'd like to see a default structuralSharing function that handles equality for the types handled by superjson.

Describe alternate solutions
Userland functions
An external package that provides the functionality and can be easily dropped in. This might already exist but I was not able to find a suitable lib.
Lobby popular parsing packages (superjson, I use devalue) to add replaceEqualDeep equivalent functions, since the logic of the two operations are tightly related. Using two different algos could introduce very hard-to-detect bugs.
Additional information
Adding a default function would be a breaking change :)

I don't know what the performance impact of everything would be.

`;

console.log(testGithubIssue);
// generateAiResponse(testGithubIssue);
