/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize/types')} DataTypes
 *
 * @param {Sequelize} Sequelize
 * @param {DataTypes} DataTypes
 * @returns
 */
module.exports = (Sequelize, DataTypes) => {
  const Class = Sequelize.define('Class', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: JsonReader.models.class.attack,
    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: JsonReader.models.class.defense,
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: JsonReader.models.class.speed,
    },
    health: {
      type: DataTypes.INTEGER,
      defaultValue: JsonReader.models.class.health,
    },
    fightPoint: {
      type: DataTypes.INTEGER,
      defaultValue: JsonReader.models.class.fightPoint,
    },
    fr: {
      type: DataTypes.TEXT,
    },
    en: {
      type: DataTypes.TEXT,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
    },
  }, {
    tableName: 'class',
    freezeTableName: true,
  });

  Class.beforeSave((instance) => {
    instance.setDataValue('updatedAt',
      require('moment')().format('YYYY-MM-DD HH:mm:ss'));
  });

  /**
   * @param {("fr"|"en")} language - The language the class has to be displayed in
   * @return {String}
   */
  Class.prototype.toString = function (language) {
    return (this.id === 0) ? this[language] : format(
      JsonReader.class.getTranslation(language).weapons.fieldValue, {
      name: this[language],
      rarity: this.getRarityTranslation(language),
      values: this.getValues(language),
    });
  };

  return Class;
};
