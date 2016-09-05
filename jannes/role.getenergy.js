var roleGetEnergy = {
    run: function (creep, sources) {
        //go to closest source
        var source;
        if (!creep.memory.source) {

            for (var s in sources) {
                creep.memory.source = creep.pos.findClosestByPath(sources);
                if (Memory.avgAtSource[creep.memory.source.id] > 2)
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
        if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
            if (creep.moveTo(sources[creep.memory.source]) == OK) { }
        }
        else
            Memory.atSources[creep.memory.source.id]++;
    }

};

module.exports = roleGetEnergy;