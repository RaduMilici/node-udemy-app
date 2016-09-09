var mysql = require('mysql');
var config = require('../config');
var connection = mysql.createConnection(config.GetDbConnectionObject());
var tableColumns = 'id, username, todo, isDone, hasAttachment';
//------------------------------------------------------------------------------
function Insert(val, callback){
  query('INSERT INTO todos (' + tableColumns + ') VALUES ' + val + ';', 
    callback);
}
//------------------------------------------------------------------------------
function UpdateByUsername(name, val, callback){
  query('UPDATE todos SET ' + ObjToUpdateQuery(val) + ' WHERE username = "' 
    + name + '";', callback); 
}
//------------------------------------------------------------------------------
function UpdateById(id, val, callback){
  query('UPDATE todos SET ' + ObjToUpdateQuery(val) + ' WHERE id = "' + id + 
    '";', callback); 
}
//------------------------------------------------------------------------------
function GetAll(callback){
  query('SELECT * FROM todos;', callback);
}
//------------------------------------------------------------------------------
function GetByUsername(name, callback){
  query('SELECT * FROM todos WHERE username = "' + name + '";', callback);
}
//------------------------------------------------------------------------------
function GetById(id, callback){
  query('SELECT * FROM todos WHERE id = "' + id + '";', callback);
}
//------------------------------------------------------------------------------
function DeleteByUsername(name, callback){
  query('DELETE FROM todos WHERE username = "' + name + '";', callback);
}
//------------------------------------------------------------------------------
function DeleteById(id, callback){
  query('DELETE FROM todos WHERE id = "' + id + '";', callback);
}
//------------------------------------------------------------------------------
function ObjToUpdateQuery(obj){
  var arr = [];

  for (var property in obj){ 
    if (obj.hasOwnProperty(property) && tableColumns.indexOf(property) > -1){
      var str = property + ' = ';
      
      if(obj[property] === 'true' || obj[property] === 'false')
        str += obj[property];
      else
        str += '"' + obj[property] + '"';
        
      arr.push(str);
    } 
  }
    
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