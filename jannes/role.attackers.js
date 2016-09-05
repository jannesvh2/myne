var roleAttackers = {

    /** @param {Creep} creep **/
    run: function () {
        var enableID = false;
        var enablePriority = false;

        if (creep.pos != Game.getObjectById('57cc37bffca092544afcc82d').pos) {
            //clearing memory of non existing creeps
            var path = creep.pos.findPathTo(Game.getObjectById('57cc37bffca092544afcc82d'));
            Memory.path = Room.serializePath(path);
            creep.moveByPath(Memory.path);
        }
        //Priority attack
        var targets = [];
        if (enableID) {
            targets.push(Game.getObjectById('57cc37bffca092544afcc82d'));
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