const assert = require('chai').assert;
const getCommentedParams = require('../helpers/demestifyAPI')
  .getCommentedParams;

const testApiDefinition = `
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 * @param {string} [inputs] name- The name of the user.
 * @param {string} [inputs] password- The password of the user.
 * @param {string} [outputs] userid- The id of the new user created.
 * @param {string} [outputs] error- Error message if any.
 */
`;
describe('🔄 JSDOC Parser Test', function () {
  it('should parse JSDOC like syntax', function () {
    assert.deepEqual(
      getCommentedParams(testApiDefinition.length - 1, testApiDefinition),
      {
        title: 'The title of the book.',
        author: 'The author of the book.',
        inputs: {
          name: 'The name of the user.',
          password: 'The password of the user.'
        },
        outputs: {
          userid: 'The id of the new user created.',
          error: 'Error message if any.'
        }
      }
    );
  });
});
