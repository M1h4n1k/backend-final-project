const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const User = require("../models/user");
const { JWT_SECRET } = require("../config/jwt");

const userSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("admin", "regular").required(),
});

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    // vulnerable to timing attacks
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!user || !compare) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const register = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, password, role } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: passwordHash, role });
  try {
    await newUser.save();
    res.json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { login, register };
