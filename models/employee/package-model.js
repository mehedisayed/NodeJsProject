var db = require('../db');

module.exports= {
	getAll : function(callback){
		var sql = "select * from packages p,hotel h where h.hotelid=p.hotelid and status='valid'";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getById : function(id, callback){
		var sql = "select * from packages p,hotel h where h.hotelid=p.hotelid and p.packageid=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	insert: function(package, callback){
		var sql = "insert into packages values(?,?,?,?,?)";
		db.execute(sql, [null, package.packagename,package.hotelid,package.totalcost,'valid'], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAllHotel : function(callback){
		var sql = "select * from hotel";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	update: function(package, callback){
		var sql = "update packages set packagename=?, hotelid=?, totalcost=? where packageid=?";
		db.execute(sql, [package.packagename,package.hotelid,package.totalcost, package.packageid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(package, callback){
		var sql = "update packages set status='invalid' where packageid=?";
		db.execute(sql, [package.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}

}