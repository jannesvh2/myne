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
            if (terminal.store.energy < 240000) {
                for (var resource in creep.carry) {
                    if (creep.carry[resource] > 0) {
                        if (creep.transfer(terminal, resource) == ERR_NOT_IN_RANGE)
                            creep.moveTo(terminal);
                        break;
                    }
                }
            }

        }
        else {
            var energy = creep.pos.findInRange(
                FIND_DROPPED_ENERGY,
                1
            );
            if (energy.length) {
                creep.pickup(energy[0]);
            }
            var extractor = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.extractor);
            if (creep.harvest(extractor) == ERR_NOT_IN_RANGE)
                creep.moveTo(extractor);
        }
    }
};

module.exports = roleExtractor;