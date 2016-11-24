var roleGetEnergy = require('role.getenergy');
var roleGetStore = require('role.getstore');
var roleRepairer = require('role.repairer');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        //new spawn
        //Game.spawns['Spawn' + parseInt(spawn) + "" + a].createCreep([WORK, WORK, WORK, WORK,WORK, WORK, WORK, WORK, WORK, WORK,WORK,WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY, CARRY,CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], null, { role: 'builder', spawn: spawn });
        if (creep.memory.helper) {
            if (creep.room.name != "W3S55") {
                var flag = Game.flags['Flag7'];
                if (flag) {
                    if (!creep.memory.flag || creep.memory.flag == 1) {
                        creep.moveTo(flag);
                        if (flag.room.name == creep.room.name)
                            creep.memory.flag = 2;
                        return;
                    }
                    if (creep.memory.flag == 2) {

                        flag = Game.flags['Flag8'];
                        creep.moveTo(flag);
                        if (flag.room.name == creep.room.name)
                            creep.memory.flag = 3;
                        return;
                    }
                    //    if (creep.memory.flag == 3) {

                    //        flag = Game.flags['Flag3'];
                    //        creep.moveTo(flag);
                    //        if (flag.room.name == creep.room.name)
                    //            creep.memory.flag = 4;
                    //        return;
                    //    }

                }
                    //    if (creep.memory.flag == 4) {

                    //        flag = Game.flags['Flag4'];
                    //        creep.moveTo(flag);
                    //        return;
                    //    }


                    //}
                else {
                    var exitDir = Game.map.findExit(creep.room.name, "W3S55");
                    var Exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(Exit);
                    return;
                }
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
                        creep.moveTo(targets);
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
                            creep.moveTo(targets[0]);
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
            }
            else if (creep.memory.type == 'build') {
                var targetId = Game.getObjectById(creep.memory.targetId);
                if (!targetId) {
                    let repBuild = creep.room.lookForAt(LOOK_STRUCTURES, creep.memory.targetPos.x, creep.memory.targetPos.y);
                    if (repBuild.length)
                        for (let a = 0, length = repBuild.length; a < repBuild; a++)
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
                    creep.moveTo(targetId);

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
                        creep.moveTo(storage);
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