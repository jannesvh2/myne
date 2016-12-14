var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.sk)
            Memory.spawns[creep.memory.spawn].random.defenders.push(creep.memory.sourceRoom);
        else {
            var hostiles = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (hostiles && creep.room.name != Memory.spawns[creep.memory.spawn].random.mainRoom)
                Memory.spawns[creep.memory.spawn].random.defenders.push(creep.room.name);
        }
        if (creep.memory.flag) {
            creep.moveTo50(Game.flags[creep.memory.flag]);
            return;
        }
        let room = Game.rooms[creep.memory.sourceRoom];
        if (room && creep.memory.sk) {
            if (creep.pos.roomName == creep.memory.sourceRoom) {
                if (creep.pos.x != creep.memory.x || creep.pos.y != creep.memory.y) {
                    creep.moveTo(creep.memory.x, creep.memory.y);
                }
                return;
            }
            room = null;
        }
        if (room) {

            if (creep.reserveController(Game.rooms[creep.memory.sourceRoom].controller) == ERR_NOT_IN_RANGE)
                creep.moveTo50(Game.rooms[creep.memory.sourceRoom].controller);
        }
        else {
            var exitDir = Game.map.findExit(creep.room.name, creep.memory.sourceRoom);
            var Exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo50(Exit);
        }


    }
};

module.exports = roleKeeper;