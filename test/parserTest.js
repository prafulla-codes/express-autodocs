const assert = require('chai').assert;
const getCommentedParams = require('../helpers/demestifyAPI')
  .getCommentedParams;

let testApiDefinition = `
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
`;
describe('🔄 JSDOC Parser Test', function () {
  it('should parse JSDOC like syntax', function () {
    assert.deepEqual(
      getCommentedParams(testApiDefinition.length - 1, testApiDefinition),
      { title: 'The title of the book.', author: 'The author of the book.' }
    );
  });
});
