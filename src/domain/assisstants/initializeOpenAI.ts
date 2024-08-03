import OpenAI from "openai";

/**
 * Initializes and returns an OpenAI client.
 *
 * @param {string} apiKey - The API key to authenticate with OpenAI.
 * @returns {OpenAI} The initialized OpenAI client.
 * @throws {Error} Throws an error if the API key is not provided.
 */
export default (apiKey: string): OpenAI => {

    if (!apiKey) {
        throw new Error('API Key is required');
    }

    const client = new OpenAI({
        apiKey
    });

    return client;
};
