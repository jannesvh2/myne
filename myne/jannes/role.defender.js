var roleDefenders = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1);
        if (hostiles.length)
            creep.attack(hostiles[0]);

        var targets = [];

        if (creep.memory.sourceRoom == Memory.spawns[creep.memory.spawn].random.mainRoom) {
            if (creep.memory.mustBoost) {
                var lab = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.defLab);
                if (lab && lab.mineralType == 'XUH2O') {
                    let boost = lab.boostCreep(creep);
                    if (boost == ERR_NOT_IN_RANGE)
                        creep.moveTo50(lab);
                    if (boost == OK)
                        creep.memory.mustBoost = false;
                    return;
                }
            }
            var targets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (targets) {
                if (!creep.memory.rampartId) {
                    var rampart = targets.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_RAMPART && !creep.room.lookForAt(LOOK_CREEPS, structure).length)
                        }
                    });
                    creep.memory.rampartId = rampart.id;
                }
                if (!creep.memory.atSpot) {
                    var rampObj = Game.getObjectById(creep.memory.rampartId);
                    if (!rampObj) {
                        delete creep.memory.rampartId;
                        return;
                    }
                    if (creep.pos.isEqualTo(rampObj.pos)) {
                        creep.memory.noTarget = 0;
                        creep.memory.atSpot = true;
                    }
                    else {
                        if (creep.room.lookForAt(LOOK_CREEPS, rampObj).length) {
                            delete creep.memory.rampartId;
                            return;
                        }

                        creep.moveTo50(rampObj);
                        return;
                    }
                }
                var hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1);
                if (hostiles.length)
                    creep.attack(hostiles[0]);
                else {
                    if (creep.memory.noTarget < 10)
                        creep.memory.noTarget++;
                    else {
                        creep.moveTo50(Game.spawns['Spawn' + parseInt(creep.memory.spawn) + "" + 0]);
                        creep.memory.atSpot = false;
                        delete creep.memory.rampartId;
                    }
                }
            }
            else {
                delete creep.memory.rampartId;
                creep.moveTo50(creep.room.controller);
            }
        }
        else {
            if (Game.rooms[creep.memory.sourceRoom]) {
                var targets = [];
                if (creep.room.name != creep.memory.sourceRoom)
                    targets = Game.rooms[creep.memory.sourceRoom].find(FIND_HOSTILE_CREEPS);
                else {
                    let tmp = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (tmp)
                        targets.push(tmp);
                }
                if (targets.length) {
                    let moveTo50;
                    if (creep.room.name == creep.memory.sourceRoom)
                        moveTo50 = creep.moveTo(targets[0], { maxRooms: 1, canOn: true });
                    else
                        moveTo50 = creep.moveTo50(targets[0]);


                    if (moveTo50 != OK) {
                        if (creep.room.name != creep.memory.sourceRoom) {
                            if (creep.room.name != creep.memory.sourceRoom) {
                                var exitDir = Game.map.findExit(creep.room.name, creep.memory.sourceRoom);
                                var Exit = creep.pos.findClosestByRange(exitDir);
                                creep.moveTo50(Exit, { canOn: true });
                            }
                        }
                    }
                    creep.heal(creep);
                    if (creep.getActiveBodyparts(RANGED_ATTACK)) {
                        delete creep.memory.skSpwn;
                        creep.rangedAttack(targets[0]);
                        creep.attack(targets[0]);
                    }
                    return;
                }
                else {
                    if (creep.getActiveBodyparts(RANGED_ATTACK) && creep.room.name == creep.memory.sourceRoom) {
                        if (creep.memory.skSpwn) {
                            var targetHeal = creep.pos.findInRange(FIND_MY_CREEPS, 3, {
                                filter: function (object) {
                                    return object.hits < object.hitsMax;
                                }
                            });
                            if (targetHeal.length) {
                                creep.heal(targetHeal[0]);
                                creep.moveTo50(targetHeal[0], { canOn: true });
                                if (targetHeal.length < 2 && targetHeal[0].name == creep.name)
                                    creep.moveTo(Game.getObjectById(creep.memory.skSpwn), { maxRooms: 1, canOn: true });
                                else
                                    return;
                            }
                            else
                                creep.moveTo50(Game.getObjectById(creep.memory.skSpwn), { maxRooms: 1, canOn: true });
                        }
                        else {
                            let skSpawn = Game.rooms[creep.room.name].find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.owner && structure.owner.username == 'Source Keeper')
                                }
                            });
                            var spawnIn = 1000
                            for (let s = 0, lengthS = skSpawn.length; s < lengthS; s++) {
                                if (spawnIn > skSpawn[s].ticksToSpawn) {
                                    creep.memory.skSpwn = skSpawn[s].id
                                    spawnIn = skSpawn[s].ticksToSpawn;
                                }
                            }
                        }
                    }
                }
            }

            //If not in the correct room, move towards it
            if (creep.room.name != creep.memory.sourceRoom) {
                var exitDir = Game.map.findExit(creep.room.name, creep.memory.sourceRoom);
                var Exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo50(Exit, { canOn: true });
            }
            creep.heal(creep);
        }

    }
};

module.exports = roleDefenders;