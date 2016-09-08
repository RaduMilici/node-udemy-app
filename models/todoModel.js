var mysql = require('mysql');
var config = require('../config');
var connection = mysql.createConnection(config.GetDbConnectionObject());
var tableColumns = 'id, username, todo, isDone, hasAttachment';
//------------------------------------------------------------------------------
function Insert(val, callback){
  var insertQuery = 
    'INSERT INTO todos (' + tableColumns + ') VALUES ' + val + ';';
  query(insertQuery, callback);
}
//------------------------------------------------------------------------------
function UpdateByUsername(name, val, callback){
  var updateQuery = 
  'UPDATE todos SET '+ObjToUpdateQuery(val)+' WHERE username = "' + name + '";';
  query(updateQuery, callback); 
}
//------------------------------------------------------------------------------
function UpdateById(id, val, callback){
  var updateQuery = 
    'UPDATE todos SET ' + ObjToUpdateQuery(val) + ' WHERE id = "' + id + '";';
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
function GetById(id, callback){
  var getByUsernameQuery = 'SELECT * FROM todos WHERE id = "' + id + '";';
  query(getByUsernameQuery, callback);
}
//------------------------------------------------------------------------------
function DeleteByUsername(name, callback){
  var deleteByNameQuery = 'DELETE FROM todos WHERE username = "' + name + '";';
  query(deleteByNameQuery, callback);
}
//------------------------------------------------------------------------------
function DeleteById(id, callback){
  var deleteByNameQuery = 'DELETE FROM todos WHERE id = "' + id + '";';
  query(deleteByNameQuery, callback);
}
//------------------------------------------------------------------------------
function ObjToUpdateQuery(obj){
  var arr = [];

  for (var property in obj) 
    if (obj.hasOwnProperty(property) && tableColumns.indexOf(property) > -1) 
      arr.push(property + ' = ' + obj[property]);
    
  return arr.join(',');
}
//------------------------------------------------------------------------------
function ObjToInsertQuery(obj){
  return [
    '("' + obj.id       + '"',
    '"'  + obj.username + '"',
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
  GetById,
  GetByUsername,
  DeleteById,
  DeleteByUsername,
  UpdateById,
  UpdateByUsername,
  ObjToInsertQuery,
  ArrayToInsertQuery
};