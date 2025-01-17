import {Constants} from "../../../../core/Constants";
import {Armors} from "../../../../core/models/Armor";
import {Weapons} from "../../../../core/models/Weapon";
import {Potions} from "../../../../core/models/Potion";
import {ObjectItems} from "../../../../core/models/ObjectItem";
import {Entities} from "../../../../core/models/Entity";

module.exports.commandInfo = {
	name: "giveitem",
	commandFormat: "<category [0-3]> <item id>",
	typeWaited: {
		"category [0-3]": typeVariable.INTEGER,
		"item id": typeVariable.INTEGER
	},
	messageWhenExecuted: "Vous avez reçu {item} !",
	description: "Permet de se donner un objet"
};

/**
 * Set the weapon of the player
 * @param {("fr"|"en")} language - Language to use in the response
 * @param {module:"discord.js".Message} message - Message from the discord server
 * @param {String[]} args=[] - Additional arguments sent with the command
 * @return {String} - The successful message formatted
 */
const giveItemTestCommand = async (language, message, args) => {
	const [entity] = await Entities.getOrRegister(message.author.id);
	const itemId = parseInt(args[1],10);
	const category = parseInt(args[0], 10);
	if (category < 0 || category > 3) {
		throw Error("Catégorie inconnue. Elle doit être en 0 et 3");
	}
	let item = null;
	switch (category) {
	case Constants.ITEM_CATEGORIES.WEAPON:
		item = itemId <= await Weapons.getMaxId() && itemId > 0 ? await Weapons.getById(itemId) : null;
		break;
	case Constants.ITEM_CATEGORIES.ARMOR:
		item = itemId <= await Armors.getMaxId() && itemId > 0 ? await Armors.getById(itemId) : null;
		break;
	case Constants.ITEM_CATEGORIES.POTION:
		item = itemId <= await Potions.getMaxId() && itemId > 0 ? await Potions.getById(itemId) : null;
		break;
	case Constants.ITEM_CATEGORIES.OBJECT:
		item = itemId <= await ObjectItems.getMaxId() && itemId > 0 ? await ObjectItems.getById(itemId) : null;
		break;
	default:
		break;
	}
	if (item === null) {
		throw Error("Aucun objet n'existe dans cette catégorie avec cet id");
	}
	if (!await entity.Player.giveItem(item)) {
		throw Error("Aucun emplacement libre dans l'inventaire");
	}

	return format(module.exports.commandInfo.messageWhenExecuted, {
		item: item.toString(language)
	});
};

module.exports.execute = giveItemTestCommand;