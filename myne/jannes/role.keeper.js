var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {

        var hostiles = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostiles && creep.room.name != Memory.spawns[creep.memory.spawn].random.mainRoom)
            Memory.spawns[creep.memory.spawn].random.defenders.push(creep.room.name);

        for (let spot = 0, length = Memory.spawns[creep.memory.spawn].spots.length; spot < length; spot++) {
            //If not in the correct room, move towards it
            if (creep.memory.sourceRoom == Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom) {
                if (Game.rooms[creep.memory.sourceRoom]) {
                    let reserveCheck = creep.reserveController(Game.rooms[creep.memory.sourceRoom].controller);
                    if (reserveCheck == ERR_NOT_IN_RANGE) {
                        creep.moveTo(new RoomPosition(Game.rooms[creep.memory.sourceRoom].controller.pos.x, Game.rooms[creep.memory.sourceRoom].controller.pos.y, creep.memory.sourceRoom));

                    }
                }
                else {
                    if (creep.room.name != Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom && Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom != '') {
                        var exitDir = Game.map.findExit(creep.room.name, Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom);
                        var Exit = creep.pos.findClosestByRange(exitDir);
                        creep.moveTo(Exit);
                    }
                    else if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);

                    }
                }
            }
        }


    }
};

module.exports = roleKeeper;