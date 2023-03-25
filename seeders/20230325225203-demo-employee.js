module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Employees', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      password:'12344',
      gender:'male',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};