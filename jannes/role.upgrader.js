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
            if (creep.upgradeController(Game.rooms[Memory.spawns[creep.memory.spawn].room].controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms[Memory.spawns[creep.memory.spawn].room].controller);
            }
        }
        else {
            if (creep.memory.role == 'upgrader')
                roleGetEnergy.run(creep, sources);
            else if (Memory.spawns[creep.memory.spawn].random.storeId) {

            var storage = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.storeId);
                if (storage.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
        }
    }
};

module.exports = roleUpgrader;