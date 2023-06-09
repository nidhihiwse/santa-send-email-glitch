const fakeDB = [];

// Function to add a new record to the database
const addRecord = (record) => {
  fakeDB.push(record);
  console.log('Record added:', record);
};

// Function to retrieve all records from the database
const getAllRecords = () => {
  return fakeDB;
};

// Function to remove all records from the database
const removeAllRecords = () => {
    return fakeDB.length = 0;
};

// Export the functions
module.exports = {
  addRecord,
  getAllRecords,
  removeAllRecords
};