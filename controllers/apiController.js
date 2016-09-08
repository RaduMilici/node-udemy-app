var shortid = require('shortid');
var bodyParser = require('body-parser');
var todoModel = require('../models/todoModel');

//------------------------------------------------------------------------------
function SetupApi(app){
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  //GET
  app.get('/api/todo/:uname', function(req, res){
    todoModel.GetByUsername(req.params.uname, function(results){
      res.send(results);
    });
  });
  
  //POST
  app.post('/api/todo', function(req, res){
    // passing a username means update existing
    if(req.body.id !== undefined){
      var updateObj = {
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      };
      
      todoModel.UpdateById(req.body.id, updateObj, function(){
        res.send('Successfully updated ' + req.body.username);
      });
    }
    // no username passed, insert new into db 
    else{
      req.body.username = 'test';
      req.body.id = shortid.generate();
      
      todoModel.Insert(todoModel.ObjToInsertQuery(req.body), function(){
        res.send('Added ' + req.body.username + ' to db');
      });
    }
  });
  
  //DELETE
  app.delete('/api/todo', function(req, res){
    todoModel.DeleteByUsername(req.body.username, function(){
      res.send('Successfully deleted ' + req.body.username + ' from db');
    });
  });
}
//------------------------------------------------------------------------------

module.exports = {
  SetupApi
};