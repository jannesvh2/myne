var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {

        //If not in the correct room, move towards it
        for (var spot = 0, length = Memory.spots.length; spot < length; spot++) {
            if (creep.memory.sourceRoom == Memory.spots[spot].sourceRoom) {
                if (creep.room.name != Memory.spots[spot].sourceRoom && Memory.spots[spot].sourceRoom != '') {
                    var exitDir = Game.map.findExit(creep.room.name, Memory.spots[spot].sourceRoom);
                    var Exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(Exit);
                }
                else if (creep.pos.x != Memory.spots[spot].x && creep.pos.y != Memory.spots[spot].y) {
                    creep.moveTo(new RoomPosition(Memory.spots[spot].x, Memory.spots[spot].y, Memory.spots[spot].sourceRoom));
                    
                }
                break;
            }
        }
       
    
    }
};

module.exports = roleKeeper;