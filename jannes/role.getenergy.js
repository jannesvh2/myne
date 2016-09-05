var roleGetEnergy = {
    run: function (creep, sources, atSources, avgAtSource) {
        //go to closest source
        var source;
        if (!creep.memory.sourceId) {
            var sources = [];

            for (var s in sources) {
                creep.memory.sourceId = creep.pos.findNearest(sources).id;
                if (avgAtSource[creep.memory.sourceId] > 2)
                    for (var i = 0; i < sources.length; i++) {
                        if (sources[i] == s) {
                            sources.splice(i, 1);
                            break;
                        }
                    }
                else {

                    break;
                }
            }
        }
        if (creep.harvest(sources[creep.memory.sourceId]) == ERR_NOT_IN_RANGE) {
            if (creep.moveTo(sources[creep.memory.sourceId]) == OK) { }
        }
        else
            atSources[creep.memory.sourceId]++;
        return atSources;
    }

};

module.exports = roleGetEnergy;