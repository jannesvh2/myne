var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var sourceRoom = '';
        //If not in the correct room, move towards it
        if (creep.room.name != sourceRoom && sourceRoom != '') {
            var exitDir = Game.map.findExit(creep.room.name, sourceRoom);
            var Exit = creep.pos.findClosestByPath(exitDir);
            creep.moveTo(Exit);
        }
    }
};

module.exports = roleKeeper;