var roleStore = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
            creep.say('storing');
        }

        if (creep.memory.full) {
            if (Memory.spawns[0].random.useLinks) {
                var targets = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LINK);
                    }
                });

                if (targets[0]) {
                    var transfer = creep.transfer(targets[0], RESOURCE_ENERGY);
                    if (transfer == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                    return;
                }
            }
            var repL = creep.repair(creep.pos.findInRange(FIND_STRUCTURES, 3, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax - 1000 && (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER))
                }
            })[0]);
            if (rep != OK) {
                var targets = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
                });

                if (targets[0]) {
                    var transfer = creep.transfer(targets[0], RESOURCE_ENERGY);
                    if (transfer == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                    //else if (transfer == ERR_FULL) {
                    //    Game.notify(`Spawn ${creep.memory.spawn} container is full in ${creep.room.name}`);

                    //}
                }
                else {
                    var sites = creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 3);
                    //if (!sites.length)
                    //    Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_CONTAINER);
                    //else
                    if (sites.length)
                        creep.build(sites[0]);
                    else {
                        var creepSource = Game.getObjectById(creep.memory.sourceId.id);
                        var sites = creep.pos.findInRange(creepSource, 3);
                        if (!sites.length) {
                            creep.moveTo(creepSource);
                        }
                    }
                    //var storage = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.storeId);
                    //var transfer = creep.transfer(storage, RESOURCE_ENERGY);
                    //if (transfer == ERR_NOT_IN_RANGE) {
                    //    creep.repair(creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    //        filter: (structure) => {
                    //            return (structure.hits < structure.hitsMax - 850 && structure.structureType == STRUCTURE_ROAD)
                    //        }
                    //    }));
                    //    creep.moveTo(storage);

                    //}
                    //else if (transfer == ERR_FULL) {
                    //    Game.notify(`Spawn ${creep.memory.spawn} container is full in ${creep.room.name}`);

                    //}
                }
            }

        }
        else {
            var creepSource = Game.getObjectById(creep.memory.sourceId.id);
            var sourceEmpty = creep.harvest(creepSource);
            if (sourceEmpty != OK) {
                if (creep.moveTo(creepSource) == ERR_INVALID_TARGET);
            }
        }
    }
};

module.exports = roleStore;