var roleMover = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
        }
        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
        }
        if (creep.memory.full) {
            var storage = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.storeId);
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(storage);
        }
        else {
            var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK);
                }
            });

            if (creep.withdraw(target) == ERR_NOT_IN_RANGE)
                creep.moveTo(target);
        }
    }
};

module.exports = roleMover;