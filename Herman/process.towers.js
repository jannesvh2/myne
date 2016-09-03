var processTowers = {
    run: function(tower) {
        if(tower) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            
            var closestInjuredCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (injuredCreep) => injuredCreep.hits < injuredCreep.hitsMax
            });
            
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_WALL && structure.hits < 2000) ||
                                (structure.structureType == STRUCTURE_SPAWN && structure.hits < structure.hitsMax) ||
                                (structure.structureType == STRUCTURE_TOWER && structure.hits < structure.hitsMax) ||
                                (structure.structureType == STRUCTURE_RAMPART && structure.hits < 30000) ||
                                (structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax)
                                );
                }
            });
            
            if(closestHostile) {
                tower.attack(closestHostile);
            }
            else if(closestInjuredCreep) {
                tower.heal(closestInjuredCreep);
            }
            else if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
        }
	}
};

module.exports = processTowers;