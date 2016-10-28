var rolePath = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //Game.spawns['Spawn20'].createCreep([MOVE, CLAIM], undefined, { role: 'path2', spawn: 2, sourceRoom: 'W52S28'});
        if (creep.room.name != creep.memory.sourceRoom) {
            var flag = Game.flags['Flag7'];
            if (flag) {
                if (!creep.memory.flag || creep.memory.flag == 1) {
                    creep.moveTo(flag);
                    if (flag.room.name == creep.room.name)
                        creep.memory.flag = 2;
                    return;
                }
                if (creep.memory.flag == 2) {

                    flag = Game.flags['Flag3'];
                    creep.moveTo(flag);
                    if (flag.room.name == creep.room.name)
                        creep.memory.flag = 3;
                    return;
                }
                if (creep.memory.flag == 3) {

                    flag = Game.flags['Flag4'];
                    creep.moveTo(flag);
                    if (flag.room.name == creep.room.name)
                        creep.memory.flag = 4;
                    return;
                }
                if (creep.memory.flag == 4) {

                    flag = Game.flags['Flag4'];
                    creep.moveTo(flag);
                    return;
                }


            }
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