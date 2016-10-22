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
            if (creep.upgradeController(Game.rooms[Memory.spawns[creep.memory.spawn].random.mainRoom].controller) == ERR_NOT_IN_RANGE) {
                if (Memory.spawns[creep.memory.spawn].random.useUpgradeSpots) {
                    for (var a = 0, length = Memory.spawns[creep.memory.spawn].random.UpgradeSpots.length; a < length; a++) {
                        let lookAt = reep.room.lookAt(Memory.spawns[creep.memory.spawn].random.UpgradeSpots[a].x, Memory.spawns[creep.memory.spawn].random.UpgradeSpots[a].y);
                        if(lookAt.length && lookAt.length < 3)
                            creep.moveTo(Memory.spawns[creep.memory.spawn].random.UpgradeSpots[a].x, Memory.spawns[creep.memory.spawn].random.UpgradeSpots[a].y);
                    }
                }
                else
                    creep.moveTo(Game.rooms[Memory.spawns[creep.memory.spawn].random.mainRoom].controller);
            }
        }
        else {
            if (creep.memory.role == 'upgrader')
                roleGetEnergy.run(creep, sources);
            else if (Memory.spawns[creep.memory.spawn].random.storeId) {

            var storage = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.storeId);
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
        }
    }
};

module.exports = roleUpgrader;