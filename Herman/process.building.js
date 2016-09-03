var processBuilding = {
    run: function(creep) {
        
        //Roads
        var found = creep.room.lookForAt(LOOK_STRUCTURES, 24, 28);
        if(found.length) {
            Game.spawns['Spawn1'].room.createConstructionSite( 24, 28, STRUCTURE_ROAD );
        }
        
        //RamParts
        var found = creep.room.lookForAt(LOOK_STRUCTURES, 37, 32);
        if(found.length) {
            Game.spawns['Spawn1'].room.createConstructionSite( 37, 32, STRUCTURE_RAMPART );
        }
	}
};

module.exports = processBuilding;