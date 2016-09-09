var roleRepairer = {
    run: function (creep) {
        var closestDamagedStructure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.hits < structure.hitsMax &&
                    structure.hits < 200000)
            }
        });
        if (!closestDamagedStructure) {
            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_ROAD && structure.hits < 200000 && structure.hits > 1000)
                }
            });
        }
        if (!closestDamagedStructure) {
            for (var myRooms in Game.rooms) {
                if (!closestDamagedStructure) {
                    closestDamagedStructure = Game.rooms[myRooms].find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.hits < structure.hitsMax &&
                                structure.hits < 200000)
                        }
                    });
                }
            }

            
        }
        if (closestDamagedStructure) {
            if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE)
                creep.moveTo(closestDamagedStructure);
        }
    }
}

module.exports = roleRepairer;