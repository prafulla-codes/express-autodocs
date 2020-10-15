/**
 * @param {string} description - Returns An Item from database.
 * @param {string} [inputs] itemid - The id of the item. */
app.get('/item', (req, res) => {
  res.send(item);
});
