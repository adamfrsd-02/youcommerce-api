const db = require('../models/');
const User = db.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const otp_code = 1501;

const cryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
}

module.exports = {
    register: async (req, res) => {
        const userData = new User({
            name: req.body.name,
            email: req.body.email,
            password: await cryptPassword(req.body.password),
            phone: req.body.phone
        })

        try {
            const user = await User.create(userData);

            return res.status(200).json({
                data: user,
                message: "ok"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error
            })
        }

    },

    login: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body;

            const user = await User.findOne({
                email
            })

            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({
                            id: user.id
                        },
                        'secret_key', {
                            expiresIn: '1h'
                        })

                    return res.status(200).json({
                        logged_in: true,
                        bearer_token: token,
                    })    

                    // return res.status(200).json({
                    //     logged_in: true,
                    //     authenticated: false,
                    //     otp_code: otp,
                    // })
                }

                return res.status(401).json({
                    message: "wrong password"
                });

            }

            return res.status(404).json({
                message: "user not found"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error
            })
        }
    },

    getProfile: async (_, res) => {
        try {
            const id = res.user.id.id;

            // console.log(id.id);
            const user = await User.findById(id);

            return res.status(200).json({
                data: user,
                message: "ok"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error
            })
        }
    },

    updateProfile: async (req, res) => {
        try {
            const {
                id,
                name,
                phone,
                email,
                password
            } = await req.body;

            User.findByIdAndUpdate(id, req.body, {
                    new: true
                })
                .then((result) => {
                    if (!result) {
                        return res.status(404).json({
                            message: "user not found"
                        })
                    }
                    return res.status(200).json({
                        data: result,
                        message: "ok"
                    })
                }).catch((err) => {
                    console.log(err);
                })



        } catch (err) {
            console.log(err);
        }


    },

    verifyOtp: async (req, res) => {
        try {
            const {
                otp
            } = req.body;

            if (otp == otp_code) {
                return res.status(200).json({
                    message: "otp verified!"
                })
            } else {
                return res.status(401).json({
                    message: "wrong otp"
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error
            })
        }
    }

}