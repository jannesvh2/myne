var roleGetEnergy = require('role.getenergy');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep, sources, atSources) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');

        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(Game.rooms.W59S29.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms.W59S29.controller);
            }
        }
        else {
            atSources = roleGetEnergy.run(creep, sources, atSources);
        }
        return atSources;
    }
};

module.exports = roleUpgrader;