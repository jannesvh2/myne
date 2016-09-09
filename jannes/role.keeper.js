var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {

        //If not in the correct room, move towards it
        for (var spot = 0, length = Memory.spots.length; spot < length; spot++) {
            if (creep.memory.sourceRoom == Memory.spots[spot].sourceRoom) {
                if (creep.room.name != Memory.spots[spot].sourceRoom && Memory.spots[spot].sourceRoom != '') {
                    var exitDir = Game.map.findExit(creep.room.name, Memory.spots[spot].sourceRoom);
                    var Exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(Exit, { maxOps: 5000 });
                }
                else if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, { maxOps: 5000 });
                    
                }
                break;
            }
        }
       
    
    }
};

module.exports = roleKeeper;