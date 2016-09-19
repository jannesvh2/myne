var roleGetEnergy = require('role.getenergy');
var roleGetStore = require('role.getstore');
var roleRepairer = require('role.repairer');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep, sources) {

        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
            delete creep.memory.sourceId;
            if (creep.room.find(FIND_MY_CONSTRUCTION_SITES).length)
                creep.say('building');
            else
                creep.say('repairing');

        }
        var canBuild = false;
        if (creep.memory.full) {
            var targets = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
            if (targets) {
                canBuild = true;
                var test = creep.build(targets);
                if (test == ERR_NOT_IN_RANGE) {
                    var closestDamagedStructure = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: (structure) => {
                            return (structure.hits < structure.hitsMax - 850 && structure.structureType == STRUCTURE_ROAD)
                        }
                    });

                    if (closestDamagedStructure.length && creep.repair(closestDamagedStructure[0] == OK) && creep.pos.roomName == Memory.spawns[creep.memory.spawn].random.mainRoom) {
                            Memory.spawns[creep.memory.spawn].repairHpHistory[closestDamagedStructure[0].id] = closestDamagedStructure[0].hits;
                    }
                    creep.moveTo(targets, { maxOps: 5000 });
                }
            }
            else {
                targets = [];
                for (let myRooms = 0, length = Memory.spawns[creep.memory.spawn].random.rooms.length; myRooms < length; myRooms++) {
                    if (Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms]]) {
                        var tmpTargets = Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms]].find(FIND_MY_CONSTRUCTION_SITES);
                        for (let t in tmpTargets)
                            targets.push(tmpTargets[t]);
                    }
                }
                if (targets.length) {
                    canBuild = true;
                    var buildReturn = creep.build(targets[0]);
                    if (buildReturn != OK) {
                        var closestDamagedStructure = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                            filter: (structure) => {
                                return (structure.hits < structure.hitsMax - 850 && structure.structureType == STRUCTURE_ROAD)
                            }
                        });

                        if (closestDamagedStructure.length && creep.repair(closestDamagedStructure[0] == OK) && creep.pos.roomName == Memory.spawns[creep.memory.spawn].random.mainRoom) {
                                Memory.spawns[creep.memory.spawn].repairHpHistory[closestDamagedStructure[0].id] = closestDamagedStructure[0].hits;
                        }
                        creep.moveTo(targets[0], { maxOps: 5000 });
                    }
                    //if (buildReturn == ERR_INVALID_TARGET) {
                    //    var sourceRoom = targets[0].room.name;
                    //    if (creep.room.name != sourceRoom && sourceRoom != '') {
                    //        var exitDir = Game.map.findExit(creep.room.name, sourceRoom);
                    //        var Exit = creep.pos.findClosestByRange(exitDir);
                    //        Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
                    //        creep.moveTo(Exit);
                    //    }
                    //}
                }
            }
            if (!canBuild) {
                roleRepairer.run(creep);
            }
        }
        else {
            if (creep.memory.role == 'builder')
                roleGetEnergy.run(creep, sources);
            else
                roleGetStore.run(creep);
        }
    }
};

module.exports = roleBuilder;