var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //clearing memory of non existing creeps
        var path = creep.pos.findPathTo(Game.getObjectById('57cc37bffca092544afcc82d'));
        creep.moveByPath(Memory.path);
    }
};

module.exports = roleKeeper;