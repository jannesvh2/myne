var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {

        var hostiles = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostiles && creep.room.name != Memory.spawns[creep.memory.spawn].random.mainRoom)
            Memory.spawns[creep.memory.spawn].random.defenders.push(creep.room.name);

        if (creep.memory.sourceRoom == creep.room.name) {
            if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE)
                creep.moveTo(creep.room.controller);
        }
        else {
            var exitDir = Game.map.findExit(creep.room.name, Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom);
            var Exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(Exit);
        }


    }
};

module.exports = roleKeeper;