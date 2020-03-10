var db = require('../db');

module.exports= {
	getAll : function(callback){
		var sql = "select b.*,p.placename from branch b,place p where p.placeid=b.placeid";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getById : function(id, callback){
		var sql = "select b.*,p.placename from branch b,place p where p.placeid=b.placeid and b.branchid=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	insert: function(branch, callback){
		var sql = "insert into branch values(?,?,?,?)";
		db.execute(sql, [null, branch.branchname,branch.image,branch.placeid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAllPlace : function(callback){
		var sql = "select * from place";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	update: function(branch, callback){
		var sql = "update branch set branchname=?, image=?,placeid=? where branchid=?";
		db.execute(sql, [branch.branchname,branch.image, branch.placeid,branch.branchid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(branch, callback){
		var sql = "delete from hotel where branchid=?";
		db.execute(sql, [branch.id], function(status){
			if(status){
				var sql = "delete from branch where branchid=?";
				db.execute(sql, [branch.id], function(status){
					if(status){
						callback(true);
					}else{
						callback(false);
					}
				});
			}else{
				callback(false);
			}
		});
	}

}