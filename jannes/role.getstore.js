var roleGetStore = {
    run: function (creep) {
        //go to closest source
        var source;
        if (creep.memory.role != 'builder' && creep.room.name != 'W59S29')
            Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);

        function checkStore(store) {
            return store.container.energy > creep.carryCapacity + store.energyUsed;
        }

        var newSource = function () {
            if (!creep.memory.sourceId) {
                var filterStore = Memory.store.filter(checkStore).container;
                if (filterStore) {
                    creep.memory.sourceId = creep.pos.findClosestByRange(filterStore).id;
                    for (var u = 0, length = Memory.store.length; u < Memory.store.length; u++) {
                        if (Memory.store[u].container.id == creep.memory.sourceId)
                            Memory.store[u].energyUsed += creep.carryCapacity;
                    }
                }
            }
        }
        newSource();
        //REMOVE getObjectById
        if (creep.memory.sourceId){
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