var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var energyCount = 2;

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');

        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var atSource = false;
            for (var a = sources.length - 1; a >= 0; a--) {
                if (creep.harvest(sources[a]) == OK) {
                    creep.memory.source = a;
                    atSource = true;
                    break;
                }
            }
            if (!atSource)
                if (creep.moveTo(sources[creep.memory.source]) != OK)
                    if (creep.moveTo(sources[a]) == ERR_NO_PATH) {
                        creep.memory.source++;
                        if (creep.memory.source >= energyCount)
                            creep.memory.source = 0;
                    }
        }
    }
};

module.exports = roleUpgrader;