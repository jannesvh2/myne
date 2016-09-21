var roleAttackers = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var guard = false;
        var enableID = false;
        var enablePriority = false;
        var flag = false;
        //var targetLocation = Game.getObjectById('579fa86e0700be0674d2d987');
        var targetLocation = Game.getObjectById('579fab82b1f02a3b0cfefe03');
        var priorityTarget = Game.getObjectById('57d002bbbbd16aff3afd0b68');

        //var sourceRoom = targetLocation.room.name;
        //var sourceRoom = 'W58S26';
        var sourceRoom = 'W58S26';
        var saveRoom = 'W58S26';
        var targets = [];
        if (reep.memory.role != 'attackerH' || creep.memory.role != 'attackerD') {
            if (!guard) {
                if (creep.getActiveBodyparts(RANGED_ATTACK)) {
                    targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
                    if (targets.length > 0) {
                        if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE);
                    }
                    else {
                        targets = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 3, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_SPAWN);
                            }
                        });
                        if (targets.length > 0) {
                            if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE);
                        }
                        //else if (creep.room.name == sourceRoom) {
                        //    targets = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                        //        filter: (structure) => {
                        //            return (structure.structureType == STRUCTURE_WALL);
                        //        }
                        //    });
                        //    if (targets.length > 0) {
                        //        if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE);
                        //    }
                        //}
                    }
                }
                else {
                    targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1);
                    if (targets.length > 0) {
                        if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE);
                    }
                }

            }
            //Priority attack
            if (enableID) {
                targets.push(priorityTarget);
            }
            else if (enablePriority) {
                targets = creep.room.find(FIND_HOSTILE_CREEPS, {
                    filter: function (object) {
                        return object.getActiveBodyparts(ATTACK) == 0 || object.getActiveBodyparts(RANGED_ATTACK) == 0;
                    }
                });
                targets.push(creep.pos.find(FIND_HOSTILE_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_SPAWN);
                    }
                }));
            }
            else if (!targets.length) {
                targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 22);
            }

            if (guard) {
                if (targets.length > 0) {
                    if (creep.getActiveBodyparts(RANGED_ATTACK))
                        if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE);
                    creep.moveTo(targets[0], { maxOps: 5000 });
                    if (creep.getActiveBodyparts(ATTACK))
                        if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
                }
            }
            else {
                if (targets.length > 0) {
                    if (creep.getActiveBodyparts(RANGED_ATTACK))
                        if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE);
                    //creep.moveTo(targets[0]);
                    if (creep.getActiveBodyparts(ATTACK))
                        if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
                }
            }


        }
        else if (creep.memory.role == 'attackerD' && creep.room.name == sourceRoom) {
            if (enableID)
                creep.dismantle(Game.getObjectById('57d002bbbbd16aff3afd0b68'));
            else {
                var dism = creep.pos.findClosestByRange(FIND_STRUCTURES, 1, {
                    filter: (structure) => {
                        return (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART)
                    }
                });
                if (creep.dismantle(dism) != OK)
                    creep.moveTo(dism);
            }
        }

        if (flag)
            creep.moveTo(Game.flags['Flag1'])
        else {
            //If not in the correct room, move towards it
            if (creep.room.name != sourceRoom && sourceRoom != '') {
                var exitDir = Game.map.findExit(creep.room.name, sourceRoom);
                var Exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(Exit, { maxOps: 5000 });
            }
            else if (creep.pos != targetLocation.pos) {
                creep.moveTo(targetLocation, { maxOps: 5000 })
            }
        }
        var targetHeal = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function (object) {
                return object.hits < object.hitsMax;
            }
        });
        if (targetHeal) {
            if (creep.pos.isNearTo(targetHeal)) {
                creep.heal(targetHeal);
            }
            else {
                creep.rangedHeal(targetHeal);
            }
            if (creep.memory.role == 'attackerH')
                creep.moveTo(targetHeal);
        }
        if (creep.room.name == sourceRoom && creep.hits < (creep.hitsMax * 2 / 3)) {
            var exitDir = Game.map.findExit(creep.room.name, saveRoom);
            var Exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(Exit, { maxOps: 5000 });
        }
    }
};

module.exports = roleAttackers;