const mongoose = require("mongoose");

const bloodDonationSchema = new mongoose.Schema({

    requesterName: {
        type: String,
        require: true,
    },
    requesterEmail: {
        type: String,
        require: true,
    },
    recipientName: {
        type: String,
        require: true,
    },
    blood: {
        type: String,
        require: true,
    },
    districts: {
        type: String,
        require: true,
    },
    upuzlia: {
        type: String,
        require: true,
    },
    hospitalInfo: {
        type: String,
        require: true,
    },
    donorReqAddress: {
        type: String,
        require: true,
    },
    donateDate: {
        type: String,
        require: true,
    },
    donateTime: {
        type: String,
        require: true,
    },
    reqMessage: {
        type: String,

    },
    donationStatus: {
        type: String,
        enum: ["pending", "inprogress", "done", "cancel"],
    },
});

const bloodDonation = mongoose.model("donationReqs", bloodDonationSchema);

module.exports = bloodDonation;
