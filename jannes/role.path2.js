var rolePath = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //Game.spawns['Spawn20'].createCreep([MOVE, CLAIM], undefined, { role: 'path2', spawn: 2, sourceRoom: 'W52S28'});
        if (creep.room.name != creep.memory.sourceRoom) {
            var exitDir = Game.map.findExit(creep.room.name, creep.memory.sourceRoom);
            var Exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(Exit);
        }
        else if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);

        }
    }
};

module.exports = rolePath;