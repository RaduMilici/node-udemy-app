var faker = require('faker');
var todoModel = require('../models/todoModel');

//------------------------------------------------------------------------------
function SetupTodos(app){
  app.get('/api/setupTodos', function(req, res){
    todoModel.GetAll(addFakeUsers);
  });
}
//------------------------------------------------------------------------------
function addFakeUsers(results){
  //if empty, populate DB with fake data
  if(results.length > 0)
    return console.log('DB already populated.');
    
  var starterTodos = '';
  var fakeUsers = 3;
  
  for (var i = 0; i < fakeUsers; i++){
    starterTodos += 
    '("' + faker.name.findName()  + '",' +
    '"'  + faker.lorem.sentence() + '",' +
         + faker.random.boolean() + ','  +
         + faker.random.boolean() + '),';
  }
  
  starterTodos = starterTodos.slice(0, -1); // remove last ',' in array
    
  todoModel.Insert(starterTodos);
}
//------------------------------------------------------------------------------

module.exports = {
  SetupTodos: SetupTodos
}