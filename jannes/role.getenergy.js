var roleGetEnergy = {
    run: function (creep, sources) {
        //go to closest source
        var source;
        var newSource = function(){
            if (!creep.memory.sourceId) {
                var tmpsources = sources;

                for (var s = 0; s < tmpsources.length; s++) {
                    s = 0;
                    if (tmpsources.length == 0)
                        break;
                    creep.memory.sourceId = creep.pos.findClosestByRange(tmpsources).id;
                    if (Memory.avgAtSource[creep.memory.sourceId] > 2.5 || tmpsources[s].energy < 400) {
                        tmpsources.splice(s, 1);
                        s--;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        newSource();
        var creepSource = Game.getObjectById(creep.memory.sourceId);
        if (creepSource.ticksToRegeneration < 30 && creepSource.energy < 200 && creep.energy == 0) {
            delete creep.memory.sourceId;
            newSource();
            creepSource = Game.getObjectById(creep.memory.sourceId);
        }
            if (creep.harvest(creepSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creepSource);
        }
        else
            Memory.atSources[creep.memory.sourceId]++;
    }

};

module.exports = roleGetEnergy;