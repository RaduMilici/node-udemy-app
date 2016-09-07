var faker = require('faker');
var todoModel = require('../models/todoModel');

//------------------------------------------------------------------------------
function SetupTodos(app){
  app.get('/api/setupTodos', function(req, res){
    todoModel.GetAll(addFakeUsers);
    res.send('got request');
  });
}
//------------------------------------------------------------------------------
function addFakeUsers(results){
  // if empty, populate DB with fake data
  if(results.length > 0)
    return console.log('DB already populated.');
    
  var fakeUsers = [];
  var num = 3;
  
  for (var i = 0; i < num; i++){
    fakeUsers.push({
      username: faker.name.findName(),
      todo: faker.lorem.sentence(),
      isDone: faker.random.boolean(),
      hasAttachment: faker.random.boolean()
    });
  }
  
  todoModel.Insert(todoModel.ArrayToInsertQuery(fakeUsers));
}
//------------------------------------------------------------------------------

module.exports = {
  SetupTodos
};