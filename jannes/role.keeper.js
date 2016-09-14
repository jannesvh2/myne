var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {
        for (let spot = 0, length = Memory.spawns[creep.memory.spawn].spots.length; spot < length; spot++) {
            //If not in the correct room, move towards it
            if (creep.memory.sourceRoom == Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom && creep.memory.sourceRoom == creep.room.name) {
                let reserveCheck = creep.reserveController(creep.room.controller);
                if (reserveCheck == ERR_NOT_IN_RANGE)
                    creep.moveTo(new RoomPosition(Game.rooms[Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom].controller.pos.x, Game.rooms[Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom].controller.pos.y, Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom), { maxOps: 5000 });

                else if (reserveCheck != OK) {
                    if (creep.room.name != Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom && Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom != '') {
                        var exitDir = Game.map.findExit(creep.room.name, Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom);
                        var Exit = creep.pos.findClosestByRange(exitDir);
                        creep.moveTo(Exit, { maxOps: 5000 });
                    }
                    else if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, { maxOps: 5000 });

                    }
                }

            }
        }


    }
};

module.exports = roleKeeper;