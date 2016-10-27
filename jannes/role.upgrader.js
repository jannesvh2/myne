var roleGetEnergy = require('role.getenergy');
var roleGetStore = require('role.getstore');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep, sources) {
        if (creep.memory.helper) {
            if (creep.room.name != "W9S52") {
                var flag = Game.flags['Flag1'];
                if (flag) {
                    if (!creep.memory.flag || creep.memory.flag == 1) {
                        creep.moveTo(flag);
                        if (flag.room.name == creep.room.name)
                            creep.memory.flag = 2;
                        return;
                    }
                    if (creep.memory.flag == 2) {

                        flag = Game.flags['Flag2'];
                        creep.moveTo(flag);
                        if (flag.room.name == creep.room.name)
                            creep.memory.flag = 3;
                        return;
                    }
                    if (creep.memory.flag == 3) {

                        flag = Game.flags['Flag3'];
                        creep.moveTo(flag);
                        if (flag.room.name == creep.room.name)
                            creep.memory.flag = 4;
                        return;
                    }
                    if (creep.memory.flag == 4) {

                        flag = Game.flags['Flag4'];
                        creep.moveTo(flag);
                        return;
                    }


                }
                else {
                    var exitDir = Game.map.findExit(creep.room.name, "W9S52");
                    var Exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(Exit);
                    return;
                }
            }
        }

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
                    for (var a = 0, length = Memory.spawns[creep.memory.spawn].random.upgradeSpots.length; a < length; a++) {
                        let lookAt = creep.room.lookAt(Memory.spawns[creep.memory.spawn].random.upgradeSpots[a].x, Memory.spawns[creep.memory.spawn].random.upgradeSpots[a].y);
                        if (lookAt.length && lookAt.length < 2) {
                            creep.moveTo(Memory.spawns[creep.memory.spawn].random.upgradeSpots[a].x, Memory.spawns[creep.memory.spawn].random.upgradeSpots[a].y);
                            break;
                        }
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