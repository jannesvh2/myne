var roleDefenders = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1);
        if (hostiles.length)
            creep.attack(hostiles[0]);

        var targets = [];

        if (creep.memory.sourceRoom == Memory.spawns[creep.memory.spawn].random.mainRoom) {
            var targets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (targets) {
                if (!creep.memory.rampartId) {
                    var rampart = targets.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_RAMPART && creep.room.lookAt(structure).length && creep.room.lookAt(structure).length < 3)
                        }
                    });
                    creep.memory.rampartId = rampart.id;
                }
                if (!creep.memory.atSpot) {
                    if (creep.pos.isEqualTo(rampObj.pos)) {
                        creep.memory.noTarget = 0;
                        creep.memory.atSpot = true;
                    }
                    else {
                        var rampObj = Game.getObjectById(creep.memory.rampartId);
                        if (!rampObj || creep.room.lookForAt(LOOK_CREEPS, rampObj).length) {
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
        }
        else {
            //If not in the correct room, move towards it

            var targets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            if (targets) {

                if (creep.attack(targets) == ERR_NOT_IN_RANGE)
                    if (creep.moveTo(targets) != OK) {
                        if (creep.room.name != creep.memory.sourceRoom) {
                            var exitDir = Game.map.findExit(creep.room.name, creep.memory.sourceRoom);
                            var Exit = creep.pos.findClosestByRange(exitDir);
                            creep.moveTo(Exit);
                        }
                    }
            }
            else {
                if (creep.room.name != creep.memory.sourceRoom) {
                    var exitDir = Game.map.findExit(creep.room.name, creep.memory.sourceRoom);
                    var Exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(Exit);
                }
            }
        }

    }
};

module.exports = roleDefenders;