import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password.trim() ||
      password.trim().length < 6
    ) {
      return res.status(200).json({
        status: false,
        message: "Email veya şifre eksik ya da geçersiz!",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(200)
        .json({ status: false, message: "Email veya şifreniz yanlış" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .json({ status: false, message: "Email veya şifreniz yanlış" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000,
    });

    const plainUser = user.toObject();
    delete plainUser.password;
    delete plainUser._id;

    res.status(200).json({ status: true, message: "Giriş Başarılı", user: plainUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Login controller da bir hata oluştu",
      error,
    });
  }
};

export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (
      !email ||
      !password ||
      !name ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password.trim() ||
      !name.trim() ||
      password.trim().length < 6
    ) {
      return res.status(200).json({
        status: false,
        message: "Email veya şifre eksik ya da geçersiz!",
      });
    }

    const existingUser = await User.findOne({ email: email.trim() });
    if (existingUser) {
      return res
        .status(200)
        .json({ status: false, message: "Böyle bir mail zaten mevcut" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.trim(), salt);

    const newUser = new User({
      email: email.trim(),
      password: hashedPassword,
      name: name.trim(),
    });

    await newUser.save();

    res.status(201).json({ status: true, message: "Başarıyla kayıt olundu" });
  } catch (error) {
    console.error("Registeruser controller crashed", error);
    return res.status(500).json({
      status: false,
      message: "Bir hata oluştu daha sonra tekrar deneyiniz!",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(200)
        .json({ status: false, message: "Böyle bir kullanıcı bulunamadı!" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ status: true, message: "Başarıyla çıkış yapıldı" });
  } catch (error) {
    console.error("Logout controller crashed", error);
    res.status(500).json({
      status: false,
      message: "Bir hata oluştu daha sonra tekrar deneyiniz",
      error,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(200).json({
        status: false,
        message: "Bir hata oluştu daha sonra tekrar deneyiniz!",
      });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(200)
        .json({ status: false, message: "Yetkisiz Erişim" });
    }

    res.status(200).json({ status: true, message: "Giriş başarılı!", user });
  } catch (error) {
    console.error("checkout controller crashed", error);
    res.status(500).json({
      status: false,
      message: "Bir hata oluştu daha sonra tekrar deneyiniz",
      error,
    });
  }
};
