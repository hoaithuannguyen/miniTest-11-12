const middleWare = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({
            message: "Nhập thông tin vào!",
        });
    } else {
        next();
    }
};
module.exports = {
    middleWare,
};