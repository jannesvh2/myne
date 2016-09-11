var roleRepairer = {
    run: function (creep) {
        var closestDamagedStructure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.hits < structure.hitsMax - 750 &&
                    structure.hits < 250000)
            }
        });
        if (!closestDamagedStructure) {
            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax - 750 && (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_ROAD) && structure.hits < 130000)
                }
            });
        }
        if (!closestDamagedStructure) {
            for (var myRooms in Game.rooms) {
                if (!closestDamagedStructure) {
                    closestDamagedStructure = Game.rooms[myRooms].find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.hits < structure.hitsMax - 750 &&
                                structure.hits < 250000)
                        }
                    })[0];
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