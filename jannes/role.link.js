var roleLink = {

    /** @param {Creep} creep **/
    run: function (creep) {
        for (var spot = 0, length = Memory.spots.length; spot < length; spot++) {
            if (creep.memory.sourceRoom == Memory.spots[spot].sourceRoom) {
                if (creep.room.name != Memory.spots[spot].sourceRoom && Memory.spots[spot].sourceRoom != '') {
                    var exitDir = Game.map.findExit(creep.room.name, Memory.spots[spot].sourceRoom);
                    var Exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(Exit, { maxOps: 10000 });
                }
                else if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, { maxOps: 10000 });

                }
                break;
            }
        }
    }
};

module.exports = roleLink;