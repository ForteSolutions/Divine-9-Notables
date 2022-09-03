const mongoose = require("mongoose");

const NotablesSchema = {
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters"],
    },
    organization: {
        type: String,
        required: [true, "Organization is required"],
        minLength: [3, "Organization must be at least 3 characters"],
    },
    biography: {
        type: String,
        required: [true, "Biography is required"],
        minLength: [3, "Biography must be at least 3 characters"],
    },
};

module.exports = mongoose.model("Notable", NotablesSchema);