'use strict';

var fs = require('fs-plus');


module.exports = {
    scenarios: [],
    stepDefinitionSynonyms: null,
    /**
    * Get the value of a variable. The value will be fetched from a json structure intended to hold step properties.
    * Initially the code attempts to decide if the variable is a 'shortcut' to a page-specific variable.
    * If it is, the getNestedObject will be called.
    * Otherwise, it is assumed that the variable in on the root pageObject level, and retrieval is attempted.
    * @returns the object
    */
    resolveVariable: function(pageObject, varName) {
        var o = pageObject.application.shortcuts[varName];
        if (o) {
            return this.getNestedObject(pageObject.application, o);
        }
        return pageObject[o];
    },
    /**
    * finds a (nested) object by a "path"
    * @returns the object
    */
    getNestedObject: function(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            }
            else {
                return;
            }
        }
        return o;
    },
     /**
    * loads synonyms of step definitions
    * 
    */
    loadStepDefinitionSynonyms: function() {
        var jsonText = fs.readFileSync('./synonyms/step-definitions.json');
        this.stepDefinitionSynonyms = JSON.parse(jsonText);
    },
    /**
    * generates a new fature file by replacing steps with synonyms
    * @returns the generated file path
    */
    generateDynamicFeatureFile: function(callback) {
        var featuresDirectory = './test-features';
        var generatedFeatureDirectory = 'features';
        

        /**
         * get the feature files
         */
        var featureFilesArray = fs.listSync(featuresDirectory, ['feature']);

        /**
         * ensure the generated feature directory is clean
         */
        
        if (fs.existsSync(generatedFeatureDirectory)) {
            fs.removeSync(generatedFeatureDirectory);
        }
        fs.makeTreeSync(generatedFeatureDirectory);
        
        /**
         * replace any synonyms in generated file, then close stream;
         */
        
        for (var fileIndex = 0; fileIndex < featureFilesArray.length; fileIndex++) {
            var file = featureFilesArray[fileIndex];
            var fileName = (file.indexOf('/')>-1?file.substring(file.indexOf('/') + 1):file);
            var generatedFeatureFile = generatedFeatureDirectory + '/' + fileName;
             /**
             * create generated feature file stream
             */
            var stream = fs.createWriteStream(generatedFeatureFile);
            stream.on('error', function(err) {
                console.log(err);
            });
            var generatedFeatureFileContent = '';
            
            var rows = fs.readFileSync(file).toString().split('\n');
            for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                var rowText = rows[rowIndex];
                var synonym = this.findStepDefinitionSynonym(rowText);
                if (synonym != null) {
                    rowText = synonym;
                }

                generatedFeatureFileContent += rowText + '\n';
            }

            generatedFeatureFileContent += '\n\n';
            this.parseScenarios(generatedFeatureFileContent);
            generatedFeatureFileContent = this.processInjects(generatedFeatureFileContent);
            fs.writeFileSync(generatedFeatureFile, generatedFeatureFileContent);
        }

        callback();
    },
    /**
    * Loads synonyms of step definitions
    * @returns the original step definition if found, null otherwise
    */
    findStepDefinitionSynonym: function(stepDefinition) {
        stepDefinition = stepDefinition.replace(/ +(?= )/g,'').trim();
        var steps = this.stepDefinitionSynonyms['step-definitions'];
        for (var i = 0; i < steps.length; i++) {
            var synonyms = steps[i]['step-synonyms'];
            for (var j = 0; j < synonyms.length; j++) {
                var synonym = synonyms[j].trim();
                var matches = stepDefinition.match(new RegExp(synonym, 'i'));
                if (matches) {
                    var originalStepDefinition = steps[i]['step-definition'];
                    var synonymDynamicGroupIndices = this.getDynamicGroupIndices(matches.splice(0, 1));
                    if (synonymDynamicGroupIndices.variableIndex != -1) {
                        originalStepDefinition = originalStepDefinition.replace('${VARIABLE}', matches[synonymDynamicGroupIndices.variableIndex]);
                    }
                    if (synonymDynamicGroupIndices.valueIndex != -1) {
                        originalStepDefinition = originalStepDefinition.replace('_VALUE_', matches[synonymDynamicGroupIndices.valueIndex]);
                    }
                    return originalStepDefinition;
                }
            }
        }
        return null;
    },
    /**
    * Returns the indexes of the groups matched earlier that are considered dynamic (in the scope of cucumber testing).
    * They are considered dynamic if they are surrounded by double quotes (e.g. "the value"), or are variables (e.g. ${HOME_PAGE}).
    * Each step definition that is matched is considered to have at maximum one "value" and one ${variable}.
    * @returns Object with group indexes, -1 if not found
    */
    getDynamicGroupIndices: function(regexCapturingGroups) {
        var valueRegex = '("[^"]*")';
        var variableRegex = '(\\$\\{.*\\})';
        var indexes = {
            variableIndex: -1,
            valueIndex: -1
        };
        for (var i = 0; i < regexCapturingGroups.length; i++) {
            var group = regexCapturingGroups[i];
            if (group.match(variableRegex)) {
                indexes.variableIndex = i;
            }
            if (group.match(valueRegex)) {
                indexes.valueIndex = i;
            }
        }
        return indexes;
    },
    /**
    * Goes through the feature text, identifies scenarios, and stores them in an array for later use
    */
    parseScenarios: function(featureText) {
        var scenarioRegex = new RegExp(/(?:.*)Scenario:(.+)(?:.*[\n|\r\n])((?:(?:.*)(?:Given|When|Then|And|But|#(?:.*)@Inject(?:\s*))(?:.+)(?:[\n|\r\n]))*)/gmi);
        var match;
        while ((match = scenarioRegex.exec(featureText)) !== null) {
            var scenario = {
                name: match[1],
                text: match[2].replace(/[\n|\r\n]$/, '')
            };
            this.scenarios.push(scenario);
        }
    },
    /**
    * Scans the feature text for the following regex:
    * /#(?:\s*)@Inject(?:\s*)\((.+)\)(?:\s*)(?:$)/gmi
    * If found, and a scenarion with name SCENARIO_NAME exists, the comment line is replaced by the contents of the scenario
    * @returns the feature text, after the possible injections took place.
    *
    *
    * Example:
    *
    * Scenario: test-scenario
    *   Given I write a test
    *   When I execute it
    *   Then I get a result
    *
    * Scenario produce-test-report
    * # @Inject(test-scenario)
    *   And I produce a report from the test result
    *
    * # The above will be replaced with:
    * Scenario produce-test-report
    *   Given I write a test
    *   When I execute it
    *   Then I get a result
    *   And I produce a report from the test result
    */
    processInjects: function(featureText) {
        var injectRegex = new RegExp(/#(?:\s*)@Inject(?:\s*)\((.+)\)(?:\s*)(?:$)/gmi);
        var match;
        while ((match = injectRegex.exec(featureText)) !== null) {
            var scenarioName = match[1];
            for (var i= 0; i < this.scenarios.length; i++) {
                var scenario = this.scenarios[i];
                if (scenario.name.trim() === scenarioName.trim()) {
                    var preceedingText = featureText.substring(0, match.index);
                    var succeedingText = featureText.substring(match.index + match[0].length, featureText.length);
                    var scenarioReplacementText = this.processInjects(scenario.text);
                    featureText = preceedingText + scenarioReplacementText + succeedingText;
                    break;
                }
            }
        }
        return featureText;
    }
};
