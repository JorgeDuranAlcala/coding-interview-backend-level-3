module.exports = {
    transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { parser: { syntax: 'typescript', decorators: true }, transform: { 
        decoratorMetadata: true,
        legacyDecorator: true 
    } }}]
    },
   }
   