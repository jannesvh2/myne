var rolePath = {

    /** @param {Creep} creep **/
    run: function (creep) {

        var path = spawn.pos.findPathTo(RoomPosition(4, 7, 'W14N58'));
        Memory.path = Room.serializePath(path);
        creep.say("path");
        console.log(Memory.path);
        creep.moveByPath(Memory.path);
        creep.build(STRUCTURE_ROAD);
    }
};

module.exports = rolePath;