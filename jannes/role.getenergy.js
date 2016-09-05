var roleGetEnergy = {
    run: function (creep, sources) {
        //go to closest source
        var source;
        if (!creep.memory.sourceId) {

            for (var s in sources) {
                creep.memory.sourceId = creep.pos.findClosestByPath(sources).id;
                if (Memory.avgAtSource[creep.memory.sourceId] > 2)
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
        if (creep.harvest(Game.getObjectById(creep.memory.sourceId)) == ERR_NOT_IN_RANGE) {
            if (creep.moveTo(Game.getObjectById(creep.memory.sourceId)) == OK) { }
        }
        else
            Memory.atSources[creep.memory.sourceId]++;
    }

};

module.exports = roleGetEnergy;