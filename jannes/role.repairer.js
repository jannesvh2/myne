var roleRepairer = {
    run: function (creep) {
            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax - 750 && structure.hits < Memory.spawns[creep.memory.spawn].counters.repairLimit)
                }
            });
        if (!closestDamagedStructure) {
            for (let myRooms = 0, length = Memory.spawns[creep.memory.spawn].random.rooms.length; myRooms < length; myRooms++) {
                if (!closestDamagedStructure && Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms]]) {
                    closestDamagedStructure = Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms]].find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.hits < structure.hitsMax - 750 &&
                                structure.hits < Memory.spawns[creep.memory.spawn].counters.repairLimit)
                        }
                    })[0];
                }
            }


        }
        if (closestDamagedStructure) {
            if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE)
                creep.moveTo(closestDamagedStructure, { maxOps: 5000 });
            else
                if (creep.pos.roomName == Memory.spawns[creep.memory.spawn].random.mainRoom)
                    Memory.spawns[creep.memory.spawn].repairHpHistory[closestDamagedStructure.id] = closestDamagedStructure.hits;
        }
        else {
            Memory.spawns[creep.memory.spawn].counters.repairLimit += 10000;
            Game.notify(`Spawn ${creep.memory.spawn} repairLimit is now ${Memory.spawns[creep.memory.spawn].counters.repairLimit}`);
        }
    }
}

module.exports = roleRepairer;