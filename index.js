#!/usr/bin/env node

const fileExists = require('file-exists');
const fs = require('fs');
const prompt = require('prompt');
const dotenv = require('dotenv');
const path = require('path');
const assign = require('lodash/assign');

/**
 * Load an environment variables file from disk.
 * @param {String} filename - Filename of the file to load
 * @returns {Object} Key-value object of the environment variables file
 */
function loadFile(filename) {
  if (!fileExists.sync(filename)) {
    return {};
  }
  return dotenv.parse(fs.readFileSync(filename));
}ï

/**
 * Run an interactive prompt to update an object of environment variables.
 * @param {Object} variables - Key-value object of environment variables
 * @param {Function} callback - Function called when the prompt is finished
 * @returns {undefined}
 */
function updateVariables(variables, callback) {
  prompt.message = '';
  prompt.start();
  prompt.get(Object.keys(variables).map(variable => ({
    name: variable,
    default: variables[variable],
  })), callback);
}

/**
 * Save a key-value object of environment variables to a file
 * @param {Object} variables - Object to write to disk
 * @param {String} filename - Filename to write to
 * @returns {undefined}
 */
function saveVariables(variables, filename) {
  const dotenvString = Object.keys(variables).map(variable =>
    `${variable}=${variables[variable]}`).join('\n');
  fs.writeFileSync(filename, dotenvString);
}

/**
 * Main execution function!
 * @param {String} dir - Directory to operate in (useful for tests)
 * @returns {undefined}
 */
function go(dir) {
  const variables = loadFile(path.join(dir, '.env.sample'));
  assign(variables, loadFile(path.join(dir, '.env')));

  if (Object.keys(variables).length < 0) {
    return;
  }

  updateVariables(variables, (err, updatedVariables) => {
    if (err) {
      console.error(err);
      return;
    }
    saveVariables(updatedVariables, '.env');
  });
}

module.exports = {
  loadFile,
  saveVariables,
  updateVariables,
  go,
};

