var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //clearing memory of non existing creeps
        var path = creep.pos.findPathTo(21, 18, 'W14N58');
        Memory.path = Room.serializePath(path);
        creep.say("path");
        console.log(Memory.path);
        creep.moveByPath(Memory.path);
    }
};

module.exports = roleKeeper;