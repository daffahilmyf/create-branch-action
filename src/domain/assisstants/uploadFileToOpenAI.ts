import fs from "fs";

import OpenAI from "openai";
import { FileObject } from "openai/resources";

/**
 * Uploads a file to OpenAI using the provided client.
 *
 * @param {OpenAI} client - The OpenAI client instance used to interact with the API.
 * @param {string} filePath - The path to the file to be uploaded.
 * @returns {Promise<FileObject>} A promise that resolves to the file object returned by the OpenAI API.
 * @throws {Error} Throws an error if the OpenAI client or file path is not provided.
 */
export default async (client: OpenAI, filePath: string): Promise<FileObject> => {
    if(!client) {
        throw new Error('OpenAI client is required');
    }

    if (!filePath) {
        throw new Error('File is required');
    }

    const files = client.files;

    const file = await files.create({
        file: fs.createReadStream(filePath),
        purpose: "assistants",
    });

    return file
}