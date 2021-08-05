const express = require('express');
const router = express.Router();
const members = require('../../Members');
const { v4: uuidv4 } = require('uuid');


// Get All members
router.get('/', (req, res) => {
    res.json(members);
})

// Get one member
router.get('/:id', (req, res) => {
    // Get add param id
    //res.send(req.params.id);

    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
})

// Create a member
router.post('/', (req, res) => {
    const newMember = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include name and email' })
    }

    members.push(newMember);
    res.json(members);


    // to show member list in UI
    //res.redirect('/');
})

// Update a member
router.put('/:id', (req, res) => {
    // Get add param id
    //res.send(req.params.id);

    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;

        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                 member.name = updMember.name ? updMember.name : member.name,
                 member.email = updMember.email ? updMember.email : member.email

                 res.json({msg :'Member Updated', member});
            }
        })
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
})

//Delete member
router.delete('/:id', (req, res) => {
    // Get add param id
    //res.send(req.params.id);

    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({ msg : "Member Deleted", members :members.filter(member => member.id !== parseInt(req.params.id))});
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
})

module.exports = router;