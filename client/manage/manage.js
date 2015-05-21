
//肥皂相关
Template.soapList.helpers({
  soaps: function() {
    return Soaps.find();
  }
});

Template.soapItem.events({
  'click .j_del': function(e) {
    var $this = $(e.target),
      soap_id = $this.attr("soap-id");
    if (soap_id) {
      Soaps.remove(soap_id);
    } else {
      alert("删除失败");
    }
  }
});

Template.soapSelect.helpers({
  soaps: function() {
    return Soaps.find();
  }
});

//角色相关
Template.roleList.helpers({
  roles: function() {
    var soap_id = Session.get("selSoapId");
    if (soap_id && soap_id != "0") {
      return Soap_roles.find({
        soap_id: soap_id
      });
    } else {
      return Soap_roles.find();
    }
  }
});

Template.roleItem.events({
  'click .j_del': function(e) {
    var $this = $(e.target),
      role_id = $this.attr("role-id");
    if (role_id) {
      Soap_roles.remove(role_id);
    } else {
      alert("删除失败");
    }
  }
});

Template.addInfo.helpers({
  selSoapId: function() {
    return Session.get("selSoapId");
  }
});

_27.upDate=function(db,name,d,soap_id){
  var got=soap_id?db.findOne({soap_id:soap_id,name:name}):db.findOne({name:name});

  if(got){
    var _id=got._id;
    db.update({_id:_id},d);
  }else{
    db.insert(d);
  }
};

Template.addInfo.events({
  'submit #addForm': function(e) {
    e.preventDefault();

    var $form = $(e.target),
      getCode = $form.find('[name=code]').val(),
      addType = $form.find('[type=submit]').attr("name"),
      data = _27.getDataByCode(getCode),
      d_len = data.length;

    if(data&&d_len>0){ 
      for(var i=d_len; i--;){
        var d=data[i];


        if(addType=="soap"){
          var d2={
              name:d[0],
              info:d[1],
              imgUrl:d[2]||"img/soaps/pn.png"
            };

          _27.upDate(Soaps,d[0],d2);

        }else if(addType=="role"){
          var soap_id=Session.get("selSoapId"),
              d2={
              name:d[0],
              imgUrl:d[1]||"img/soaps/pn.png",
              soap_id:soap_id
            };

          _27.upDate(Soap_roles,d[0],d2,soap_id);           
        }
      }
    }
  },
  'change #soapSelect': function(e) {
    var $this = $(e.target),
        val = $this.val();

    val = val == "0" ? 0 : val;
    Session.set("selSoapId", val);
  }
});