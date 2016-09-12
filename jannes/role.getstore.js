var roleGetStore = {
    run: function (creep) {
        //go to closest source
        var source;
        if (creep.memory.role != 'builder')
            Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);

        function checkStore(store) {
            return store.container.store.energy > (creep.carryCapacity + store.energyUsed);
        }

        var newSource = function () {
            if (creep.memory.sourceId && creep.memory.sourceId.store.energy < creep.carryCapacity)
                delete creep.memory.sourceId;
            
            if (!creep.memory.sourceId) {
                var storeList = Memory.spawns[creep.memory.spawn].store.filter(checkStore);
                var filterStore = [];
                for (var sl = 0, length = storeList.length; sl < length; sl++) {
                    filterStore.push(storeList[sl].container);
                }
                if (filterStore) {
                    creep.memory.sourceId = creep.pos.findClosestByRange(filterStore);
                    if (!creep.memory.sourceId) {
                        creep.memory.sourceId = filterStore[Math.floor((Math.random() * filterStore.length))];
                    }
                }
            }
        }
        newSource();
        //REMOVE getObjectById
        if (creep.memory.sourceId) {
        var creepSource = Game.getObjectById(creep.memory.sourceId.id);

        if (creepSource) {
            for (var u = 0, length = Memory.spawns[creep.memory.spawn].store.length; u < length; u++) {
                if (Memory.spawns[creep.memory.spawn].store[u].container.id == creep.memory.sourceId)
                    Memory.spawns[creep.memory.spawn].store[u].energyUsed += creep.carryCapacity;
            }
            if (creepSource.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creepSource);
            }
            var transferReturn = creepSource.transfer(creep, RESOURCE_ENERGY);
            if (transferReturn == ERR_NOT_IN_RANGE) {
                creep.moveTo(creepSource);
            }
            if (transferReturn == ERR_NOT_ENOUGH_ENERGY) {
                delete creep.memory.sourceId;
                newSource();
                creep.moveTo(creepSource);
            }

        }
        else {
            creep.memory.sourceId = Memory.spawns[creep.memory.spawn].store[Math.floor((Math.random() * Memory.spawns[creep.memory.spawn].store.length))];
            var creepSource = Game.getObjectById(creep.memory.sourceId.id);
            creep.moveTo(creepSource);
        }
    }

}

};

module.exports = roleGetStore;