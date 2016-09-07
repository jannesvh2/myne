var roleGetEnergy = {
    run: function (creep, sources) {
        //go to closest source
        var source;
        var newSource = function () {
            if (!creep.memory.sourceId) {
                var tmpsources = sources;

                while (tmpsources.length) {
                    var s = 0;
                    creep.memory.sourceId = creep.pos.findClosestByRange(tmpsources);
                    if (creep.memory.sourceId == null)
                        creep.memory.sourceId = tmpsources[Math.floor((Math.random() * tmpsources.length))];
                    creep.memory.sourceId = creep.memory.sourceId.id;
                    if (Memory.avgAtSource[creep.memory.sourceId] > 2.5 || Game.getObjectById(creep.memory.sourceId).energy < 300) {
                        for (var trm = 0; trm < tmpsources.length; trm++)
                            if (tmpsources[trm].id == creep.memory.sourceId)
                                  tmpsources.splice(trm, 1);
                    }
                    else {
                        break;
                    }
                }
            }
        }
        newSource();
        var creepSource = Game.getObjectById(creep.memory.sourceId);
        if (!creepSource || (creepSource.ticksToRegeneration < 30 && creepSource.energy < 300 && creep.energy == 0)) {
            delete creep.memory.sourceId;
            newSource();
            creepSource = Game.getObjectById(creep.memory.sourceId);
        }
        var sourceEmpty = creep.harvest(creepSource);
        if (sourceEmpty == ERR_NOT_IN_RANGE) {
            creep.moveTo(creepSource, [50000]);
        }
        else if (sourceEmpty == ERR_NOT_ENOUGH_ENERGY && creep.carry.energy != 0)
            creep.memory.full = true;

        else {
            Memory.atSources[creep.memory.sourceId]++;
        }
    }

};

module.exports = roleGetEnergy;