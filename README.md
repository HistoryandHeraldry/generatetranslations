# Generate Translations

Generate Translations is a script that allows you to generate translation files based on user input. It can be used to fetch translation data from an API endpoint and save it as JSON files for localization purposes. This has been developed as an internal tool as all our translations are managed centrally.

## Installation

You can install Generate Translations globally using npm:

```bash
npm install -g generatetranslations
```

## Usage

To generate translation files, run the `generate-translations` command in your terminal:

```bash
generate-translations
```

The script will prompt you to provide the necessary information for generating the translations. Answer the questions and press Enter to proceed with the default values or provide custom values.

The generated translation files will be saved in the specified output directory with the given file name.

## Configuration

The Generate Translations script is named `generateTranslations.js`. You can modify this file to customize the behavior of the script. The file contains the following options:

- `endpoint` (string, required): The translation endpoint URL.
- `outputDirectory` (string, required): The output directory for the translation files.
- `outputPath` (string, required): The file name of the output translation file.
- `language` (string, required): The language for the translations.
- `languageSet` (string, required): The language set for the translations.
- `schemaVersion` (string, required): The schema version for the translations.

Feel free to modify the configuration according to your requirements.

## License

This project is licensed under the ISC License. See the [LICENSE](https://opensource.org/license/isc-license-txt/) file for details.
