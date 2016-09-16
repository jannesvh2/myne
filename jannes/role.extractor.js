var roleExtractor = {

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
            var extractor = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.extractor);
            if (creep.harvest(extractor) == ERR_NOT_IN_RANGE)
                creep.moveTo(extractor);

        }
        else {
            var terminal = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.terminal);
            if (creep.transfer(extractor) == ERR_NOT_IN_RANGE)
                creep.moveTo(extractor);
        }
    }
};

module.exports = roleExtractor;