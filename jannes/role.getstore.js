var roleGetStore = {
    run: function (creep) {
        //go to closest source
       // if (creep.memory.role != 'builder' && creep.memory.role != 'builder2')
        //    Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);

        if (!creep.memory.sourceId) {
            if (Memory.spawns[creep.memory.spawn].store.length) {
                creep.memory.sourceId = Memory.spawns[creep.memory.spawn].store[0].id;
                Memory.spawns[creep.memory.spawn].store.splice(0, 1);
            }
        }

        if (creep.memory.sourceId) {
            var creepSource = Game.getObjectById(creep.memory.sourceId);

            if (creepSource) {
                if (creepSource.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creepSource);
                }

            }
        }

    }

};

module.exports = roleGetStore;