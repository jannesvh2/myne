var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var goTo = function (spot) {
            if (creep.memory.sourceRoom == spot.sourceRoom) {
                if (creep.room.name != spot.sourceRoom && spot.sourceRoom != '') {
                    var exitDir = Game.map.findExit(creep.room.name, spot.sourceRoom);
                    var Exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(Exit);
                }
                else if (creep.pos.x != spot.x && creep.pos.y != spot.y) {
                    creep.moveTo(new RoomPosition(spot.x, spot.y, spot.sourceRoom));
                }
            }
        }

        var sourceRoom = '';
        //If not in the correct room, move towards it
        var sourceRoom = 'W59S28';
        Memory.spots.forEach(spot => goTo(spot));
       
    
    }
};

module.exports = roleKeeper;