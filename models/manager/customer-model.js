var db = require('../db');

module.exports= {
	getAll : function(callback){
		var sql = "select * from users u,usertype ut where u.usertypeid=ut.usertypeid and ut.usertypename='customer'";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
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
	getAllUserType : function(callback){
		var sql = "select * from usertype where usertypename='customer'";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	insert: function(user, callback){
		var sql = "insert into users values(?,?,?,?,?,?,?,?)";
		db.execute(sql, [null, user.name, user.phone, user.email,user.address,user.usertypeid,user.username,user.password], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update : function(user, callback){
		var sql = "update users set fullname=?, phone=?, email=?, address=?, usertypeid=? where userid=?";
		db.execute(sql, [user.name,user.phone,user.email, user.address,user.usertypeid, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from users where userid=?";
		db.execute(sql, [user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}

}