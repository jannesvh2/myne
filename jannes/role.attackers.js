var roleAttackers = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var enableID = false;
        var enablePriority = false;
        //var targetLocation = Game.getObjectById('579fa86e0700be0674d2d987');
        var targetLocation = Game.getObjectById('57d2b615e7ba4597490c5023');
        var priorityTarget = Game.getObjectById('57d002bbbbd16aff3afd0b68');

        //var sourceRoom = targetLocation.room.name;
        //var sourceRoom = 'W58S26';
        var sourceRoom = 'W59S29';

        var targets = [];
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
                else if (creep.room.name == sourceRoom) {
                    targets = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_WALL);
                        }
                    });
                    if (targets.length > 0) {
                        if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE);
                    }
                }
            }
        }
            //If not in the correct room, move towards it
        if (creep.room.name != sourceRoom && sourceRoom != '') {
            var exitDir = Game.map.findExit(creep.room.name, sourceRoom);
            var Exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(Exit, { maxOps: 5000 });
        }
        else if (creep.pos != targetLocation.pos) {
            creep.moveTo(targetLocation, { maxOps: 5000 })
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
        else {
            targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 22);
        }

        if (targets.length > 0) {
            if (creep.getActiveBodyparts(RANGED_ATTACK))
                if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE);
                    //creep.moveTo(targets[0]);
            if (creep.getActiveBodyparts(ATTACK))
                if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
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
        }
    }
};

module.exports = roleAttackers;