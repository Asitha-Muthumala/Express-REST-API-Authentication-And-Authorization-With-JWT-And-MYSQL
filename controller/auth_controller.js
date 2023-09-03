exports.admin_controller = (req, res, next) => {

    res.json({
        status: "Admin authorization completed",
        message: "Welcome Admin"
    })

}

exports.user_controller = (req, res, next) => {

    res.json({
        status: "User authorization completed",
        message: "Welcome User"
    })

}