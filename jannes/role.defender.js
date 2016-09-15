var roleDefenders = {

    /** @param {Creep} creep **/
    run: function (creep) {


        var targets = [];
        //If not in the correct room, move towards it

        if (creep.room.name != creep.memory.sourceRoom) {
            var exitDir = Game.map.findExit(creep.room.name, creep.memory.sourceRoom);
            var Exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(Exit, { maxOps: 5000 });
        }
        else {
            var targets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            if (targets) {

                if (creep.attack(targets) == ERR_NOT_IN_RANGE) creep.moveTo(targets);
            }
        }
    }
};

module.exports = roleDefenders;