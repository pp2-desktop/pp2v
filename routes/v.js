var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var config = require('../config.json');
//var url = 'mongodb://localhost:27017/pp2';
var url = config.db.mongo;
var vurl = config.vdb.mongo;
var _db = null;
var _vdb = null;
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  
  _db = db;
});

MongoClient.connect(vurl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to view server");
  
  _vdb = db;
});

router.get('/', function(req, res) {
  res.send('ok');
});

router.get('/:parent/:child/:id/:uid', function(req, res) {
  var parent = req.params.parent;
  var child = req.params.child;
  var id = req.params.id;
  var uid = req.params.uid;

  console.log('parent: ', parent);
  console.log('child: ', child);
  console.log('id: ', id);
  console.log('uid: ', uid);

  var coll = parent + '_' + child;
  var collection = _db.collection(coll);

  var rtn = {};

  var vcollection = _vdb.collection('view');
  
  vcollection.find({uid:uid}).limit(1).toArray(function(err, docs) {
    if(docs.length < 1) {
      vcollection.insert({uid: uid, view_container:[id]}, function(err, docs) {
	if(err) {
	  console.log(err);
	} else {
	}
      });
    } else {
      vcollection.update(
	{ _id: ObjectId(docs[0]._id) },
	{ $addToSet: { view_container: id } }
      );
    }
  });
    
  /*
  _vdb.inventory.update(
    { _id: 1 },
    { $addToSet: { tags: "accessories" } }
  );
   */

  /*
  collection.findOne({_id:ObjectId(id)},function(err, doc) {
    console.log("Printing docs from Array. count " + JSON.stringify(doc));
    rtn.v = doc;
    
    collection.find({ '_id': {'$lt': ObjectId(id)}}, { '_id': 1 }).sort({"_id":-1}).limit(1).toArray(function(err, docs) {
      if(docs.length < 1) {
	rtn.prev = '';
      } else {
	rtn.prev = docs[0]._id;
      }

      collection.find({ '_id': {'$gt': ObjectId(id)}}, { '_id': 1 }).sort({'_id': 1}).limit(1).toArray(function(err, docs) {
	
	if(docs.length < 1) {
	  rtn.next = '';
	} else {
	  rtn.next = docs[0]._id;
	}
	rtn.result = true;
	res.end(JSON.stringify(rtn));
      });
      
    });
  });
  */

  collection.update({ _id : ObjectId(id) }
		    , { $inc: { view : 1 } }, function(err, result) {

		      if(err) {
			console.log('[error] increment view count');
		      }
		    });
  

    collection.findOne({_id:ObjectId(id)},function(err, doc) {
    console.log("Printing docs from Array. count " + JSON.stringify(doc));
    rtn.v = doc;
    
    collection.find({ 'date': {'$lt': doc.date}}, { '_id': 1, 'date': 1}).sort({"date":-1}).limit(1).toArray(function(err, docs) {
      if(docs.length < 1) {
	rtn.prev = '';
      } else {
	rtn.prev = docs[0]._id;
      }

      collection.find({ 'date': {'$gt': doc.date}}, { '_id': 1, 'date': 1 }).sort({'date': 1}).limit(1).toArray(function(err, docs) {
	
	if(docs.length < 1) {
	  rtn.next = '';
	} else {
	  rtn.next = docs[0]._id;
	}
	rtn.result = true;
	res.end(JSON.stringify(rtn));
      });
      
    });
  });
  
  
});

module.exports = router;

