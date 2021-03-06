const booleanOptions = ['true', 'false'];
const transitionalOperators = ['be', 'as', 'to', 'with', 'while', 'withparameters'];
const controlOperators = ['loop', 'repeat', 'if', 'else', 'function'];
const assignmentCommands = ['let', 'define', 'declare'];
const openBlockDelimiter = 'begin';
const closeBlockDelimiter = 'end';
const callOperator = 'call';
const subtractionToken = '-';
const infixOperators = ['::', 'toInfix'];
const lineContinuationOperator = '...';

const characterSet = {
    operators: ['+', subtractionToken, '*', '/'],
    openGroupDelimiter: '(',
    closeGroupDelimiter: ')',
    functionExecutionIndicator: ':',
    stringBeginIndicator: '"',
    stringEndIndicator: '"',
    stringEscapeCharacter: '\\',
    commentCharacter: '#',
    whitespaceCharacter: '\s',
    subtractionToken: subtractionToken
};

const comparisonOperators = [
    'isGreaterThan',
    'isLessThan',
    'isGreaterOrEqualTo',
    'isLessOrEqualTo',
    'isEqualTo']
    .map(value => value.toLowerCase());

const grammar = {
    'Number': (value) => /^\-?[0-9]+(\.[0-9]+)?$/.test(value),
    'Boolean': (value) => booleanOptions.includes(value.toLowerCase()),
    'String': (value) => value[0] === characterSet.stringBeginIndicator
        && value[value.length - 1] === characterSet.stringEndIndicator,

    'AssignmentCommand': (value) => assignmentCommands.includes(value),

    'InfixOperator': (value) => infixOperators.includes(value),
    'LineContinuationOperator': value => value === lineContinuationOperator,
    
    'Operator': (value) => characterSet.operators
        .concat(['and', 'or'])
        .concat(comparisonOperators).includes(value),
    'FunctionExecutionIndicator': (value) => value === characterSet.functionExecutionIndicator,

    'OpenGroupDelimiter': (value) => value === characterSet.openGroupDelimiter,
    'CloseGroupDelimiter': (value) => value === characterSet.closeGroupDelimiter,

    'OpenBlockDelimiter': (value) => value.toLowerCase() === openBlockDelimiter,
    'CloseBlockDelimiter': (value) => value.toLowerCase() === closeBlockDelimiter,
    'TransitionalOperator': (value) => transitionalOperators.includes(value.toLowerCase()),

    'CallOperator': (value) => value.toLowerCase() === callOperator,
    'ControlOperator': (value) => controlOperators.includes(value.toLowerCase()),

    'Identifier': () => true,
};

const grammarCheckList = Object
    .keys(grammar)
    .map(key => ({
        type: key,
        test: grammar[key]
    }));

function getTokenType(value) {
    const grammarTokenType = grammarCheckList
        .filter(testObject => testObject.test(value))
        .map(testObject => testObject.type)[0];

    if (typeof grammarTokenType === 'undefined') {
        throw new Error('Unknown value or symbol in source code: ' + value);
    }

    return grammarTokenType;
}

module.exports = {
    grammarTypes: Object.keys(grammar).reduce(function (result, key) {
        result['is' + key] = grammar[key];

        return result;
    }, {}),
    tokenTypes: Object.keys(grammar).reduce(function (tokenTypes, key) {
        tokenTypes[key] = key;

        return tokenTypes;
    }, {}),
    getTokenType,
    characterSet
};