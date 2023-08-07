BlockRegistry.createBlock("electricKineticGenerator", [
	{name: "Electric Kinetic Generator", texture: [["machine_bottom", 0], ["ind_furnace_side", 0], ["electric_kinetic_generator_back", 0], ["kinetic_hole", 0], ["ind_furnace_side", 0], ["ind_furnace_side", 0]], inCreative: true},
], "machine");
BlockRegistry.setBlockMaterial(BlockID.electricKineticGenerator, "stone", 1);
ItemName.addTierTooltip(BlockID.electricKineticGenerator, 4);

TileRenderer.setStandardModelWithRotation(BlockID.electricKineticGenerator, 0, [["machine_bottom", 0], ["ind_furnace_side", 0], ["electric_kinetic_generator_back", 0], ["kinetic_hole", 0], ["ind_furnace_side", 0], ["ind_furnace_side", 0]], true);
TileRenderer.registerModelWithRotation(BlockID.electricKineticGenerator, 0, [["machine_bottom", 0], ["ind_furnace_side", 0], ["electric_kinetic_generator_back", 0], ["kinetic_hole", 0], ["ind_furnace_side", 0], ["ind_furnace_side", 0]], true);
TileRenderer.setRotationFunction(BlockID.electricKineticGenerator, true);

Callback.addCallback("PreLoaded", function() {
	Item.addCreativeGroup("AngularGenerators", Translation.translate("Kinetic Generators"), [	
		BlockID.electricKineticGenerator,
		BlockID.manualKineticGenerator
		//BlockID.windKineticGenerator,
		//BlockID.waterKineticGenerator,
		//BlockID.steamKineticGenerator,
	]);
	Recipes.addShaped({id: BlockID.electricKineticGenerator, count: 1, data: 0}, [
		"xbx",
		"xsx",
		"xmx"
	], ['s', ItemID.shaftIron, 0, 'x', ItemID.casingIron, 0, 'm', ItemID.electricMotor, 0, 'b', ItemID.storageBattery, -1]);
});

const guiElectricKineticGenerator = MachineRegistry.createInventoryWindow("Electric Kinetic Generator", {
	drawing: [
		{type: "bitmap", x: 342, y: 110, bitmap: "energy_small_background", scale: GUI_SCALE},
		{type: "bitmap", x: 461, y: 250, bitmap: "heat_generator_info", scale: GUI_SCALE}
	],

	elements: {
		"slot0": {type: "slot", x: 440, y: 120},
		"slot1": {type: "slot", x: 500, y: 120},
		"slot2": {type: "slot", x: 560, y: 120},
		"slot3": {type: "slot", x: 620, y: 120},
		"slot4": {type: "slot", x: 680, y: 120},
		"slot5": {type: "slot", x: 440, y: 180},
		"slot6": {type: "slot", x: 500, y: 180},
		"slot7": {type: "slot", x: 560, y: 180},
		"slot8": {type: "slot", x: 620, y: 180},
		"slot9": {type: "slot", x: 680, y: 180},
		"slotEnergy": {type: "slot", x: 340, y: 180},
		"energyScale": {type: "scale", x: 342, y: 110, direction: 1, value: 0.5, bitmap: "energy_small_scale", scale: GUI_SCALE},
		"textInfo1": {type: "text", font: {size: 24, color: Color.parseColor("#57c4da")}, x: 530, y: 264, width: 300, height: 30, text: "0    /"},
		"textInfo2": {type: "text", font: {size: 24, color: Color.parseColor("#57c4da")}, x: 630, y: 264, width: 300, height: 30, text: "0"}
	}
});

namespace Machine {
	export class ElectricKineticGenerator extends ElectricMachine {
		getTier(): number {
			return 3;
		}

		getScreenByName(): UI.IWindow {
			return guiElectricKineticGenerator;
		}

		setupContainer(): void {
			this.container.setGlobalAddTransferPolicy((container, name, id, amount, data) => {
				if (name == "slotEnergy") {
					return ChargeItemRegistry.isValidStorage(id, "Eu", this.getTier())? amount : 0;
				}
				if (id == ItemID.electricMotor && container.getSlot(name).count == 0) {
					return 1;
				}
				return 0;
			});
		}

		calcOutput(): number {
			let maxOutput = 0;
			for (let i = 0; i < 10; i++) {
				let slot = this.container.getSlot("slot"+i);
				if (slot.id == ItemID.electricMotor) {
					maxOutput += 100;
				}
			}
			return maxOutput;
		}

		onTick(): void {
			let maxOutput = this.calcOutput();
			let output = 0;

			if (this.data.energy >= 1) {
				giveK(this, ths.data.energy, () => {if (output > 0) {
					ths.setActive(true);
					ths.data.energy -= output;
					let outputText = output.toString();
					for (let i = outputText.length; i < 6; i++) {
						outputText += " ";
					}
					ths.container.setText("textInfo1", outputText + "/");
				}})
			}
			if (output == 0) {
				this.setActive(false);
				this.container.setText("textInfo1", "0     /");
			}

			this.dischargeSlot("slotEnergy");

			this.container.setScale("energyScale", this.getRelativeEnergy());
			this.container.setText("textInfo2", maxOutput);
			this.container.sendChanges();
		}

		getEnergyStorage(): number {
			return 4000;
		}

		canRotate(): boolean {
			return true;
		}
	}

	MachineRegistry.registerPrototype(BlockID.electricKineticGenerator, new ElectricKineticGenerator());
}

function giveK(ths, kin, outp) {
	let side = ths.getFacing();
	Logger.Log("qqss", ths.getFacing().toString());
	let coords = StorageInterface.getRelativeCoords(this, side);
	Logger.Log("sqss", coords.x.toString() + ";" + coords.y.toString() + ";" + coords.z.toString());

	let tile = ths.region.getTileEntity(coords) as IMomentOfMomentumConsumer;
	if(tile !== null) {Logger.Log("joosqss", tile.toString());}
	if (tile && tile.canReceiveAngularMomentum && tile.canReceiveAngularMomentum(side ^ 1)) {
		Logger.Log("ss", "angular_electric");
		output = tile.receiveAngularMomentum(Math.min(maxOutput, kin));
		Logger.Log("ss", output.toString());
		if(outp != null) {
			outp();
		}
	}
}
