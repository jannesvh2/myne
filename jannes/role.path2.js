var rolePath = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.path == null) {
            var path = creep.pos.findPathTo(4, 7, 'W14N58');
            Memory.path = Room.serializePath(path);
            creep.say("path");
            console.log(Memory.path);
            creep.moveByPath(Memory.path);
            if (creep.pos.room == 'W14N59 ')
                Game.rooms.W14N59.createConstructionSite(10, 15, STRUCTURE_ROAD);
            if (creep.pos.room == 'W14N58 ')
                Game.rooms.W14N58.createConstructionSite(10, 15, STRUCTURE_ROAD);
            Game.constructionSites(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
            creep.memory.path = Memory.path;
        }
        else {
            creep.moveByPath(Memory.path);
            if (creep.pos.room == 'W14N59 ')
                Game.rooms.W14N59.createConstructionSite(10, 15, STRUCTURE_ROAD);
            if (creep.pos.room == 'W14N58 ')
                Game.rooms.W14N58.createConstructionSite(10, 15, STRUCTURE_ROAD);
        }
    }
};

module.exports = rolePath;