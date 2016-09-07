var config = require('./config');

function GetDbConnectionObject(){
  return{
    host: 'node-udemy.cloz5p1gecpe.eu-central-1.rds.amazonaws.com',
    port: '3306',
    ssl: 'Amazon RDS',
    database: 'innodb',
    user: config.user,
    password: config.password
  };
}

module.exports = { 
  GetDbConnectionObject
};