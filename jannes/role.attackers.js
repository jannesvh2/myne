var roleAttackers = {

    /** @param {Creep} creep **/
    run: function () {
        var enableID = false;
        var enablePriority = false;
        var targetLocation = Game.getObjectById('57cc37bffca092544afcc82d');
        var priorityTarget = Game.getObjectById('57cc37bffca092544afcc82d');

        var sourceRoom = targetLocation.room.name;

        //If not in the correct room, move towards it
        if (creep.room.name != sourceRoom && sourceRoom != '') {
            var exitDir = Game.map.findExit(creep.room.name, sourceRoom);
            var Exit = creep.pos.findClosestByPath(exitDir);
            creep.moveTo(Exit);
        }
        else if (creep.pos != targetLocation.pos) {
            creep.moveTo(targetLocation)
        }
        //Priority attack
        var targets = [];
        if (enableID) {
            targets.push(priorityTarget);
        }

        else if (enablePriority) {
           targets = creep.room.find(FIND_HOSTILE_CREEPS, {
                filter: function (object) {
                    return object.getActiveBodyparts(ATTACK) == 0 || object.getActiveBodyparts(RANGED_ATTACK) == 0;
                }
            });
           targets.push(Game.rooms[myRooms].find(FIND_STRUCTURES, {
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