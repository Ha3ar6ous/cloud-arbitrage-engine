const requireUser = (req, res, next) => {
  const username = req.headers['x-username'];

  if (!username) {
    return res.status(401).json({ error: 'Unauthorized: Missing x-username header' });
  }

  req.username = username;
  next();
};

module.exports = {
  requireUser
};
