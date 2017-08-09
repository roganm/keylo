exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('listings').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};

exports.seed = function seed(knex, Promise) {
const tableName = 'listings';

const data = require('./data.json');

var rows = [
    {
      name: 'Shreyansh Pandey',
      username: 'labsvisual',
      password: 'password',
      email: 'me@isomr.co',
      guid: 'f03ede7c-b121-4112-bcc7-130a3e87988c',
    },

  ];

  return knex(tableName)
    // Empty the table (DELETE)
    .del()
    .then(function() {
      return knex.insert(rows).into(tableName);
    });
};