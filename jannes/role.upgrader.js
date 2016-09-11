var roleGetEnergy = require('role.getenergy');
var roleGetStore = require('role.getstore');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep, sources) {

        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
            delete creep.memory.sourceId;
            creep.say('upgrading');

        }

        if (creep.memory.full) {
            if (creep.upgradeController(Game.rooms.W59S29.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms.W59S29.controller);
            }
        }
        else {
            if (creep.memory.role == 'upgrader')
                roleGetEnergy.run(creep, sources);
            else {
                var storage = Game.getObjectById('57d57cd3636e2e351c38d6fe');
                if (storage.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
        }
    }
};

module.exports = roleUpgrader;