var roleUser = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            delete creep.memory.targetId;
        }
        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
        }
        if (creep.memory.full) {
            function myFunction() {
                var targets = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity / 2 && structure.id != creep.memory.targetId;
                    }
                });
                if (!targets) {
                    targets = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_POWER_SPAWN ||
                                structure.structureType == STRUCTURE_LAB ||
                                structure.structureType == STRUCTURE_NUKER ||
                                    (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity - 250)) && structure.energy < structure.energyCapacity && structure.id != creep.memory.targetId;
                        }
                    });

                    //if (!targets) {
                    //    for (let myRooms = 0, length = Memory.spawns[creep.memory.spawn].random.rooms.length; myRooms < length; myRooms++) {
                    //        if (Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms].name]) {
                    //            var targets = Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms].name].find(FIND_MY_STRUCTURES, {
                    //                filter: (structure) => {
                    //                    return (structure.structureType == STRUCTURE_EXTENSION ||
                    //                            structure.structureType == STRUCTURE_SPAWN ||
                    //                            (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity - 250)) && structure.energy < structure.energyCapacity && structure.id != creep.memory.targetId;
                    //                }
                    //            })[0];
                    //            if (targets)
                    //                break;
                    //        }
                    //    }
                    //}

                    if (!targets) {
                        if (Memory.spawns[creep.memory.spawn].random.terminal && Game.getObjectById(Memory.spawns[creep.memory.spawn].random.terminal).store.energy < 50000) {
                            targets = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.terminal);
                        }
                    }
                    ////nuke
                    //if (!targets) {
                    //    let nuker = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.nuker);
                    //    if (nuker && nuker.energy < 300000) {
                    //        targets = nuker;
                    //    }
                    //}
                }


                if (!targets && creep.carry.energy != creep.carryCapacity) {
                    creep.memory.full = false;
                    delete creep.memory.targetId;
                }
                if (targets && targets.id)
                    creep.memory.targetId = targets.id;
            }
            if (!creep.memory.targetId)
                myFunction();

            var target;
            if (creep.memory.targetId) {
                target = Game.getObjectById(creep.memory.targetId);
            }
            if (target && creep.pos.inRangeTo(target, 1)) {
                creep.transfer(target, RESOURCE_ENERGY);
                if (creep.carry.energy < 51) {
                    creep.memory.full = false;
                    delete creep.memory.targetId;
                }
                else {
                    myFunction();
                    if (creep.moveTo(Game.getObjectById(creep.memory.targetId)) == ERR_NO_PATH)
                        delete creep.memory.targetId;
                }
            }
            else if (target) {
                if (creep.moveTo(target) == ERR_NO_PATH)
                    delete creep.memory.targetId;
            }

            //need work part
            //creep.repair(creep.pos.findInRange(FIND_STRUCTURES, 1, {
            //    filter: (structure) => {
            //        return (structure.hits < structure.hitsMax - 850 && structure.structureType == STRUCTURE_ROAD)
            //    }
            //}));

        }
        if (!creep.memory.full) {
            var storage = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.storeId);
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        }
    }
};

module.exports = roleUser;