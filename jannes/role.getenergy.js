var roleGetEnergy = {
    run: function (creep, sources) {
        //go to closest source
        var source;
        var newSource = function () {
           // if (creep.memory.role != 'builder' && creep.room.name != 'W59S29')
             //   Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
            if (!creep.memory.sourceId) {
                var tmpsources = sources;
                var tmpsourcesLength = tmpsources.length;
                while (tmpsourcesLength > 0) {
                    var s = 0;
                    creep.memory.sourceId = creep.pos.findClosestByRange(tmpsources);
                    if (creep.memory.sourceId == null || creep.memory.sourceId === undefined)
                        creep.memory.sourceId = tmpsources[Math.floor((Math.random() * tmpsources.length))];
                    creep.memory.sourceId = creep.memory.sourceId.id;
                    if (Memory.spawns[creep.memory.spawn].counters.avgAtSource[creep.memory.sourceId] > 4 || Game.getObjectById(creep.memory.sourceId).energy < 300) {
                        for (let trm = 0, length = tmpsources.length; trm < length; trm++)
                            if (tmpsources[trm].id == creep.memory.sourceId) {
                                tmpsources.splice(trm, 1);
                                tmpsourcesLength--;
                                break;
                            }
                    }
                    else {
                        break;
                    }
                }
            }
        }
        newSource();
        var creepSource = Game.getObjectById(creep.memory.sourceId);

        if (!creepSource || (creepSource.ticksToRegeneration > 30 && creepSource.energy < 300 && creep.energy == 0)) {
            delete creep.memory.sourceId;
            newSource();
            creepSource = Game.getObjectById(creep.memory.sourceId);
        }
        if (creepSource.energy == 0) {
            if (creepSource.ticksToRegeneration > 30) {
                delete creep.memory.sourceId;
                newSource();
                creepSource = Game.getObjectById(creep.memory.sourceId);
            }
            else {
                if (creep.moveTo(creepSource, { maxOps: 5000 }) == ERR_INVALID_TARGET)
                    delete creep.memory._move;

                //creep.moveTo(creepSource);
            }
        }
        var sourceEmpty = creep.harvest(creepSource);
        if (sourceEmpty == ERR_NOT_IN_RANGE) {
            if (creep.moveTo(creepSource, { maxOps: 5000 }) == ERR_INVALID_TARGET)
                delete creep.memory._move;
            Memory.spawns[creep.memory.spawn].counters.atSources[creep.memory.sourceId]++;
            //creep.moveTo(creepSource);
        }
        else if (sourceEmpty == ERR_NOT_ENOUGH_ENERGY && creep.carry.energy != 0)
            creep.memory.full = true;

        else {
            Memory.spawns[creep.memory.spawn].counters.atSources[creep.memory.sourceId]++;
        }
    }

};

module.exports = roleGetEnergy;