// Index controller
exports.show = (req, res) => {
  // show index content
  res.render('index', { title: 'Express' });
};