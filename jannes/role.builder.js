var roleGetEnergy = require('role.getenergy');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var energyCount = 4;

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            if (creep.room.find(FIND_CONSTRUCTION_SITES).length)
                creep.say('building');
            else
                creep.say('repairing');

        }

        if (creep.memory.building) {
            var targets = Game.rooms.W14N59.find(FIND_CONSTRUCTION_SITES);
            if (!targets.length) {
                try {
                    targets = Game.rooms.W14N58.find(FIND_CONSTRUCTION_SITES);
                } catch (err) { }
            }

            if (targets.length) {

                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if (!closestDamagedStructure) {
                    closestDamagedStructure = Game.rooms.W14N59.find(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax
                    });
                }
                if (!closestDamagedStructure) {
                    try {
                        closestDamagedStructure = Game.rooms.W14N58.find(FIND_STRUCTURES, {
                            filter: (structure) => structure.hits < structure.hitsMax
                        });
                    } catch (err) { }
                }

                if (closestDamagedStructure) {
                    creep.repair(closestDamagedStructure);
                }
            }
        }
        else {
            rolegetEnergy.run(creep);
        }
    }
};

module.exports = roleBuilder;