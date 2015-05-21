Session.setDefault("administrator", 0);
Session.setDefault("selSoapId", 0);
Session.setDefault("selRoleId", 0);
Session.setDefault("tempInfo", 0);

Session.setDefault("chatTime", (new Date()).getTime() - 60 * 500);

Template.registerHelper("administrator", function(){
	return Session.get("administrator");
});

Template.registerHelper("selSoapId", function(){
	return Session.get("selSoapId");
});

Template.registerHelper("selSoapName", function(){
	return _27.getTempInfo("selSoapId","name");
});

Template.registerHelper("selSoapImg", function(){
	return _27.getTempInfo("selSoapId","imgUrl");
});

Template.registerHelper("selRoleId", function(){
	return Session.get("selRoleId");
});

Template.registerHelper("selRoleName", function(){
	return _27.getTempInfo("selRoleId","name");
});

Template.registerHelper("selRoleImg", function(){
	return _27.getTempInfo("selRoleId","imgUrl");
});

Template.user.events({
	"click .btnChangeSoap":function(e){
		e.preventDefault();
		Session.set("selSoapId",0);		
		Session.set("selRoleId",0);
	},
	"click .btnChangeRole":function(e){
		e.preventDefault();
		Session.set("selRoleId",0);
	}
});