var roleGetEnergy = {
    run: function (creep, sources) {
        //go to closest source
        var source;
        var newSource = function () {
            if (!creep.memory.sourceId) {
                console.log(creep.name);
                var tmpsources = sources;

                while (tmpsources.length) {
                    var s = 0;
                    if (tmpsources.length == 0)
                        break;
                    creep.memory.sourceId = creep.pos.findClosestByRange(tmpsources).id;
                    if (Memory.avgAtSource[creep.memory.sourceId] > 2.5 || Game.getObjectById(creep.memory.sourceId).energy < 300) {
                        tmpsources.splice(s, 1);
                    }
                    else {
                        break;
                    }
                }
            }
        }
        newSource();
        var creepSource = Game.getObjectById(creep.memory.sourceId);
        if (creepSource.ticksToRegeneration === undefined || (creepSource.ticksToRegeneration < 30 && creepSource.energy < 300 && creep.energy == 0)) {
            delete creep.memory.sourceId;
            newSource();
            console.log(creep.name +" "+ creepSource.ticksToRegeneration);
            creepSource = Game.getObjectById(creep.memory.sourceId);
        }
        var sourceEmpty = creep.harvest(creepSource);
        if (sourceEmpty == ERR_NOT_IN_RANGE) {
            creep.moveTo(creepSource);
        }
        else if (sourceEmpty == ERR_NOT_ENOUGH_ENERGY && creep.carry.energy != 0)
            creep.memory.full = true;

        else {
            Memory.atSources[creep.memory.sourceId]++;
        }
    }

};

module.exports = roleGetEnergy;