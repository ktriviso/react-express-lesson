module.exports = {
  sendData(req, res) {
    res.json({
      status: 'ok',
      data: res.locals.data
    });
  },

  handleError(error, req, res, next) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}
