const ContactModel = require('./contact.model');
const contactList = async (req, res)=>{
    let contacts = await ContactModel.find();
    res.json(contacts);
}

const createContact = async(req, res)=>{
    // const name = req.body.name;
    // const mobileNumber = req.body.mobileNumber;

    const { name,  mobileNumber} = req.body;

    let newContact = new ContactModel({
        name: name,
        mobileNumber: mobileNumber
    });

    let contact = await newContact.save();

    res.json(contact);
    
}

const getSingleContact = async(req, res)=>{
    let contact = await ContactModel.findById(req.params.id);
    res.json(contact);
}

const updateContact = async(req, res)=>{
    let contact = await ContactModel.findById(req.params.id);

    contact.name = req.body.name ? req.body.name : contact.name;
    contact.mobileNumber = req.body.mobileNumber ? req.body.mobileNumber : contact.mobileNumber;

    let savedContact = await contact.save();

    res.json(savedContact);
}

const deleteContact = async(req, res)=>{

    let contact, deletedContact;
    try {
        contact = await ContactModel.findById({_id : req.params.id});
        deletedContact = await contact.remove();
    } catch (error) {
        res.status(400).json(error);
    }
    res.json(deletedContact);
}

module.exports = {
    contactList,
    createContact,
    updateContact,
    getSingleContact,
    deleteContact
}

