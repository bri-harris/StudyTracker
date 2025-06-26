/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('UsersTesting').insertMany([
  { 'firstName': 'Bri', 'lastName': 'Harris', 'class': 'CEN3031', 'grade': 100 },
  { 'firstName': 'Alex', 'lastName': 'De Luera', 'class': 'CEN3031','grade': 100 },
  { 'firstName': 'Aravind', 'lastName': 'Ithikka', 'class': 'CEN3031','grade': 100 },
  { 'firstName': 'Alyssa', 'lastName': 'Williams', 'class': 'CEN3031','grade': 100 },

]);

// Insert a few documents into the course collection.
db.getCollection('CEN3031').insertMany([
  { 'AssignmentType': 'Homework','moduleNumber': 1,'AssignmentName': 'Homework1', 'Submitted': 'yes', 'PossiblePoints': 20,'PointsReceived' :18, 'dueDate': new Date('2025-06-01T00:00:00Z') },
  { 'AssignmentType': 'Homework','moduleNumber': 2, 'AssignmentName': 'Homework2','Submitted': 'no', 'PossiblePoints': 20,'PointsReceived' :null, 'dueDate': new Date('2025-06-02T00:00:00Z') },
]);

// Run a find command to view assignments due between June 1st and June 2nd, 2025.
const assignmentsDueJune1 = db.getCollection('CEN3031').find({
  dueDate: { $gte: new Date('2025-06-01'), $lt: new Date('2025-06-02') }
}).count();

// Print a message to the output window.
console.log(`${assignmentsDueJune1} assignments due June 1st and June 2nd`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('UsersTesting').aggregate([
  { $match: { class: 'CEN3031' }}]);
  //   // Find all of the sales that occurred in 2014.
//   { $match: { class: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
//   // Group the total sales for each product.
//   { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
// ]);
