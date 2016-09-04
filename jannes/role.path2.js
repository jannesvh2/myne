var rolePath = {

    /** @param {Creep} creep **/
    run: function (creep) {
            var path = creep.pos.findPathTo(4, 7, 'W14N58');
            Memory.path = Room.serializePath(path);
            creep.say("path");
            console.log(Memory.path);
            creep.moveByPath(Memory.path);
            if (creep.pos.roomName == 'W14N59')
                Game.rooms.W14N59.createConstructionSite(10, 15, STRUCTURE_ROAD);
            if (creep.pos.roomName == 'W14N58')
                Game.rooms.W14N58.createConstructionSite(10, 15, STRUCTURE_ROAD);
    }
};

module.exports = rolePath;