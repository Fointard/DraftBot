module.exports.help = {
	name: "backupid",
	commandFormat: "<id>",
	typeWaited: {
		id: typeVariable.INTEGER
	},
	messageWhenExecuted: "Vous avez maintenant l'objet de backup {backup} !",
	description: "Change l'objet de backup de votre joueur"
};

/**
 * Set the backup object of the player
 * @param {("fr"|"en")} language - Language to use in the response
 * @param {module:"discord.js".Message} message - Message from the discord server
 * @param {String[]} args=[] - Additional arguments sent with the command
 * @return {String} - The successful message formatted
 */
const backupid = async (language, message, args) => {
	const [entity] = await Entities.getOrRegister(message.author.id);

	entity.Player.Inventory.backupId = parseInt(args[0],10);
	let backupText;
	try {
		backupText = await (await entity.Player.Inventory.getBackupObject()).toFieldObject(language, "").value;
	}
	catch (e) {
		throw new Error("Objet avec id inexistant : " + args[0]);
	}
	entity.Player.Inventory.save();

	return format(module.exports.infos.messageWhenExecuted, {backup: backupText});
};

module.exports.execute = backupid;