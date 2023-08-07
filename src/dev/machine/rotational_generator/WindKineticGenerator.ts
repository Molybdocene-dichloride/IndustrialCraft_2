BlockRegistry.createBlock("windKineticGenerator", [
	{name: "Wind Kinetic Generator", texture: [["machine_bottom", 0], ["ind_furnace_side", 0], ["heat_generator_side", 0], ["heat_pipe", 0], ["ind_furnace_side", 0], ["ind_furnace_side", 0]], inCreative: true},
], "machine");
BlockRegistry.setBlockMaterial(BlockID.windKineticGenerator, "stone", 1);
ItemName.addTierTooltip(BlockID.windKineticGenerator, 4);

TileRenderer.setStandardModelWithRotation(BlockID.windKineticGenerator, 0, [["machine_bottom", 0], ["ind_furnace_side", 0], ["heat_generator_side", 0], ["heat_pipe", 0], ["ind_furnace_side", 0], ["ind_furnace_side", 0]], true);
TileRenderer.registerModelWithRotation(BlockID.windKineticGenerator, 0, [["machine_bottom", 0], ["ind_furnace_side", 1], ["heat_generator_side", 1], ["heat_pipe", 1], ["ind_furnace_side", 1], ["ind_furnace_side", 1]], true);
TileRenderer.setRotationFunction(BlockID.windKineticGenerator, true);

Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: BlockID.windKineticGenerator, count: 1, data: 0}, [
		"sms"
	], ['s', ItemID.shaftIron, 0, 'm', BlockID.machineBlock, 0]);
});

const guiWindKineticGenerator = MachineRegistry.createInventoryWindow("Wind Kinetic Generator", {
	drawing: [
		{type: "bitmap", x: 342, y: 110, bitmap: "energy_small_background", scale: GUI_SCALE},
		{type: "bitmap", x: 461, y: 250, bitmap: "heat_generator_info", scale: GUI_SCALE}
	],

	elements: {
		"slotR": {type: "slot", x: 440, y: 120}
	}
});

namespace Machine {
	export class WindKineticGenerator extends MachineBase {

		hasBlock(size: number, side: Vector): void {
			for (let a = -size; a <= size; a++)
			for (let y = -size; y <= size; y++) {
				if (this.blockSource.getBlockId(this.x + (side * a).x, this.y + y, this.z + (side * a).z) != 0) {
					return true;
				}
			}
			return false;
		}
		
		getScreenByName(): UI.IWindow {
			return guiWindKineticGenerator;
		}
		
		onTick(): void {
			let slot = this.container.getSlot("slotR");
			let rtile = RotorRegistry.rotorById(slot.id)
			if (rtile != null) {
				//if rotor obstructed - not rotate
				let side = this.getFacing();
				let coords = StorageInterface.getRelativeCoords(this, side);
				let obstructed = hasBlock(rtile.size, coords);
				if(!obstructed) {
					//calculate wind properties (WindSim) and kU
					let wind = WindSim.getWindAt(this.x);
					//create and send kU to front of kinetic generator, damage rotor
					if(wind > rtile.strengthWind.max) {
						rtile.durability -= 1 * 4; //dmg?!
					} else {
						rtile.durability -= 1;
					}

					if(wind > rtile.strengthWind.min) {
						let KU = wind * rtile.efficiency;
						giveK(this, KU);
					}
				}
			}
		}
		
		canRotate(): boolean {
			return true;
		}
	}
	
	MachineRegistry.registerPrototype(BlockID.windKineticGenerator, new WindKineticGenerator());
}
