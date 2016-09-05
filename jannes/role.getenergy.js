var roleGetEnergy = {
    run: function (creep, sources) {
        //go to closest source
        var source;
        if (!creep.memory.sourceId) {

            for (var s = 0; s < sources.length; s++) {
                creep.memory.sourceId = creep.pos.findClosestByPath(sources).id;
                if (sources.length == 1)
                    break;
                if (Memory.avgAtSource[creep.memory.sourceId] > 2 || sources[s].energy < 100) {
                    sources.splice(s, 1);
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