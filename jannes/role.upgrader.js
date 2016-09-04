var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var energyCount = 4;

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');

        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(Game.rooms.W14N59.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms.W14N59.controller);
            }
        }
        else {
            //var sources = creep.room.find(FIND_SOURCES); 1 room
            var sources = Game.rooms.W14N59.find(FIND_SOURCES);
            sources = sources.concat(Game.rooms.W14N58.find(FIND_SOURCES));
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

module.exports = roleUpgrader;