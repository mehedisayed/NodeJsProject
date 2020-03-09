var db = require('../db');

module.exports= {
	getAll : function(callback){
		var sql = "select * from place ";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getById : function(id, callback){
		var sql = "select * from place where placeid=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	insert: function(place, callback){
		var sql = "insert into place values(?,?,?)";
		db.execute(sql, [null, place.placename,place.image], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(place, callback){
		var sql = "update place set placename=?,image=? where placeid=?";
		db.execute(sql, [place.placename,place.image, place.placeid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(place, callback){
		var sql = "delete from place where placeid=?";
		db.execute(sql, [place.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}

}