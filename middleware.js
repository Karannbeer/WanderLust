const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utlis/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    //method to check user is loged in or not
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be loged in to create listing!");
    return res.redirect("/login");
  }
  next();
};

//to save redirect url
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "Only the Owner's have permission to do changes!! ");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  console.log("Request Body:", req.body);
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Review

module.exports.validatReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!req.user || !review.author._id.equals(req.user._id)) {
    req.flash("error", "You did not create this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// module.exports.isOwner = async (req, res, next) => {
//   let { id } = req.params;
//   let listing = await Listing.findById(id);
//   if (!currUser && listing.owner._id.equals(res.locals.currUser._id)) {
//     req.flash("error", "You are not the owner of listing");
//     return res.redirect(`/listings/${id}`);
//   }
//   next();
// };

// module.exports.isReviewAuthor = async (req, res, next) => {
//   let { id, reviewId } = req.params;
//   let review = await Review.findById(reviewId);
//   if (!review.author._id.equals(res.locals.currUser._id)) {
//     req.flash("error", "You did not create this Review");
//     return res.redirect(`/listings/${id}`);
//   }
//   next();
// };

// module.exports.validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

// module.exports.validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
//   if (error) {
//     console.log(error)
//     let errMsg = error.details.map((el) => el.message).join(",");
//     console.log(errMsg);
//
//   } else {
//     next();
//   }
// };

