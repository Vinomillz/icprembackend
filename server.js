if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

// IMPORTING LIBRARIES THAT WE INSTALLED USING NPM
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passports-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

initializePassport(
	passport,
	(email) => users.find((user) => user.email === email),
	(id) => users.find((user) => user.id === id)
);

app.use(express.urlencoded({ extended: false }));
// the line above allows us to be able to take all the value and make us  be able to access them in our post method

app.use(flash());
app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

//
app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/register",
		failureFlash: true,
	})
);
//

// configuring the register post functionality
app.post("/register", checkNotAuthenticated, async (req, res) => {
	try {
		const HashedPassword = await bcrypt.hash(req.body.password, 10);
		users.push({
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: HashedPassword,
		});
		console.log(users);
		res.redirect("/login");
	} catch (e) {
		console.log(e);
		res.redirect("/register");
	}
});

// we didnt use database like mysql or mongodb
const users = [];

// ROUTES
app.get("/", checkAuthenticated, (req, res) => {
	// using render to pass in the template
	res.render("index.ejs", { name: req.user.name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
	res.render("login.ejs");
});

app.get("/register", checkNotAuthenticated, (req, res) => {
	res.render("register.ejs");
});

// End Routes

app.delete("/logout", (req, res) => {
	req.logout(req.user, (err) => {
		if (err) return next(err);
		res.redirect("/");
	});
});

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}
	next();
}
// END OF THE ROUTES

app.listen(3000);

// login func. using passports a library that helps for authentication
