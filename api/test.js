module.exports = (req, res) => {
  res.status(200).send({ success: true, message: 'Test endpoint is working!' });
};
