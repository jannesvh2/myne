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
                        creep.moveTo(lab);
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

                        creep.moveTo(rampObj);
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
                        creep.moveTo(Game.spawns['Spawn' + parseInt(creep.memory.spawn) + "" + 0]);
                        creep.memory.atSpot = false;
                        delete creep.memory.rampartId;
                    }
                }
            }
            else {
                delete creep.memory.rampartId;
            }
        }
        else {
            //If not in the correct room, move towards it
            if (!Game.rooms[creep.memory.sourceRoom]) {
                var exitDir = Game.map.findExit(creep.room.name, creep.memory.sourceRoom);
                var Exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(Exit);
            }
            if (Game.rooms[creep.memory.sourceRoom])
                var targets = Game.rooms[creep.memory.sourceRoom].find(FIND_HOSTILE_CREEPS, {
                    filter: (enemy) => {
                        return (enemy.owner.username != 'Source Keeper')
                    }
                });

            if (targets.length) {

                if (creep.moveTo(targets[0]) != OK) {
                    if (creep.room.name != creep.memory.sourceRoom) {
                        if (creep.room.name != creep.memory.sourceRoom) {
                            var exitDir = Game.map.findExit(creep.room.name, creep.memory.sourceRoom);
                            var Exit = creep.pos.findClosestByRange(exitDir);
                            creep.moveTo(Exit);
                        }
                    }
                }
            }
        }
            creep.heal(creep);

    }
};

module.exports = roleDefenders;