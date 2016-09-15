var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {

        var hostiles = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostiles)
            Memory.spawns[0].random.defenders.push(creep.room.name);

        for (let spot = 0, length = Memory.spawns[creep.memory.spawn].spots.length; spot < length; spot++) {
            //If not in the correct room, move towards it
            if (creep.memory.sourceRoom == Memory.spawns[creep.memory.spawn].spots[spot].sourceRoom) {
                if (Game.rooms[creep.memory.sourceRoom]) {
                    let reserveCheck = creep.reserveController(Game.rooms[creep.memory.sourceRoom].controller);
                    if (reserveCheck == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.rooms[creep.memory.sourceRoom].controller, { maxOps: 5000 });
                    }
                }
                else {
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