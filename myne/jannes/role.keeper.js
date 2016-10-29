var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {

        var hostiles = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostiles && creep.room.name != Memory.spawns[creep.memory.spawn].random.mainRoom)
            Memory.spawns[creep.memory.spawn].random.defenders.push(creep.room.name);

        let room = Game.rooms[creep.memory.sourceRoom];
        if (room) {
            if (creep.reserveController(Game.rooms[creep.memory.sourceRoom].controller) == ERR_NOT_IN_RANGE)
                creep.moveTo(Game.rooms[creep.memory.sourceRoom].controller);
        }
        else {
            var exitDir = Game.map.findExit(creep.room.name, creep.memory.sourceRoom);
            var Exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(Exit);
        }


    }
};

module.exports = roleKeeper;