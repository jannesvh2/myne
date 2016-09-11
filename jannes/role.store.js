var roleStore = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
            delete creep.memory.sourceId;
            creep.say('storing');
        }

        if (creep.memory.full) {
            var targets = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            });

            if (targets) {
                if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }


        }
        else {
            var creepSource = Game.getObjectById(creep.memory.sourceId.id);
            var sourceEmpty = creep.harvest(creepSource);
            if (sourceEmpty == ERR_NOT_IN_RANGE) {
                if (creep.moveTo(creepSource, { maxOps: 5000 }) == ERR_INVALID_TARGET);
            }
        }
    }
};

module.exports = roleStore;