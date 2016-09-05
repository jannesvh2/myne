var rolePath = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var targetLocation = Game.getObjectById('579fa86e0700be0674d2d98c');
        var sourceRoom = 'W58S28';
        if (creep.room.name != sourceRoom && sourceRoom != '') {
            var exitDir = Game.map.findExit(creep.room.name, sourceRoom);
            var Exit = creep.pos.findClosestByRange(exitDir);
            Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
            creep.moveTo(Exit);
        }
        else if (creep.pos != targetLocation.pos) {
            Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
            creep.moveTo(targetLocation)
        }
    }
};

module.exports = rolePath;