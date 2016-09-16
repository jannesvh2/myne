var roleExtractor = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var total = _.sum(creep.carry);
        if (creep.memory.full && total == 0) {
            creep.memory.full = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.full && total == creep.carryCapacity) {
            creep.memory.full = true;
            creep.say('storing');
        }

        if (creep.memory.full) {

            var terminal = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.terminal.id);
            if (creep.transfer(terminal) == ERR_NOT_IN_RANGE)
                creep.moveTo(terminal);

        }
        else {

            var extractor = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.extractor);
            if (creep.harvest(extractor) == ERR_NOT_IN_RANGE)
                creep.moveTo(extractor);
        }
    }
};

module.exports = roleExtractor;