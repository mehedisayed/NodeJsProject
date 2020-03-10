var db = require('./db');

module.exports= {
	getByUsername : function(user, callback){
		var sql = "select * from users u,usertype ut where u.usertypeid=ut.usertypeid and u.username=? and u.password=?";
		db.getResults(sql, [user.username,user.password], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	}

}