var roleGetEnergy = require('role.getenergy');
var roleGetStore = require('role.getstore');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep, sources) {

        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
            delete creep.memory.sourceId;
            creep.say('storing');
        }

        if (creep.memory.full) {
            if (creep.memory.role == 'harvester') {
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
                                    (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity - 250)) && structure.energy < structure.energyCapacity;
                        }
                    });
                }
                if (!targets) {
                    for (let myRooms = 0, length = Memory.spawns[creep.memory.spawn].random.rooms.length; myRooms < length; myRooms++) {
                        if (Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms]]) {
                            var targets = Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms]].find(FIND_MY_STRUCTURES, {
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
                if (targets) {
                    if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, { reusePath: Memory.moveToCache });
                    }
                }
                else if (Memory.spawns[creep.memory.spawn].random.terminal && Memory.spawns[creep.memory.spawn].random.terminal.store.energy < 30000) {
                    var terminal = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.terminal.id);
                    if (creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        creep.moveTo(terminal, { reusePath: Memory.moveToCache });
                    //}
                }
                else if (Memory.spawns[creep.memory.spawn].random.storeId) {
                    //for (let myRooms in Game.rooms) {
                    //    targets = Game.rooms[myRooms].find(FIND_MY_STRUCTURES, {
                    //        filter: (structure) => {
                    //            return (structure.structureType == STRUCTURE_EXTENSION ||
                    //                    structure.structureType == STRUCTURE_SPAWN ||
                    //                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    //        }
                    //    });
                    //}
                    //if (targets.length > 0) {
                    //    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //        creep.moveTo(targets[0]);
                    //    }
                    //}
                    //else {

                    var storage = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.storeId);
                    if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        creep.moveTo(storage, { reusePath: Memory.moveToCache });
                    //}
                }

                //need work part
                //creep.repair(creep.pos.findInRange(FIND_STRUCTURES, 1, {
                //    filter: (structure) => {
                //        return (structure.hits < structure.hitsMax - 850 && structure.structureType == STRUCTURE_ROAD)
                //    }
                //}));

            }
            else {
                var targets = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_STORAGE)
                    }
                });
                if (!targets)
                    var targets = Game.rooms[Memory.spawns[creep.memory.spawn].random.mainRoom].find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_STORAGE);
                        }
                    })[0];
                if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.repair(creep.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: (structure) => {
                            return (structure.hits < structure.hitsMax - 1000 && structure.structureType == STRUCTURE_ROAD)
                        }
                    })[0]);
                    creep.moveTo(targets, { reusePath: Memory.moveToCache });
                }
                return;
            }
        }
        else {
            if (creep.memory.role == 'harvester')
                roleGetEnergy.run(creep, Memory.spawns[creep.memory.spawn].sources);
            else
                roleGetStore.run(creep);
        }
    }
};

module.exports = roleHarvester;