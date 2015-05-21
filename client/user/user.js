
//肥皂相关
Template.userSoaps.helpers({
  soaps: function() {
    return Soaps.find();
  }
});

Template.userSoap.events({
  "click li":function(){
    Session.set("selSoapId", this._id);
    _27.setTempInfo(this._id,{"name":this.name,"imgUrl":this.imgUrl});    
  }
});

//角色相关
Template.userRoles.helpers({
  roles: function() {
    return Soap_roles.find({soap_id: Session.get("selSoapId") });
  }
});

Template.userRole.events({
  "click a":function(e){
    e.preventDefault();
    Session.set("selRoleId", this._id);
    _27.setTempInfo(this._id,{"name":this.name,"imgUrl":this.imgUrl});
  }
});

Template.chatBox.helpers({
  chats: function() {
    var soap_id=Session.get("selSoapId"),
        chatTime=Session.get("chatTime"),
        out=Soap_chats.find({soap_id:soap_id,time:{'$gt':chatTime}},{sort: {time: -1}});
    return out;
  }
  ,
  soapName: function() {
    var soap_id=Session.get("selSoapId");    
    return _27.getDataById(Soaps,"name",soap_id);
  }
  ,
  roleImg: function() {
    var role_id=Session.get("selRoleId");    
    return _27.getDataById(Soap_roles,"imgUrl",role_id);
  },
  roleName: function() {
    var role_id=Session.get("selRoleId");    
    return _27.getDataById(Soap_roles,"name",role_id);
  }
});

Template.chatForm.events({
  "submit #chatForm":function(e){
    e.preventDefault();

    var $form = $(e.target),
        msg = $form.find('[name=msg]').val();
    if(msg.length>0){
      var d={
            soap_id: Session.get("selSoapId"), 
            role_id: Session.get("selRoleId"),
            info: msg,
            time: (new Date()).getTime()
          };

      Soap_chats.insert(d);      
    }
  }
});

Template.chat.helpers({
  imgUrl: function() {
    return _27.getDataById(Soap_roles,"imgUrl",this.role_id);
  },
  name: function() {
    return _27.getDataById(Soap_roles,"name",this.role_id);
  },
  self:function(){
    var role_id=Session.get("selRoleId"),
        out=role_id==this.role_id?"self":false;
    return out;
  }
});