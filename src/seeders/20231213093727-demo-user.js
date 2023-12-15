'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        email: 'hahaha@gmail.com',
       password: '123456',
       username: 'okok'
      },
      {
        email: 'hahaha@gmail.com',
        password: '123456',
        username: 'okok2'
      },
      {
        email: 'hahaha@gmail.com',
        password: '123456',
        username: 'okok3'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
