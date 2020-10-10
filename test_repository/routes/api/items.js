const express = require('express');
const router = express.Router();
// Item Model

/*   @route     GET api/items
     @desc      Get All Items 
     @access    Public
    */

router.get('/', (req, res) => {});

/*   @route     POST api/items
     @desc      Create an Item
     @access    Private
    */

router.post('/', (req, res) => {});

/*   @route     DELETE api/items
     @desc      Delete an Item
     @access    Private
    */

router.delete('/:id', (req, res) => {});

module.exports = router;
