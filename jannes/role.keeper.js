var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //clearing memory of non existing creeps
        var path = creep.pos.findPathTo(1, 9, 'W14N58');
        Memory.path = Room.serializePath(path);
        creep.say("path");
        creep.moveByPath(Memory.path);
    }
};

module.exports = roleKeeper;