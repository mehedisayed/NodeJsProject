var db = require('../db');

module.exports= {
	getAll : function(callback){
		var sql = "select * from hotel h,branch b where h.branchid=b.branchid";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getById : function(id, callback){
		var sql = "select * from hotel h,branch b where h.branchid=b.branchid and h.hotelid=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	insert: function(hotel, callback){
		var sql = "insert into hotel values(?,?,?,?,?,?)";
		db.execute(sql, [null, hotel.hotelname,hotel.hoteltype,hotel.roomtype, hotel.hotelimage,hotel.branchid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAllBranch : function(callback){
		var sql = "select * from branch";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	update: function(hotel, callback){
		var sql = "update hotel set hotelname=?, hoteltype=?, roomtype=?, hotelimage=?, branchid=? where hotelid=?";
		db.execute(sql, [hotel.hotelname,hotel.hoteltype,hotel.roomtype, hotel.hotelimage,hotel.branchid, hotel.hotelid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(hotel, callback){
		var sql = "delete from hotel where hotelid=?";
		db.execute(sql, [hotel.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}

}