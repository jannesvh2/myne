var roleStore = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
            creep.say('storing');
        }

        if (creep.memory.full) {
            var targets = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity);
                }
            });

            if (targets) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }


        }
        else {
            var creepSource = Game.getObjectById(creep.memory.sourceId.id);
            var sourceEmpty = creep.harvest(creepSource);
            if (sourceEmpty != OK) {
                if (creep.moveTo(creepSource, { maxOps: 5000 }) == ERR_INVALID_TARGET);
            }
        }
    }
};

module.exports = roleStore;