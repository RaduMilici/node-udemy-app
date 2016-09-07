var mysql = require('mysql');
var config = require('../config');
var connection = mysql.createConnection(config.GetDbConnectionObject());
//------------------------------------------------------------------------------
function Insert(val, callback){
  var insertQuery = 
  'INSERT INTO todos (username, todo, isDone, hasAttachment) VALUES ' + val + ';';
  query(insertQuery, callback);
}
//------------------------------------------------------------------------------
function UpdateByUsername(name, val, callback){
  var updateQuery = 
  'UPDATE todos SET ' + ObjToUpdateQuery(val) + ' WHERE username = "' + name + '";';
  query(updateQuery, callback);
}
//------------------------------------------------------------------------------
function GetAll(callback){
  var getQuery = 'SELECT * FROM todos;';
  query(getQuery, callback);
}
//------------------------------------------------------------------------------
function GetByUsername(name, callback){
  var getByUsernameQuery =
    'SELECT * FROM todos WHERE username = "' + name + '";';
  query(getByUsernameQuery, callback);
}
//------------------------------------------------------------------------------
function DeleteByUsername(name, callback){
  var deleteByNameQuery = 'DELETE FROM todos WHERE username = "' + name + '";';
  query(deleteByNameQuery, callback);
}
//------------------------------------------------------------------------------
function ObjToUpdateQuery(obj){
  var arr = [];
  
  if(obj.username !== undefined)
    arr.push('username = "' + obj.username + '"');
    
  if(obj.todo !== undefined)
    arr.push('todo = "' + obj.todo + '"');
  
  if(obj.isDone !== undefined)
    arr.push('isDone = ' + obj.isDone);
  
  if(obj.hasAttachment !== undefined)
    arr.push('hasAttachment = ' + obj.hasAttachment);
    
  return arr.join(',');
}
//------------------------------------------------------------------------------
function ObjToInsertQuery(obj){
  return [
    '("' + obj.username + '"',
    '"'  + obj.todo     + '"',
           obj.isDone,
           obj.hasAttachment + ')'
  ].join(',');
}
//------------------------------------------------------------------------------
function ArrayToInsertQuery(arr){
  var q = [];
  
  arr.forEach(function(obj){
    q.push(ObjToInsertQuery(obj));
  });
  
  return q.join(','); 
}
//------------------------------------------------------------------------------
function query(q, callback){
  callback = callback || function(){};
  
  connection.query(q, function(error, results, fields){
  if(error)
    throw error;
  
  callback(results, fields);
  });
}
//------------------------------------------------------------------------------

module.exports = {
  Insert,
  GetAll,
  DeleteByUsername,
  GetByUsername,
  UpdateByUsername,
  ObjToInsertQuery,
  ArrayToInsertQuery
};