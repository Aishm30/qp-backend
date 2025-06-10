const checkAdminLoginKey = (req, res, next) => {
  const key = req.headers['x-admin-key'];
  if (!key || key !== process.env.ADMIN_LOGIN_KEY) {
    return res.status(403).json({ message: 'Access denied: invalid login key' });
  }
  next();
};

module.exports = checkAdminLoginKey;
