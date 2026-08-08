import mongoose from "mongoose"
import bcrypt from "bcrypt"

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
        unique: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    cart: {
        type: Array,
        default: []
    },
    address: [{
        type: mongoose.Types.ObjectId,
        ref: "Adress"
    }],
    whishlist: [{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }],
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshtoken: {
        type: String
    },
    passwordChangeAt: {
        type: String
    },
    passwordToken: {
        type: String
    },
    passwordResetExpire: {
        type: String
    }
}, {
    timestemp: true
});

userSchema.pre("save", async function () {
    if(this.isModified("password")) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
//Export the model
const User = mongoose.model('User', userSchema);
export default User