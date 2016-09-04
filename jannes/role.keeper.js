var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.pos != Game.getObjectById('57cc37bffca092544afcc82d').pos) {
            //clearing memory of non existing creeps
            var path = creep.pos.findPathTo(Game.getObjectById('57cc37bffca092544afcc82d'));
            Memory.path = Room.serializePath(path);
            creep.moveByPath(Memory.path);
        }
    }
};

module.exports = roleKeeper;