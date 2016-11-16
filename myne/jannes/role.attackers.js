var rangeAttack = require('role.rangeattack');
var roleAttackers = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //Game.spawns['Spawn00'].createCreep([WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], null, { role: 'attackerD', spawn: 0 });

        var enableI = true;
        var enableIH = true;
        var enableID = true;
        var flag = true;
        var moveByFlag = false;
        var moveByFlagFlag = Game.flags['Flag1'];
        //var targetLocation = Game.getObjectById('579fa86e0700be0674d2d987');
        var targetLocation;
        targetLocation = { x: 25, y: 25 };
        var priorityTarget = Game.getObjectById('581f6874b4dd75f611a8520f');
        var priorityTargetD = Game.getObjectById('581f6874b4dd75f611a8520f');

        //var sourceRoom = targetLocation.room.name;
        //var sourceRoom = 'W58S26';
        var sourceRoom = 'W4S57';
        var sourceRoomH = 'W4S57';
        var saveRoom = '';

        var attacked;
        if (creep.room.name == sourceRoomH)
            moveByFlag = false;
        if (creep.memory.role == 'attackerH' && creep.memory.getBoost) {
            if (creep.memory.getBoostM) {
                let lab = Game.getObjectById('58171d9d104bf0400291ef6b');
                let boost = lab.boostCreep(creep);
                if (boost == ERR_NOT_IN_RANGE)
                    creep.moveTo(lab);
                if (boost == OK)
                    creep.memory.getBoostM = false;
                return;
            }
            if (creep.memory.getBoostH) {
                let lab = Game.getObjectById('5820e8f4467b718b553fbdf5');
                let boost = lab.boostCreep(creep);
                if (boost == ERR_NOT_IN_RANGE)
                    creep.moveTo(lab);
                if (boost == OK)
                    creep.memory.getBoostH = false;
                return;
            }
            if (creep.memory.getBoostT) {
                let lab = Game.getObjectById('5816ece205177e013c41ddce');
                let boost = lab.boostCreep(creep);
                if (boost == ERR_NOT_IN_RANGE)
                    creep.moveTo(lab);
                if (boost == OK)
                    creep.memory.getBoostT = false;
                return;
            }
            creep.memory.getBoost = false;
        }
        if (creep.memory.role == 'attackerM' && creep.memory.getBoost) {
            if (creep.memory.getBoostM) {
                let lab = Game.getObjectById('5822c32a4186e8930ac80648');
                let boost = lab.boostCreep(creep);
                if (boost == ERR_NOT_IN_RANGE)
                    creep.moveTo(lab);
                if (boost == OK)
                    creep.memory.getBoostM = false;
                return;
            }
            if (creep.memory.getBoostT) {
                let lab = Game.getObjectById('58231e97f60d44b54edcbaea');
                let boost = lab.boostCreep(creep);
                if (boost == ERR_NOT_IN_RANGE)
                    creep.moveTo(lab);
                if (boost == OK)
                    creep.memory.getBoostT = false;
                return;
            }
            if (creep.memory.getBoostA) {
                let lab = Game.getObjectById('5819e455c80e052076e314c0');
                let boost = lab.boostCreep(creep);
                if (boost == ERR_NOT_IN_RANGE)
                    creep.moveTo(lab);
                if (boost == OK)
                    creep.memory.getBoostA = false;
                return;
            }
        }
        if (creep.memory.role == 'attackerD' && creep.memory.getBoost) {
            let lab = Game.getObjectById('');
            let boost = lab.boostCreep(creep);
            if (boost == ERR_NOT_IN_RANGE)
                creep.moveTo(lab);
            if (boost == OK)
                creep.memory.getBoost = false;
            return;
        }

        if (creep.memory.role == 'attackerM' || creep.memory.role == 'attackerR') {
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
        }

        var targets = [];
        if (creep.memory.role == 'attackerM' || creep.memory.role == 'attackerR') {
            //attack within range

            //attack creeps in range (ranged)
            if (creep.getActiveBodyparts(RANGED_ATTACK)) {
                targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
                if (targets.length > 0) {
                    attacked = creep.rangedAttack(targets[0]);
                }
                    //attack structure in range in no creeps in range (ranged)
                else {
                    targets = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 3, {
                        filter: (structure) => {
                            return (structure.structureType != STRUCTURE_CONTROLLER)
                        }
                    });
                    if (targets.length > 0) {
                        attacked = creep.rangedAttack(targets[0]);
                    }
                }
            }
                //attack creeps in range (melee)
            else {
                targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1);
                if (targets.length > 0) {
                    attacked = creep.attack(targets[0]);
                }
                    //attack structure in range in no creeps in range (melee)
                else {
                    targets = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 1, {
                        filter: (structure) => {
                            return (structure.structureType != STRUCTURE_CONTROLLER)
                        }
                    });
                    if (targets.length > 0) {
                        attacked = creep.rangedAttack(targets[0]);
                    }
                }
            }
            //Priority attack
            if (enableI && priorityTarget) {
                targets.push(priorityTarget);
            }
            else if (!targets.length) {
                let targets2 = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (targets2)
                    targets.push(targets2);
                if (!targets.length && creep.room.name == sourceRoom)
                    targets = Game.rooms[sourceRoom].find(FIND_HOSTILE_CREEPS);
            }
            if (targets.length > 0) {
                if (creep.getActiveBodyparts(RANGED_ATTACK)) {
                    attacked = creep.rangedAttack(targets[0]);
                    if (attacked == ERR_NOT_IN_RANGE)
                        rangeAttack.run(creep);
                }
                if (creep.getActiveBodyparts(ATTACK)) {
                    attacked = creep.attack(targets[0]);
                    if (attacked == ERR_NOT_IN_RANGE)
                        creep.moveTo(targets[0]);
                }
            }


            if (!targets.length && creep.room.name == sourceRoom) {
                var dism = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType != STRUCTURE_CONTROLLER)
                    }
                });
                if (!dism)
                    dism = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if (creep.attack(dism) != OK)
                    creep.moveTo(dism);
            }
        }
        else if (creep.memory.role == 'attackerD' && creep.room.name == sourceRoom) {
            if (enableID && priorityTargetD) {
                if (creep.dismantle(priorityTargetD) != OK)
                    creep.moveTo(priorityTargetD);

            }
            else {
                var dism = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_CONTROLLER)
                    }
                });
                if (!dism) {
                    if (!targets.length && creep.room.name == sourceRoom) {
                        var dism = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType != STRUCTURE_CONTROLLER)
                            }
                        });
                    }
                }
                if (!dism)
                    dism = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

                if (creep.dismantle(dism) != OK)
                    creep.moveTo(dism);
                {

                }
            }
        }

        if (creep.memory.role == 'attackerH' && enableIH) {
            if (flag)
                creep.moveTo(Game.flags['Flag2']);
            else if (creep.room.name != sourceRoom && sourceRoom != '') {
                var exitDir = Game.map.findExit(creep.room.name, sourceRoom);
                var Exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(Exit);
            }
            else if (targetLocation) {
                creep.moveTo(targetLocation)
            }
        }
        else {
            if (!moveByFlag || !moveByFlagFlag || creep.moveTo(moveByFlagFlag) != OK) {
                if (flag)
                    creep.moveTo(Game.flags['Flag1']);
                else if (creep.room.name != sourceRoom && sourceRoom != '') {
                    var exitDir = Game.map.findExit(creep.room.name, sourceRoom);
                    var Exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(Exit);
                }
                else if (targetLocation && creep.pos != targetLocation.pos && (enableI || enableIH || enableID)) {
                    creep.moveTo(targetLocation)
                }
            }
        }
        if (creep.memory.role != 'attackerH')
            return;
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
        //if ((creep.room.name == sourceRoom || creep.room.name == saveRoom) && creep.hits < (creep.hitsMax * 2 / 3)) {
        //    var exitDir = Game.map.findExit(creep.room.name, saveRoom);
        //    var Exit = creep.pos.findClosestByRange(exitDir);
        //    creep.moveTo(Exit);
        //}
    }
};

module.exports = roleAttackers;