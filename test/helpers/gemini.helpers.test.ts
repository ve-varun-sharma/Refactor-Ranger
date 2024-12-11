import { generateAiResponse } from '../../src/helpers/gemini.helpers';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

jest.mock('@google/generative-ai', () => {
    return {
        GoogleGenerativeAI: jest.fn().mockImplementation(() => {
            return {
                getGenerativeModel: jest.fn().mockReturnValue({
                    generateContent: jest.fn().mockResolvedValue({
                        response: {
                            text: jest.fn().mockReturnValue('Mocked AI response')
                        }
                    }),
                    // Add other necessary properties here
                    apiKey: 'mock-api-key',
                    _requestOptions: {},
                    model: 'mock-model',
                    generationConfig: {},
                    generate: jest.fn(),
                    generateStream: jest.fn(),
                    generateAsync: jest.fn(),
                    generateAsyncStream: jest.fn()
                } as Partial<GenerativeModel> as GenerativeModel)
            };
        })
    };
});

describe('generateAiResponse', () => {
    it('should generate a response based on the user input', async () => {
        const userInput = 'This is a test input';
        const response = await generateAiResponse(userInput);

        expect(response).toBe('Mocked AI response');
    });

    // TODO: fix test here to throw gracefully
    xit('should handle errors gracefully', async () => {
        const userInput = 'This is a test input';
        const errorMessage = 'Error generating response';

        jest.spyOn(GoogleGenerativeAI.prototype, 'getGenerativeModel').mockReturnValue({
            generateContent: jest.fn().mockRejectedValue(new Error(errorMessage)),
            // Add other necessary properties here
            apiKey: 'mock-api-key',
            _requestOptions: {},
            model: 'mock-model',
            generationConfig: {},
            generate: jest.fn(),
            generateStream: jest.fn(),
            generateAsync: jest.fn(),
            generateAsyncStream: jest.fn()
        } as Partial<GenerativeModel> as GenerativeModel);

        await expect(generateAiResponse(userInput)).rejects.toThrow(errorMessage);
    });
});
