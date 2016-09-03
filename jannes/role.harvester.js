var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.storing && creep.carry.energy == 0) {
            creep.memory.storing = false;
            creep.say('harvesting');
        }
        if (!creep.memory.storing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.storing = true;
            creep.say('storing');
        }

        if (creep.memory.storing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var atSource = false;
            for (var a = 0; a < sources.length; a++) {
                if (creep.harvest(sources[a]) == OK) {
                    creep.memory.source = a;
                    atSource = true;
                    break;
                }
            }
            if (!atSource)
                if (creep.moveTo(sources[creep.memory.source]) != OK)
                    for (var a = sources.length - 1; a >= 0; a--)
                        if (creep.moveTo(sources[a]) != ERR_NO_PATH) {
                            creep.memory.source = a;
                            break;
                        }
        }
    }
};

module.exports = roleHarvester;