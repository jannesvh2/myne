var roleGetEnergy = require('role.getenergy');
var roleGetStore = require('role.getstore');
var roleRepairer = require('role.repairer');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.helper) {

             if (creep.hits < creep.hitsMax)
               creep.heal(creep);
             if (creep.room.name != "W6S67") {
                //var flag = Game.flags['Flag7'];
                //if (flag) {
                //    if (!creep.memory.flag || creep.memory.flag == 1) {
                //        creep.moveTo50(flag);
                //        if (flag.room.name == creep.room.name)
                //            creep.memory.flag = 2;
                //        return;
                //    }
                //    if (creep.memory.flag == 2) {

                //        flag = Game.flags['Flag8'];
                //        creep.moveTo50(flag);
                //        if (flag.room.name == creep.room.name)
                //            creep.memory.flag = 3;
                //        return;
                //    }
                //}
                //else {
                 var exitDir = Game.map.findExit(creep.room.name, "W6S67");
                var Exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo50(Exit, { canOn: true, maxRooms: 1 });
                return;
                //}
            }
        }

        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            delete creep.memory.type;
            delete creep.memory.targetId;
            creep.say('harvesting');
        }
        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
            delete creep.memory.sourceId;

        }
        var canBuild = false;
        if (creep.memory.full) {
            if (creep.memory.type != 'build' && !creep.memory.targetId) {
                var targets = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
                if (targets) {
                    canBuild = true;
                    var test = creep.build(targets);
                    if (test == ERR_NOT_IN_RANGE) {
                        var closestDamagedStructure = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                            filter: (structure) => {
                                return (structure.hits < structure.hitsMax - 1000 && structure.structureType == STRUCTURE_ROAD)
                            }
                        });

                        if (closestDamagedStructure.length && creep.repair(closestDamagedStructure[0] == OK) && creep.pos.roomName == Memory.spawns[creep.memory.spawn].random.mainRoom) {
                            Memory.spawns[creep.memory.spawn].repairHpHistory[closestDamagedStructure[0].id] = closestDamagedStructure[0].hits;
                        }
                        creep.moveTo50(targets);
                    }
                    creep.memory.targetId = targets.id;
                    creep.memory.targetPos = targets.pos;
                    creep.memory.type = 'build';
                }
                else {
                    targets = [];
                    for (let myRooms = 0, length = Memory.spawns[creep.memory.spawn].random.rooms.length; myRooms < length; myRooms++) {
                        if (Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms].name] && creep.pos.roomName != Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms].name].name) {
                            var tmpTargets = Game.rooms[Memory.spawns[creep.memory.spawn].random.rooms[myRooms].name].find(FIND_MY_CONSTRUCTION_SITES);
                            for (let t in tmpTargets) {
                                targets.push(tmpTargets[t]);
                                break;
                            }
                        }
                        if (targets.length)
                            break;
                    }
                    if (targets.length) {
                        creep.memory.targetId = targets[0].id;
                        creep.memory.targetPos = targets[0].pos;
                        creep.memory.type = 'build';

                        canBuild = true;
                        var buildReturn = creep.build(targets[0]);
                        if (buildReturn != OK) {
                            var closestDamagedStructure = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                                filter: (structure) => {
                                    return (structure.hits < structure.hitsMax - 1000 && structure.structureType == STRUCTURE_ROAD)
                                }
                            });

                            if (closestDamagedStructure.length && creep.repair(closestDamagedStructure[0] == OK) && creep.pos.roomName == Memory.spawns[creep.memory.spawn].random.mainRoom) {
                                Memory.spawns[creep.memory.spawn].repairHpHistory[closestDamagedStructure[0].id] = closestDamagedStructure[0].hits;
                            }
                            creep.moveTo50(targets[0]);
                        }
                    }
                }
            }
            else if (creep.memory.type == 'build') {
                var targetId = Game.getObjectById(creep.memory.targetId);
                if (!targetId) {
                    let repBuild = creep.room.lookForAt(LOOK_STRUCTURES, creep.memory.targetPos.x, creep.memory.targetPos.y);
                    if (repBuild.length)
                        for (let a = 0, length = repBuild.length; a < length; a++)
                            if (repBuild[a].hits == 1) {
                                Memory.spawns[creep.memory.spawn].repairHpHistory[repBuild[a].id] = 2000;
                                break;
                            }

                    delete creep.memory.targetPos;
                    delete creep.memory.type;
                    delete creep.memory.targetId;
                    return;
                }
                canBuild = true;
                var buildReturn = creep.build(targetId);
                if (buildReturn != OK) {
                    var closestDamagedStructure = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: (structure) => {
                            return (structure.hits < structure.hitsMax - 1000 && structure.structureType == STRUCTURE_ROAD)
                        }
                    });

                    if (closestDamagedStructure.length && creep.repair(closestDamagedStructure[0] == OK) && creep.pos.roomName == Memory.spawns[creep.memory.spawn].random.mainRoom) {
                        Memory.spawns[creep.memory.spawn].repairHpHistory[closestDamagedStructure[0].id] = closestDamagedStructure[0].hits;
                    }
                    creep.moveTo50(targetId);

                }
            }
            if (!canBuild) {
                roleRepairer.run(creep);
            }
        }
        else {
            if (creep.memory.role == 'builder') {
                roleGetEnergy.run(creep, Memory.spawns[creep.memory.spawn].sources);
                return;
            }
            else if (Memory.spawns[creep.memory.spawn].random.useStore) {
                if (creep.room.name == Memory.spawns[creep.memory.spawn].random.mainRoom) {
                    var storage = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.storeId);
                    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo50(storage);
                    }
                }
                else {
                    creep.memory.room = creep.room.name;
                    roleGetStore.run(creep);

                }
                return;
            }
            roleGetStore.run(creep);
        }
    }
};

module.exports = roleBuilder;