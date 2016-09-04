var roleAttackers = {

    /** @param {Creep} creep **/
    run: function () {
        if (creep.pos != Game.getObjectById('57cc37bffca092544afcc82d').pos) {
            //clearing memory of non existing creeps
            var path = creep.pos.findPathTo(Game.getObjectById('57cc37bffca092544afcc82d'));
            Memory.path = Room.serializePath(path);
            creep.moveByPath(Memory.path);
        }
        var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 22);
        if (targets.length > 0) {
            if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
        }
    }
};

module.exports = roleAttackers;