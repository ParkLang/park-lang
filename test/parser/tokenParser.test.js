const sourceLoader = require('./test-helpers/source-loader');
const tokenParser = require('../../modules/parser/tokenParser');

require('../test-utilities/approvals')();

describe('Token parser', function () {
    it('parses an empty program', function () {
        const tokenizedSource = sourceLoader.loadSource('empty-program');
        const parsedSource = tokenParser.parse(tokenizedSource);

        this.verify(JSON.stringify(parsedSource, null, 4));
    });

    it('parses an program containing only variable initializations', function () {
        const tokenizedSource = sourceLoader.loadSource('variable-initializations');
        const parsedSource = tokenParser.parse(tokenizedSource);

        this.verify(JSON.stringify(parsedSource, null, 4));
    });

    it('parses a program using built-in functions', function () {
        const tokenizedSource = sourceLoader.loadSource('native-functions');
        const parsedSource = tokenParser.parse(tokenizedSource);

        this.verify(JSON.stringify(parsedSource, null, 4));
    });

    it('parses a program using arithmetic operations', function () {
        const tokenizedSource = sourceLoader.loadSource('arithmetic-operations');
        const parsedSource = tokenParser.parse(tokenizedSource);

        this.verify(JSON.stringify(parsedSource, null, 4));
    });

    it('parses a program containing a loop', function () {
        const tokenizedSource = sourceLoader.loadSource('loop-flow-control');
        const parsedSource = tokenParser.parse(tokenizedSource);

        this.verify(JSON.stringify(parsedSource, null, 4));
    });

    it('parses a program containing conditionals', function () {
        const tokenizedSource = sourceLoader.loadSource('conditionals');
        const parsedSource = tokenParser.parse(tokenizedSource);

        this.verify(JSON.stringify(parsedSource, null, 4));
    });

    it('parses a program containing a function declaration', function () {
        const tokenizedSource = sourceLoader.loadSource('function-declaration');
        const parsedSource = tokenParser.parse(tokenizedSource);

        this.verify(JSON.stringify(parsedSource, null, 4));
    });
});