var rolePath = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (screep.memory.path == null) {
            var path = creep.pos.findPathTo(4, 7, 'W14N58');
            Memory.path = Room.serializePath(path);
            creep.say("path");
            console.log(Memory.path);
            creep.moveByPath(Memory.path);
            GamecreateConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
            creep.memory.path = Memory.path;
        }
        else {
            creep.moveByPath(Memory.path);
            GamecreateConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
        }
    }
};

module.exports = rolePath;