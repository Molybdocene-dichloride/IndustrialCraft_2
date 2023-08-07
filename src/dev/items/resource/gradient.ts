ItemRegistry.createItem("rotorWooden", {name: "Wooden rotor", icon: "rotor_wooden"});
ItemRegistry.createItem("rotorIron", {name: "Iron rotor", icon: "rotor_iron"});
ItemRegistry.createItem("rotorSteel", {name: "Steel rotor", icon: "rotor_steel"});
ItemRegistry.createItem("rotorCarbon", {name: "Carbon rotor", icon: "rotor_carbon"});

ItemRegistry.createItem("bladeWooden", {name: "Wooden blade", icon: "rotor_blade_wooden"});
ItemRegistry.createItem("bladeIron", {name: "Iron blade", icon: "rotor_blade_iron"});
ItemRegistry.createItem("bladeSteel", {name: "Steel blade", icon: "rotor_blade_steel"});
ItemRegistry.createItem("bladeCarbon", {name: "Carbon blade", icon: "rotor_blade_carbon"});

Item.addCreativeGroup("blade", Translation.translate("Rotor Blades"), [
	ItemID.bladeWooden,
	ItemID.bladeIron,
	ItemID.bladeSteel,
	ItemID.bladeCarbon,
]);

Item.addCreativeGroup("rotor", Translation.translate("Rotors"), [ //div rot
	ItemID.rotorWooden,
	ItemID.rotorIron,
	ItemID.rotorSteel,
	ItemID.rotorCarbon,
]);

RotorRegistry.registerRotor(ItemID.rotorWooden, new RotorRegistry.RotorTile("wooden", 5, new Vector3(0, 0, 0), 0.25, 10800, new RotorRegistry.WindStrengthRange{min: 10, max: 60}));
//bronze
RotorRegistry.registerRotor(ItemID.rotorIron, new RotorRegistry.RotorTile("iron", 7, new Vector3(0, 0, 0), 0.5, 86400, new RotorRegistry.WindStrengthRange{min: 14, max: 75}))
RotorRegistry.registerRotor(ItemID.rotorSteel, new RotorRegistry.RotorTile("steel", 9, new Vector3(0, 0, 0), 0.75, 182800, new RotorRegistry.WindStrengthRange{min: 17, max: 90}))
RotorRegistry.registerRotor(ItemID.rotorCarbon, new RotorRegistry.RotorTile("carbon", 11, new Vector3(0, 0, 0), 1, 604800, new RotorRegistry.WindStrengthRange{min: 20, max: 110}))
