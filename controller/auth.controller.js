const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            return res.status(400).json({ message: "Missing required fields" });

        const user = await User.findOne({ username });
        if (!user)
            return res.status(401).json({ message: "Invalid Credentials" })

        const passwordValid = bcrypt.compareSync(password, user.password);

        if (!passwordValid)
            return res.status(401).json({ message: "Invalid Credentials" })

        sendCookie({ username: user.username }, res);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server error" })
    }

}

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            return res.status(400).json({ message: "Missing required fields" });

        const duplicateUser = await User.find({ username });

        console.log(duplicateUser)
        if (duplicateUser.length)
            return res.status(409).json({ message: "username already exists" });

        const hashedPassword = bcrypt.hashSync(password, 10);

        await User.create({
            username: username,
            password: hashedPassword
        })

        sendCookie({ username: username }, res);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server error" })
    }

}

const userLogout = (req, res) => {
    if (!req?.cookies?.jwt) return res.sendStatus(204);
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    })
    res.json({ message: 'Cookie cleared' });
}


const sendCookie = (payload, res) => {
    const accessToken = jwt.sign(payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 6 * 60 * 60 * 1000 });

    const token = `Bearer ${accessToken}`

    res.cookie("jwt", token, {
        secure: true,
        httpOnly: true,
        sameSite: 'None',
        maxAge: 6 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "success" })
}

module.exports = {
    login,
    register,
    userLogout
}