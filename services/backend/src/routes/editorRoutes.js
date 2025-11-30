const express = require('express');
const router = express.Router();
const editorController = require('../controllers/editorController');
const auth = require('../middleware/authMiddleware');
const verifyOwner = require('../middleware/authUserDoc');

router.get('/:id', auth, verifyOwner, editorController.getDocument);
router.put('/:id', auth, verifyOwner, editorController.updateDocument);

module.exports = router;

