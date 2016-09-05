var roleGetEnergy = require('role.getenergy');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep, sources) {

        if (creep.memory.storing && creep.carry.energy == 0) {
            creep.memory.storing = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.storing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.storing = true;
            delete creep.memory.sourceId;
            creep.say('storing');
        }

        if (creep.memory.storing) {
            var targets = [];
            for (var myRooms in Game.rooms) {
                targets = Game.rooms[myRooms].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
            }

            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {
            roleGetEnergy.run(creep, sources);
        }
    }
};

module.exports = roleHarvester;