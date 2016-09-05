var rolePath = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //Game.spawns['Spawn1'].createCreep([MOVE], undefined, { role: 'path2' });
        var targetLocation = Game.getObjectById('57cb94ac3133992c79fff597');
        var sourceRoom = 'W59S28';
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