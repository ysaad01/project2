const router = require("express").Router();
const passport = require("passport");
const querystring = require("querystring");

const Booking = require("../models/Booking");
const Accommodation = require("../models/Accommodation");

