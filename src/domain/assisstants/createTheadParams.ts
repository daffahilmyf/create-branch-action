import { ThreadCreateAndRunParams, ThreadCreateAndRunParamsBase } from "openai/resources/beta/threads/threads";
import { IThreadQuery } from "../commons/assistantSchema"

/**
 * Creates parameters for initiating a thread with OpenAI.
 *
 * @param {IThreadQuery} params - The parameters for creating the thread.
 * @param {string} params.assistantId - The ID of the assistant to interact with.
 * @param {string} [params.role='user'] - The role of the message sender (default is 'user').
 * @param {string} [params.content='Fix the code according to the instructions'] - The content of the message (default is 'Fix the code according to the instructions').
 * @param {string} params.fileId - The ID of the file to attach.
 * @returns {ThreadCreateAndRunParamsBase} The parameters needed to create and run a thread.
 * @throws {Error} Throws an error if the assistant ID or file ID is not provided.
 */
export default ({
    assistantId,
    role = 'user',
    content = 'Fix the code according to the instructions',
    fileId
}: IThreadQuery): ThreadCreateAndRunParamsBase => {
    
    if (!assistantId) {
        throw new Error('Assistant ID is required');
    }

    if (!fileId) {
        throw new Error('File ID is required');
    }

    const message: ThreadCreateAndRunParams.Thread.Message = {
        role,
        content,
        attachments: [{
            file_id: fileId,
            tools: [{
                type: 'code_interpreter'
            }]
        }]
    };

    const thread: ThreadCreateAndRunParams.Thread = {
        messages: [message]
    };

    const runThread: ThreadCreateAndRunParamsBase = {
        assistant_id: assistantId,
        thread
    };

    return runThread;
};



