/**
 * Represents the query parameters for creating a thread with OpenAI.
 */
export interface IThreadQuery {
    /**
     * The ID of the assistant to interact with.
     * @type {string}
     */
    assistantId: string;

    /**
     * The role of the message sender. Can be either 'user' or 'assistant'.
     * If not specified, defaults to 'user'.
     * @type {('user' | 'assistant') | undefined}
     */
    role?: 'user' | 'assistant';

    /**
     * The content of the message to be sent.
     * If not specified, defaults to a predefined message.
     * @type {string | undefined}
     */
    content?: string;

    /**
     * The ID of the file to be attached to the message.
     * @type {string}
     */
    fileId: string;
}
