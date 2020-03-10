var db = require('../db');

module.exports= {
	getById : function(id, callback){
		var sql = "select * from users u,usertype ut where u.usertypeid=ut.usertypeid and u.userid=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	updateUsers : function(user, callback){
		var sql = "update users set fullname=?, phone=?, email=?, address=?, password=? where userid=?";
		db.execute(sql, [user.name,user.phone,user.email, user.address,user.password, user.uid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}

}