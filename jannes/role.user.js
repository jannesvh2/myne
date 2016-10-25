var roleUser = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
        }
        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
        }
        if (creep.memory.full) {
            var targets = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity / 2;
                }
            });
            if (!targets) {
                targets = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_LAB ||
                                (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity - 250)) && structure.energy < structure.energyCapacity;
                    }
                });
            }
            if (!targets) {
                for (let myRooms = 0, length = Memory.spawns[creep.memory.spawn].random.rooms.length; myRooms < length; myRooms++) {
                    if (Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms.name[myRooms]]) {
                        var targets = Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms.name[myRooms]].find(FIND_MY_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION ||
                                        structure.structureType == STRUCTURE_SPAWN ||
                                        (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity - 250)) && structure.energy < structure.energyCapacity;
                            }
                        })[0];
                        if (targets)
                            break;
                    }
                }
            }
            if (!targets && creep.carry.energy != creep.carryCapacity) {
                creep.memory.full = false;
            }
            if (targets) {
                if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
            else if (Memory.spawns[creep.memory.spawn].random.terminal && Memory.spawns[creep.memory.spawn].random.terminal.store.energy < 30000) {
                var terminal = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.terminal.id);
                if (creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveTo(terminal);
                //}
            }

            //need work part
            //creep.repair(creep.pos.findInRange(FIND_STRUCTURES, 1, {
            //    filter: (structure) => {
            //        return (structure.hits < structure.hitsMax - 850 && structure.structureType == STRUCTURE_ROAD)
            //    }
            //}));

        }
        else if (!Memory.spawns[creep.memory.spawn].random.usersLink) {
            var storage = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.storeId);
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        }
        else {
            var link = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.userLinkId);
            if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link);
            }

        }
    }
};

module.exports = roleUser;