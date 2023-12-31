const express = require('express');
const passport = require('passport');
const router = express.Router();
const authCtrl = require('../controllers/authController');

router.post('/dang-nhap', authCtrl.login); // Đăng nhập

router.post('/dang-ky', authCtrl.register); // Đăng ký
router.post('/dang-ky/sendVerifyCode', authCtrl.sendVerifyCode); // Gửi lại mã xác thực
router.post('/dang-ky/verifyEmail', authCtrl.verifyEmail); // Xác thực email

// Đăng nhập bằng Google
router.get('/dang-nhap/google', passport.authenticate('google'));
router.get('/dang-nhap/google/callback', passport.authenticate('google', { failureRedirect: '/' }), authCtrl.loginGoogle);

// Đăng nhập bằng Facebook
router.get('/dang-nhap/facebook', passport.authenticate('facebook'));
router.get('/dang-nhap/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), authCtrl.loginFacebook);

router.get('/checkuserstatus', authCtrl.checkUserStatus);



module.exports = router;