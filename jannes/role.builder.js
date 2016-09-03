var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            if (creep.room.find(FIND_CONSTRUCTION_SITES).length)
                creep.say('building');
            else
                creep.say('repairing');

        }

        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {

                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
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

module.exports = roleBuilder;