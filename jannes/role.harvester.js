var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var energyCount = 2;

        if (creep.memory.storing && creep.carry.energy == 0) {
            creep.memory.storing = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.storing && creep.carry.energy == creep.carryCapacity) {
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
            for (var a = 0; a < sources.length; a++) {
                if (creep.harvest(sources[creep.memory.source]) == OK) {
                    atSource = true;
                    break;
                }
                if (sources[creep.memory.source].energy < 100) {
                    creep.memory.source++;
                    if (creep.memory.source >= energyCount)
                        creep.memory.source = 0;
                }
                if (creep.moveTo(sources[creep.memory.source]) == ERR_NO_PATH) {
                    creep.memory.source++;
                    if (creep.memory.source >= energyCount)
                        creep.memory.source = 0;
                    if (creep.moveTo(sources[creep.memory.source]) == OK) { }
                }
            }
                
        }
    }
};

module.exports = roleHarvester;