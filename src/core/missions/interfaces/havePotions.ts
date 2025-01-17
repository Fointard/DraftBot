import {IMission} from "../IMission";
import Player from "../../models/Player";
import {countNbOfPotions} from "../../utils/ItemUtils";

export const missionInterface: IMission = {
	areParamsMatchingVariant(): boolean {
		return true;
	},

	getVariantFormatVariable(): Promise<string> {
		return Promise.resolve("");
	},

	generateRandomVariant(): Promise<number> {
		return Promise.resolve(0);
	},

	initialNumberDone(player: Player): Promise<number> {
		return Promise.resolve(countNbOfPotions(player));
	}
};