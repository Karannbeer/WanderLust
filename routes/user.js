const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const bodyParser = require("body-parser");
const wrapAsync = require("../utlis/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const useController = require("../controllers/users.js");

router.use(bodyParser.urlencoded({ extended: true }));

router
  .route("/signup")
  .get(useController.renderSignupForm)
  .post(wrapAsync(useController.signup));

router
  .route("/login")
  .get(useController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    useController.login
  );

router.get("/logout", useController.logout);

module.exports = router;
