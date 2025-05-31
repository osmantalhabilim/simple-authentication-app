import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(200).json({message: "Yetkisiz Erişim", status: false});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({message: "Bir hata oluştu daha sonra tekrar deneyiniz", status: false});
    }
};