Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'index'});

Router.route('/addSoap', function () {
  this.layout('layoutAdmin');
  this.render('addSoap');
});

Router.route('/addRole', function () {
  this.layout('layoutAdmin');
  this.render('addRole');
});






