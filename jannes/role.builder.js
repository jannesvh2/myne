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
                targets = Game.rooms.W14N59.find(FIND_CONSTRUCTION_SITES);
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
                    closestDamagedStructure = Game.rooms.W14N59.find(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax
                    });
                }

                if (closestDamagedStructure) {
                    creep.repair(closestDamagedStructure);
                }
            }
        }
        else {
            //var sources = creep.room.find(FIND_SOURCES); 1 room
            var sources = Game.rooms.W14N59.find(FIND_SOURCES);
            sources = sources.concat(Game.rooms.W14N59.find(FIND_SOURCES));
            /// end
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

module.exports = roleBuilder;