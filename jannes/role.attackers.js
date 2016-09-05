var roleAttackers = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var enableID = false;
        var enablePriority = false;
        var targetLocation = Game.getObjectById('579fa86e0700be0674d2d98c');
        var priorityTarget = Game.getObjectById('57cc37bffca092544afcc82d');

        //var sourceRoom = targetLocation.room.name;
        var sourceRoom = 'W58S28';

        var targets = [];
        targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
        targets.push(creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 3, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            }
        }));
        targets.push(creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 3));
        if (targets.length > 0) {
            if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
        }
        //If not in the correct room, move towards it
        else if (creep.room.name != sourceRoom && sourceRoom != '') {
            var exitDir = Game.map.findExit(creep.room.name, sourceRoom);
            var Exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(Exit);
        }
        else if (creep.pos != targetLocation.pos) {
            creep.moveTo(targetLocation)
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
                   return (structure.structureType == STRUCTURE_TOWER);
               }
           }));
        }
        else {
            targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 22);
        }

        if (targets.length > 0) {
            if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
        }
    }
};

module.exports = roleAttackers;