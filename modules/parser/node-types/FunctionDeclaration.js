const { promisifyExec } = require('./utils/promisify');
const indent = require('./utils/indent');

function FunctionDeclaration(name, parameters) {
    this.type = 'FunctionDeclaration';
    this.name = name;
    this.parameters = parameters;
    this.body = [];
}

FunctionDeclaration.prototype = {
    setBody: function (body) {
        this.body = body;
    },

    toString: function () {
        let functionStart = `declare function ${this.name}`;

        if (this.parameters.length > 0) {
            const parameterString = this.parameters.map(parameter => parameter.toString()).join(' ');
            functionStart += ' withparameters ' + parameterString;
        }

        const bodyContent = this.body.map(line => indent('    ', line.toString()));

        return [functionStart].concat(bodyContent).concat(['end']).join('\n');
    },

    execute: async function (scope) {
        const newFunction = async (...args) => {
            
            if (args.length !== this.parameters.length) {
                throw new Error(`Function '${this.name}' takes ${this.parameters.length} arguments, but received ${args.length}.`);
            }
            
            const localScope = scope.new();

            for (let i = 0; i < this.parameters.length; i++) {
                const parameterName = this.parameters[i].toString();

                localScope.initialize(parameterName, args[i]);
            }

            let result;

            for (let i = 0; i < this.body.length; i++) {
                const line = this.body[i];
                result = await promisifyExec(line, localScope);
            }

            return result;
        };

        scope.define(this.name.name.toLowerCase(), newFunction);
    }
};

FunctionDeclaration.new = function (name, parameters) {
    return new FunctionDeclaration(name, parameters);
};

module.exports = FunctionDeclaration;