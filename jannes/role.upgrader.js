var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
                creep.say('upgrading');

        }

        if (creep.memory.upgrading) {
            var targets = creep.room.find(creep.room.controller);
            if (targets.length) {

                if (creep.upgradeController(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if (closestDamagedStructure) {
                    creep.repair(closestDamagedStructure);
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleUpgrader;