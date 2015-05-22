_27={};

_27.ajaxChange=function(data){
  var out={};
  var dLen=data.length;
  for(var i=dLen; i--;){
    var it=data[i];
    out[it.name]=it.value;
  }
  return out;
};

Template.addSoapList.helpers({
  soaps: function() {
    return Soaps.find();
  }
});

Template.addSoapItem.events({
  'click a': function(e) {
    e.preventDefault();
    var delIt=confirm("are u sure?");
    if(delIt){
      var $this = $(e.target);
      var _id = $this.attr("soap-id");
      Soaps.remove(_id);
    }
  }
});

Template.addSoapForm.events({
  'submit #addSoap': function(e) {
    e.preventDefault();
    var $form = $(e.target);
    var data=$form.serializeArray();
    data=_27.ajaxChange(data);
    data['time']=(new Date()).getTime();
    Soaps.insert(data);    
  }
});