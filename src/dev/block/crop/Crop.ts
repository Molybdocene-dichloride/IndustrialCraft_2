/// <reference path="CropTile.ts"/>

BlockRegistry.createBlock("crop", [
	{ name: "crop", texture: [["stick", 0]], inCreative: false }
], { baseBlock: 59, renderType: 6, explosionResistance: 0 });
BlockRegistry.setBlockMaterial(BlockID.crop, "wood");
TileRenderer.setEmptyCollisionShape(BlockID.crop);
BlockRenderer.enableCoordMapping(BlockID.crop, 0, TileRenderer.getCropModel(["stick", 0]));

Block.registerDropFunctionForID(BlockID.crop, function (coords, id, data, diggingLevel, toolLevel) {
	return [];
});

TileEntity.registerPrototype(BlockID.crop, new Agriculture.CropTile());