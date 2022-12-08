const current = (req, res, next) => {
  const { subscription, email } = req.user;
  res.json({
    subscription,
    email,
  });
};

module.exports = current;
