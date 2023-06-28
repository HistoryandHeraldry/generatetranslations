#!/usr/bin/env node

/**
 * @file A script to generate translation files based on user input.
 */

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const readlineSync = require('readline-sync');

/**
 * Generates translation files based on the provided parameters.
 *
 * @param {string} endpoint - The translation endpoint.
 * @param {string} outputDirectory - The output directory for the translation files.
 * @param {string} outputPath - The file name of the output translation file.
 * @param {string} language - The language for the translations.
 * @param {string} languageSet - The language set for the translations.
 * @param {string} schemaVersion - The schema version for the translations.
 * @param {string} namespace - The namespace for the translations.
 * @returns {Promise<void>} A promise that resolves when the translation files are generated.
 */
const generateTranslations = async (endpoint, outputDirectory, outputPath, language, languageSet, schemaVersion, namespace) => {
    try {
        // Send HTTP GET request to the specified endpoint
        const response = await axios.get(endpoint, {
            params: {
                language,
                language_set: languageSet,
                schema_version: schemaVersion
            }
        });

        // Extract the translations from the response
        const translations = { [namespace]: response.data.results[language] };

        // Resolve the absolute path of the output file
        const outputFilePath = path.resolve(outputDirectory, outputPath);

        // Ensure the output directory exists
        await fs.ensureDir(outputDirectory);

        // Write translations to the output file as JSON
        await fs.outputJson(outputFilePath, translations, { spaces: 2 });

        // Output success message
        console.log('Translation files generated successfully.');
    } catch (error) {
        // Output error message if an error occurs
        console.error('Error generating translation files:', error.message);
    }
};


/**
 * An array of questions to prompt the user for input.
 *
 * @type {object[]}
 */

// Create the questions array
const questions = [
    {
        type: 'input',
        name: 'endpoint',
        message: 'Enter the translation endpoint:',
        default: 'https://example.com/api/translations',
    },
    {
        type: 'input',
        name: 'output',
        message: 'Enter the output file name:',
        default: 'translations.json',
    },
    {
        type: 'input',
        name: 'outputDirectory',
        message: 'Enter the output directory:',
        default: 'src/assets/languages',
    },
    {
        type: 'input',
        name: 'language',
        message: 'Enter the language:',
        default: 'en',
    },
    {
        type: 'input',
        name: 'languageSet',
        message: 'Enter the language set:',
        default: 'agents_app',
    },
    {
        type: 'input',
        name: 'schemaVersion',
        message: 'Enter the schema version:',
        default: '1.0',
    },
    {
        type: 'input',
        name: 'namespace',
        message: 'Enter the namespace:',
        default: 'namespace1',
    },
];

/**
 * Prompts the user for input and generates the translation files based on the provided values.
 *
 * @returns {Promise<void>} A promise that resolves when the translation files are generated.
 */
const promptUser = async () => {
    const answers = {}; // Object to store user's answers

    // Iterate over each question
    for (const question of questions) {
        const { name, message, default: defaultValue } = question; // Destructure question properties
        
        // Prompt the user for an answer, displaying the message and default value
        const answer = readlineSync.question(`${message} (${defaultValue}): `, {
            defaultInput: defaultValue
        });
        
        answers[name] = answer; // Store the user's answer in the answers object
    }

    console.log('User responses:', answers); // Output the collected user responses

    const {
        endpoint,
        output,
        outputDirectory,
        language,
        languageSet,
        schemaVersion,
        namespace,
    } = answers; // Destructure the answers object

    const resolvedOutputDirectory = path.resolve(outputDirectory); // Resolve the absolute path of the output directory

    // Call the generateTranslations function with the user-provided values
    generateTranslations(
        endpoint,
        resolvedOutputDirectory,
        output,
        language,
        languageSet,
        schemaVersion,
        namespace
    );
};


// Prompt the user for input and generate the translation files
promptUser();
