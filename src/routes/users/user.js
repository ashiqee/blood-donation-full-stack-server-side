var express = require("express");
const users = require("../../models/user");

var router = express.Router();

//post user data

router.post("/user", async (req, res) => {
  const user = req.body;


  const query = { email: user.email }
  const existingUser = await users.findOne(query)
  if (existingUser) {
    return res.send({ message: "user already exits", insertedId: null })
  }

  try {
    const result = await users.create(user);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }

});

// get all user data

router.get("/users", async (req, res) => {
  const cursor = await users.find().select({
    _v: 0,
  });
  res.send(cursor);
});

//get single user data

router.get("/user/:email", async (req, res) => {
  const result = await users.findOne({ email: req.params.email });
  res.send(result);
});

//user donor request

router.patch("/user/donorReq/:id", async (req, res) => {
  const userDonorReq = req.body;
  console.log(userDonorReq);
  const result = await users.updateOne(
    { _id: req.params.id },
    {
      $set: {
        roleStatus: userDonorReq.roleStatus,
      },
    }
  );
  // console.log(result);
  res.send(result);
});
//user Volunteer request

router.patch("/user/volunteerReq/:id", async (req, res) => {
  const userDonorReq = req.body;
  console.log(userDonorReq);
  const result = await users.updateOne(
    { _id: req.params.id },
    {
      $set: {
        roleStatus: userDonorReq.roleStatus,
      },
    }
  );
  console.log(result);
  res.send(result);
});

//admin section

router.get("/user/admin/:email", async (req, res) => {
  const user = await users.findOne({ email: req.params.email });
  let admin = false;
  if (user) {
    admin = user?.role === "Admin";
  }
  console.log(admin);
  res.send({ admin });
});

//admin
// user request donor aprroval
router.patch("/user/admin/donorReq/:id", async (req, res) => {
  const result = await users.updateOne(
    { _id: req.params.id },
    {
      $set: {
        role: "Donor",
        roleStatus: "Approved",
      },
    }
  );
  res.send(result);
});
// user request Volunteer aprroval
router.patch("/user/admin/volunteerReq/:id", async (req, res) => {
  const result = await users.updateOne(
    { _id: req.params.id },
    {
      $set: {
        role: "Volunteer",
        roleStatus: "Approved",
      },
    }
  );
  res.send(result);
});

//patch user role update
router.patch("/user/admin/:id", async (req, res) => {
  const roleData = req.body;

  const result = await users.updateOne(
    { _id: req.params.id },
    {
      $set: {
        role: roleData.role,
        roleStatus: roleData.roleStatus,
      },
    }
  );
  res.send(result);
});

//patch user status update
router.patch("/user/status/:id", async (req, res) => {
  const currentStatus = req.body;
  console.log(currentStatus.status);
  const result = await users.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: currentStatus.status,
      },
    }
  );
  res.send(result);
});

// user profile update

router.patch("/user/updateProfile/:id", async (req, res) => {
  const updateData = req.body;

  const result = await users.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: updateData?.name,
        profileImg: updateData?.profileImg,
        coverImg: updateData?.coverImg,
        blood: updateData?.blood,
        districts: updateData?.districts,
        upuzilla: updateData?.upuzilla,
      },
    }
  );
  res.send(result);
});

module.exports = router;
