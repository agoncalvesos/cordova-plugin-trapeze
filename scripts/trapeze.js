#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const logger = require('cordova-common').CordovaLogger.get();
const { execSync } = require("child_process");
const ExtendedConfigParser = require('./utils/extendedConfigParser');


const PREFERENCE_TRAPEZE_CONF = 'TrapezeConf'
const PREFERENCE_TRAPEZE_VARS = 'TrapezeVars'

module.exports = function (context) {
    // Get the Cordova project directory
    const projectRoot = context.opts.projectRoot;
    // Get the platform (android or ios)
    const platform = context.opts.cordova.platforms[0];

    let yamlContents = null;

    // Get preferences that describe usage descriptions
    const parser = ExtendedConfigParser.createInstance(context);
    const preferenceTrapezeConf = parser
        .getPreference(PREFERENCE_TRAPEZE_CONF, platform);
    var preferenceTrapezeVars = parser
        .getPreference(PREFERENCE_TRAPEZE_VARS, platform).replace(/'/g, '"');

    const trapezeVarsObj = JSON.parse(preferenceTrapezeVars);
    preferenceTrapezeVars = Object.keys(trapezeVarsObj).map(function(k) {
        return encodeURIComponent(k) + "='" + JSON.stringify(trapezeVarsObj[k]) + "'"
    }).join(' ');

    // Look for a trapeze-platform.yaml file in the root of the platform directory
    const yamlPath = path.join('platforms', platform, 'trapeze-conf.yaml');
    const alternativeYamlPath = path.join('www','trapeze-conf.yaml');
    if (preferenceTrapezeConf) {
        try {
            // Decode the base64-encoded value
            const decodedValue = Buffer.from(preferenceTrapezeConf, 'base64').toString('utf-8');
            yamlContents = decodedValue.trim();
            fs.writeFileSync(yamlPath, yamlContents);
        } catch (e) {
            logger.error(`Invalid base64-encoded value for preference ${PREFERENCE_TRAPEZE_CONF}`,e);
            return;
        }
    }

    const existsYamlPath = fs.existsSync(yamlPath);
    const existsAlternativeYaml = fs.existsSync(alternativeYamlPath);

    if (!existsYamlPath && !existsAlternativeYaml) {
        logger.warn(`Could not find Trapeze YAML file in path ${yamlPath} or ${alternativeYamlPath}`);
        return;
    }

    let command = "";
        if(existsYamlPath){
            command = `${preferenceTrapezeVars} npx trapeze run ${yamlPath} -y`;
        } else {
            command = `${preferenceTrapezeVars} npx trapeze run ${alternativeYamlPath} -y`;
        }
        
        const platformPath = path.join(projectRoot, 'platforms', platform);
        if (platform == "android") {
            command = command.concat(" --android-project ", platformPath);
        } else if (platform == "ios") {
            command =command.concat(" --ios-project ", platformPath);
        }

        let result = runCommand(command);

        result ?
            console.log("Result: ", result.toString()) :
            console.error(" > Failed to perform the operation: ", result);
    

};

/**
 * Tries to install a tool with the command supplied
 * @param {string} cmd command that will install the tool
 * @returns {Boolean} indicating the success of the attack
 */
function runCommand(cmd) {
    console.log(`Running the command ${cmd}...`);
    return execSync(cmd);
}


