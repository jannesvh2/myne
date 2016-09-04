var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var energyCount = 2;

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
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
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
            //var sources = creep.room.find(FIND_SOURCES); 1 room
            var sources = Game.rooms.W14N58.find(FIND_SOURCES);
            sources += Game.rooms.W14N59.find(FIND_SOURCES);
            /// end
            for (var a = 0; a < sources.length; a++) {
                if (creep.harvest(sources[creep.memory.source]) == OK) {
                    atSource = true;
                    break;
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

module.exports = roleBuilder;