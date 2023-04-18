module.exports = (mongoose) => {
    const User = mongoose.model('user',
        mongoose.Schema({
            name: String,
            email: String,
            password: String,
            phone: String
        }, {
            timestamps: true
        })
    )

    return User;
}