var roleRepairer = {
    run: function (creep) {
        if (!creep.memory.targetId || creep.memory.type != 'repair') {
            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax - 1000 && structure.hits < Memory.spawns[creep.memory.spawn].counters.repairLimit)
                }
            });
            if (!closestDamagedStructure) {
                for (let myRooms = 0, length = Memory.spawns[creep.memory.spawn].random.rooms.length; myRooms < length; myRooms++) {
                    if (!closestDamagedStructure && Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms].name]) {
                        closestDamagedStructure = Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms].name].find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.hits < structure.hitsMax - 1000 &&
                                    structure.hits < Memory.spawns[creep.memory.spawn].counters.repairLimit)
                            }
                        })[0];
                    }
                }


            }
            if (!closestDamagedStructure) {
                Memory.spawns[creep.memory.spawn].counters.repairLimit += 40000;
                return;
            }
            creep.memory.targetId = closestDamagedStructure.id;
            creep.memory.type = 'repair';
        }
        if (creep.memory.targetId) {
            var targetId = Game.getObjectById(creep.memory.targetId);
            if (!targetId) {
                delete creep.memory.type;
                delete creep.memory.targetId;
                return;
            }
            if (creep.repair(targetId) == ERR_NOT_IN_RANGE)
                creep.moveTo(targetId);
            else{
                if(targetId.hits >=  Memory.spawns[creep.memory.spawn].counters.repairLimit || targetId.hits >=  targetId.hitsMax){
                    delete creep.memory.type;
                    delete creep.memory.targetId;
                    return;
                }
            }

        }
        else
            if (creep.pos.roomName == Memory.spawns[creep.memory.spawn].random.mainRoom)
                Memory.spawns[creep.memory.spawn].repairHpHistory[targetId.id] = targetId.hits;
    }
}
}

module.exports = roleRepairer;