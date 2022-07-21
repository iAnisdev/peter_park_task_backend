module.exports = (sequelize, Sequelize) => {
    const Permit = sequelize.define("permit", {
      licence: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.STRING
      },
      endDate: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      }
    });
    return Permit;
  };