import {
	Sequelize,
	Model,
	DataTypes
} from "sequelize";
import moment = require("moment");
import {Data} from "../Data";

export class Server extends Model {
	public id!: number;

	public prefix!: string;

	public language!: string;

	public discordGuildId!: number;

	public updatedAt!: Date;

	public createdAt!: Date;
}

export class Servers {
	static async getOrRegister(discordGuildId: number) {
		return await Server.findOrCreate({
			where: {
				discordGuildId: discordGuildId
			}
		});
	}
}

export function initModel(sequelize: Sequelize) {
	const data = Data.getModule("models.servers");

	Server.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		prefix: {
			type: DataTypes.STRING(10), // eslint-disable-line new-cap
			defaultValue: data.getString("prefix")
		},
		language: {
			type: DataTypes.STRING(2), // eslint-disable-line new-cap
			defaultValue: data.getString("language")
		},
		discordGuildId: {
			type: DataTypes.STRING(64) // eslint-disable-line new-cap
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: require("moment")().format("YYYY-MM-DD HH:mm:ss")
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: require("moment")().format("YYYY-MM-DD HH:mm:ss")
		}
	}, {
		sequelize,
		tableName: "servers",
		freezeTableName: true
	});

	Server.beforeSave(instance => {
		instance.updatedAt = moment().toDate();
	});
}

export default Server;