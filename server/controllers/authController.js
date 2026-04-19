const User = require('../models/User');

const loginUser = async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    let user = await User.findOne({ username });
    
    if (!user) {
      user = new User({ username });
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const username = req.headers['x-username'] || req.query.username;
    
    if (!username) {
      return res.status(401).json({ error: 'Unauthorized, missing username.' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get Me error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  loginUser,
  getMe
};
