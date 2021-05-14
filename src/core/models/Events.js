/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize/types')} DataTypes
 *
 * @param {Sequelize} Sequelize
 * @param {DataTypes} DataTypes
 * @returns
 */
module.exports = (Sequelize, DataTypes) => {
	const Events = Sequelize.define('Events', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
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
		restricted_maps: {
			type: DataTypes.TEXT
		},
	}, {
		tableName: 'events',
		freezeTableName: true,
	});

	Events.beforeSave((instance) => {
		instance.setDataValue('updatedAt',
			require('moment')().format('YYYY-MM-DD HH:mm:ss'));
	});

	/**
	 * @return {Promise<String[]>}
	 */
	Events.prototype.getReactions = async function () {
		const possibilities = await this.getPossibilities();
		const reactions = [];
		for (const possibility of possibilities) {
			reactions.push(possibility.possibilityKey);
		}
		return reactions;
	};

	/**
	 * Pick a random event compatible with the given map type
	 * @param {string} map_type
	 * @returns {Promise<Events>}
	 */
	Events.pickEventOnMapType = async function (map_type) {
		const query = `SELECT * FROM events WHERE id > 0 AND id < 9999 AND (restricted_maps = '' OR restricted_maps LIKE :map_type) ORDER BY RANDOM() LIMIT 1;`;
		return await Sequelize.query(query, {
			model: Events,
			replacements: {
				map_type: '%' + map_type + '%',
			},
			type: Sequelize.QueryTypes.SELECT,
		});
	}

	return Events;
};
