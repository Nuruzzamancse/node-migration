const express = require('express');
const router = express.Router();
const contactController = require('./contact.controller');

router.get('/', contactController.contactList);

router.post('/', contactController.createContact);

router.get('/:id', contactController.getSingleContact);

router.put('/:id', contactController.updateContact);

router.delete('/:id', contactController.deleteContact);

module.exports = router;