var roleGetEnergy = {
    run: function (creep, sources) {
        //go to closest source
        var source;
        var tmpsources = sources;
        if (!creep.memory.sourceId) {

            for (var s = 0; s < tmpsources.length; s++) {
                if (tmpsources.length < 1)
                    break;
                creep.memory.sourceId = creep.pos.findClosestByPath(tmpsources).id;
                if (Memory.avgAtSource[creep.memory.sourceId] > 2 || tmpsources[s].energy < 100) {
                    tmpsources.splice(s, 1);
                    s--;
                }
                else {
                    break;
                }
            }
        }
        if (creep.harvest(Game.getObjectById(creep.memory.sourceId)) == ERR_NOT_IN_RANGE) {
            if (creep.moveTo(Game.getObjectById(creep.memory.sourceId)) == OK) { }
        }
        else
            Memory.atSources[creep.memory.sourceId]++;
    }

};

module.exports = roleGetEnergy;