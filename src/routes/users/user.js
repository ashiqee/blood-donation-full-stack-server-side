var express = require("express");
const users = require("../../models/user");

var router = express.Router();

//post user data

router.post("/user", async (req, res) => {
    const user = req.body;
    try {

        const result = await users.create(user);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message)
    }
});


// get all user data 

router.get('/users', async (req, res) => {
    const cursor = await users.find().select({
        _v: 0,

    });
    res.send(cursor)
})

//get single user data

router.get('/user/:email', async (req, res) => {

    const result = await users.findOne({ email: req.params.email })
    res.send(result)
})

//patch user role update
router.patch('/user/admin/:id', async (req, res) => {
    const roleData = req.body;

    const result = await users.updateOne({ _id: req.params.id }, {
        $set: {
            role: roleData.role
        },
    },
    )
    res.send(result)

})
//patch user status update
router.patch('/user/status/:id', async (req, res) => {
    const currentStatus = req.body;
    console.log(currentStatus.status);
    const result = await users.updateOne({ _id: req.params.id }, {
        $set: {
            status: currentStatus.status
        },
    },
    )
    res.send(result)

})


// user profile update

router.patch('/user/updateProfile/:id', async (req, res) => {
    const updateData = req.body;

    const result = await users.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            name: updateData?.name,
            profileImg: updateData?.profileImg,
            coverImg: updateData?.coverImg,
            blood: updateData?.blood,
            districts: updateData?.districts,
            upuzilla: updateData?.upuzilla,

        }
    })
    res.send(result)

})

module.exports = router;