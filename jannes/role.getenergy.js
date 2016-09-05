var roleGetEnergy = {
    run: function (creep, sources) {
        //go to closest source
        var source;
        var tmpsources = sources;
        if (!creep.memory.sourceId) {

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
        if (creep.harvest(Game.getObjectById(creep.memory.sourceId)) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.sourceId));
        }
        else
            Memory.atSources[creep.memory.sourceId]++;
    }

};

module.exports = roleGetEnergy;