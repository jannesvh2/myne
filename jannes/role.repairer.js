var roleRepairer = {
    run: function (creep) {
        var closestDamagedStructure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.hits < structure.hitsMax - 750 &&
                    structure.hits < Memory.spawns[0].counters.repairLimit)
            }
        });
        if (!closestDamagedStructure) {
            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax - 750 && (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_ROAD) && structure.hits < Memory.spawns[0].counters.repairLimit)
                }
            });
        }
        if (!closestDamagedStructure) {
            for (var myRooms, length = Memory.spawns[creep.memory.spawn].random.rooms.length; myRooms < length; myRooms++) {
                if (!closestDamagedStructure) {
                    closestDamagedStructure = Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms]].find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.hits < structure.hitsMax - 750 &&
                                structure.hits < Memory.spawns[0].counters.repairLimit)
                        }
                    })[0];
                }
            }


        }
        if (closestDamagedStructure) {
            if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE)
                creep.moveTo(closestDamagedStructure, { maxOps: 5000 });
        }
        else
            Memory.spawns[0].counters.repairLimit += 30000;
    }
}

module.exports = roleRepairer;