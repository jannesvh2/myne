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
                var targets = creep.pos.findInRange(FIND_STRUCTURES, 1, {
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
            var creepSource = Game.getObjectById(creep.memory.sourceId);
            var sourceEmpty = creep.harvest(creepSource);
            if (sourceEmpty != OK) {
                if (creep.moveTo(creepSource) == ERR_INVALID_TARGET);
            }

            if (!creep.memory.rep)
                creep.memory.rep = 0;
            creep.memory.rep++;
            if (creep.memory.rep > 6) {
                creep.memory.rep = 0;

                if (!creep.memory.containerId) {
                    creep.memory.containerId = creep.pos.findInRange(FIND_STRUCTURES, 2, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER)
                        }
                    })[0];
                    if (creep.memory.containerId)
                        creep.memory.containerId = creep.memory.containerId.id;
                }
                let container = Game.getObjectById(creep.memory.containerId)
                if (!container) {
                    delete creep.memory.containerId;
                    if (creep.pos.isNearTo(creepSource)) {
                        var sites = creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 2);
                        if (!sites.length)
                            Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_CONTAINER);
                    }
                    if (sites.length) {
                        creep.build(sites[0]);
                        creep.memory.rep = 6;
                    }
                    else {
                        var sites = creep.pos.findInRange(creepSource, 3);
                        if (!sites.length) {
                            creep.moveTo(creepSource);
                        }
                    }
                }
                else {
                    (creep.repair(container) == ERR_NOT_IN_RANGE)
                    if (creep.pos.getRangeTo(container) > 0) {
                        creep.moveTo(container);
                    }
                }
            }
        }
        else {
            var creepSource = Game.getObjectById(creep.memory.sourceId);
            var sourceEmpty = creep.harvest(creepSource);
            if (sourceEmpty != OK) {
                if (creep.moveTo(creepSource) == ERR_INVALID_TARGET);
            }
        }
    }
};

module.exports = roleStore;