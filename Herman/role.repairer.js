var roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep,repairerCounter) {

	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('repairing');
	    }

	    if(creep.memory.repairing) {
	        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_WALL && structure.hits < 100000) ||
                                (structure.structureType == STRUCTURE_SPAWN && structure.hits < structure.hitsMax) ||
                                (structure.structureType == STRUCTURE_TOWER && structure.hits < structure.hitsMax) ||
                                //(structure.structureType == STRUCTURE_RAMPART && structure.hits < 120000) ||
                                (structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax)
                                );
                    }
            });
            
            var targetsRamp = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART && structure.hits < 120000
                                );
                    }
            });
            if (repairerCounter > 0 && targetsRamp.length > 0) {
                if(creep.repair(targetsRamp[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetsRamp[0]);
                }
            }
            else if(targets.length > 0) {
                if(creep.repair(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
	    }
	}
};

module.exports = roleRepair;