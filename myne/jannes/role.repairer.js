var roleRepairer = {
    run: function (creep) {
        if (!creep.memory.targetId || creep.memory.type != 'repair') {
            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType != STRUCTURE_CONTAINER && (structure.hits < structure.hitsMax - 1000 && structure.hits < Memory.spawns[creep.memory.spawn].counters.repairLimit))
                }
            });
            if (!closestDamagedStructure) {
                closestDamagedStructure = Game.rooms[Memory.spawns[creep.memory.spawn].random.mainRoom].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType != STRUCTURE_CONTAINER && (structure.hits < structure.hitsMax - 1000 &&
                            structure.hits < Memory.spawns[creep.memory.spawn].counters.repairLimit))
                    }
                })[0];


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
            if (!targetId || targetId.hits >= targetId.hitsMax - 1000) {
                delete creep.memory.type;
                delete creep.memory.targetId;
                return;
            }
            if (creep.repair(targetId) == ERR_NOT_IN_RANGE)
                creep.moveTo50(targetId);
            else {
                if (creep.pos.roomName == Memory.spawns[creep.memory.spawn].random.mainRoom)
                    Memory.spawns[creep.memory.spawn].repairHpHistory[targetId.id] = targetId.hits;

                if (targetId.hits >= Memory.spawns[creep.memory.spawn].counters.repairLimit || targetId.hits >= targetId.hitsMax) {
                    delete creep.memory.type;
                    delete creep.memory.targetId;
                    return;
                }
            }

        }
    }
}

module.exports = roleRepairer;