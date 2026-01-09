const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET

function setUser(user){
    return jwt.sign({
    _id :user.id ,
    email : user.email,
},secret,{expiresIn:"1d"})
}

function getUser(token){
    return jwt.verify(token,secret)
}

module.exports={
    setUser,
    getUser,
}