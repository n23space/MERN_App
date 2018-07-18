const express = require('express');
const router = express.Router();

// Item Models
const Item = require('../../models/Item');

// @route  GET api/items
// @desc   Get ALl items
// @access Public
router.get('/', (req, res) => {
	console.log('processing get request..');
	Item.find()
	.sort({date: -1})
	.then(items => res.json(items))
	.catch(err => {
		console.log(err);
		return res.status(404).json({success: false})
	});
});

// @route  POST api/item
// @desc   Create an item
// @access Public
router.post('/', (req, res) => {
	const newItem = new Item({
		name: req.body.name
	});

	newItem.save().then(item => res.json(item));
});

// @route  DELET api/items/:id
// @desc   Delete an item
// @access Public
router.delete('/:id', (req, res) => {
	Item.findById(req.params.id)
		.then(item => item.remove().then(() => res.json({success: true})))
		.catch(err => res.status(404).json({success: false}));
});


module.exports = router;
