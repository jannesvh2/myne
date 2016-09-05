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
                var tmp = creep.pos.findClosestByPath(tmpsources)
                if (tmp)
                    creep.memory.sourceId = tmp.id;
                if (creep.memory.sourceId && (Memory.avgAtSource[creep.memory.sourceId] > 2.5 || tmpsources[s].energy < 100)) {
                    tmpsources.splice(s, 1);
                }
                else {
                    break;
                }
            }
            if (!creep.memory.sourceId) {
                creep.memory.sourceId = sources[sources.length - 1].id;
                console.log('NO ID');
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