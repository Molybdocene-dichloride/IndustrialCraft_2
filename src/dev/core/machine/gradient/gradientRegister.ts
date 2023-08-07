namespace RotorRegistry {
	rotors: RotorTile[];
	rotorById: RotorTile[];
	
	registerRotor(id: ItemID, tile: RotorTile): void {
		rotors.push(tile);
		rotorsById[id] = tile;
		//socket (initClient)
	}
	
	initClient() {
		for(let rotor of rotors) {
			//rotor.initProto(rotor.size);
	  		//BlockRenderer.enableCoordMapping(BlockID[rotor.id], 0, rotor.model)
		}
	}
}
