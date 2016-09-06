var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var goTo = function (spot) {
            if (creep.memory.spot == spot.sourceRoom) {
                if (creep.room.name != spot.sourceRoom && spot.sourceRoom != '') {
                    var exitDir = Game.map.findExit(creep.room.name, spot.sourceRoom);
                    var Exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(Exit);
                }
                else if (creep.pos != targetLocation.pos) {
                    creep.moveTo(spot.x, spot.y)
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