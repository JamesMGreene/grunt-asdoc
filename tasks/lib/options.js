/*
 * grunt-asdoc
 * https://github.com/JamesMGreene/grunt-asdoc
 *
 * Copyright (c) 2014 James M. Greene
 * Licensed under the MIT license.
 */

'use strict';

function quoteIfNeeded(val) {
  return (typeof val === 'string' && val && val.indexOf(' ') !== -1) ? '"' + val + '"' : val;
}

var ignoredConfigKeys = ['rawconfig', 'output', 'force'];

function addOption(optionKey, optionValue, optionsList) {
  if (optionKey && optionValue != null && ignoredConfigKeys.indexOf(optionKey.toLowerCase()) === -1) {
    var optionStr;

    // Dash-ify the option key name
    optionKey = optionKey.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    switch (typeof optionValue) {
      case 'boolean':
        optionStr = '-' + optionKey;
        if (optionKey !== 'lenient') {
          optionStr += '=' + optionValue;
        }
        optionsList.push(optionStr);
        break;

      case 'number':
        optionsList.push('-' + optionKey);
        optionsList.push(optionValue);
        break;

      case 'string':
        if (optionKey === 'load-config') {
          optionsList.push('-' + optionKey + '+=' + quoteIfNeeded(optionValue));
        }
        else {
          optionsList.push('-' + optionKey);
          optionsList.push(optionValue);
        }
        break;

      case 'object':
        var keys;
        // Array
        if (optionValue.length) {
          if (optionKey === 'load-config') {
            optionValue.forEach(function(e) {
              addOption(optionKey, e, optionsList);
            });
          }
          else {
            optionsList.push('-' + optionKey);
            optionsList.push.apply(optionsList, optionValue);
          }
        }
        // Object
        else {
          if (optionKey === 'library-path') {
            keys = Object.keys(optionValue);
            if (keys && keys.length) {
              keys.forEach(function(key, i, c) {
                optionStr = '-' + optionKey;
                // Can be non-additive
                if (optionValue[key] === true) {
                  optionsList.push(optionStr);
                  optionsList.push(key);
                }
                else {
                  optionsList.push(optionStr + '+=' + quoteIfNeeded(key));
                }
              });
            }
          }
          else {
            keys = Object.keys(optionValue);
            if (keys && keys.length) {
              keys.forEach(function(key, i, c) {
                if (key && optionValue[key]) {
                  optionsList.push('-' + optionKey);
                  optionsList.push(key);
                  optionsList.push(optionValue[key]);
                }
              });
            }
          }
        }
        break;
    }
  }
}

var api = {

  getDefaults: function() {
    return {

      // Use the `rawConfig` string to ignore all other `options`
      rawConfig: null,  /* string */

      //
      // http://help.adobe.com/en_US/flex/using/WSd0ded3821e0d52fe1e63e3d11c2f44bc36-7ffa.html#WSd0ded3821e0d52fe1e63e3d11c2f44bb7b-7feb
      //

      // `-source-path C:\flex\sdk\frameworks\projects\framework\src`
      sourcePath: null, /* string */
      // `-doc-classes mx.controls.Button mx.controls.ButtonBar`
      docClasses: [], /* string or array of strings */
      // `-doc-namespaces http://www.adobe.com/2006/mxml
      docNamespaces: [], /* string or array of strings */
      // `-doc-sources src/dir/ src/dir2/*.as`
      docSources: [],  /* string or array of strings */
      // `-examples-path examples/rootPackage/`
      examplesPath: null,  /* string */
      // `-exclude-classes comps.PageWidget comps.ScreenWidget`
      excludeClasses: [],  /* string or array of strings */
      // `-exclude-dependencies=false`
      excludeDependencies: null,  /* boolean */
      // `-exclude-sources C:\flex\sdk\frameworks\projects\framework\src\mx\core\Version.as ...`
      excludeSources: [],  /* string or array of strings */
      // `-footer "Copyright (c) 2014 Blah Blah Blah"`
      footer: null,  /* string */
      // `-keep-xml=false`
      keepXml: null,  /* boolean */
      // `-left-frameset-width 210`
      leftFramesetWidth: null,  /* number (integer) */
      // `-lenient`
      lenient: null,  /* boolean */
      // `-main-title "API Documentation"`
      mainTitle: null,  /* string */
      // `-output docs/`
      output: null,  /* string */
      // `-package com.my.business "Contains business classes and interfaces" -package com.my.commands "Blah"`
      package: {},  /* object containing name-to-description mappings for packages */
      // `-package-description-file myPackages.xml`
      packageDescriptionFile: null,  /* string */
      // `-skip-xsl=false`
      skipXsl: null,  /* boolean */
      // `-strict=true`
      strict: null,  /* boolean */
      // `-templates-path templates/`
      templatesPath: null,  /* string */
      // `-window-title "My.Sweet.Flash Documentation"`
      windowTitle: null,  /* string */
      // `-library-path C:\flex\sdk\frameworks\projects\framework\`
      libraryPath: null,  /* string (additive), array of strings (additive), or object containing string-to-boolean mappings (`true` === non-additive) */
      // `-namespace http://www.adobe.com/2006/mxml C:\flex\sdk\frameworks\projects\framework\manifest.xml`
      namespace: {}, /* object containing URL-to-manifest-file mappings */
      // `-load-config+=C:\flex\sdk\frameworks\flex-config.xml`
      loadConfig: [],  /* string or array of strings (additive) */
      // http://help.adobe.com/en_US/flex/using/WS2db454920e96a9e51e63e3d11c0bf69084-7ac4.html
      // `-actionscript-file-encoding Shift_JIS`
      actionscriptFileEncoding: null,  /* string */
      // `-benchmark=true`
      benchmark: null,  /* boolean */
      // `-warnings=true`
      warnings: null  /* boolean */
    };
  },

  toCommandLineArgs: function(options) {
    var optionStr,
        optionsList = [];
    if (options) {
      if (options.rawConfig) {
        optionsList.push.apply(optionsList, options.rawConfig.split(/\s+/g));
      }
      else {
        Object.keys(options).forEach(function(key) {
          addOption(key, options[key], optionsList);
        });
      }
    }
    return optionsList;
  }

};

module.exports = api;