var roleGetStore = {
    run: function (creep) {
        //go to closest source
        var source;
        if (creep.memory.role != 'builder' && creep.memory.role != 'builder2')
            Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);

        function checkStore(store) {
            return store.container.store.energy > (creep.carryCapacity + store.energyUsed);
        }

        var newSource = function () {
            if (creep.memory.sourceId && !creep.memory.sourceId.store)
                delete creep.memory.sourceId;
            else if (creep.memory.sourceId && creep.memory.sourceId.store.energy < creep.carryCapacity)
                delete creep.memory.sourceId;

            if (!creep.memory.sourceId) {
                var storeList = Memory.spawns[creep.memory.spawn].store.filter(checkStore);
                var filterStore = [];
                for (let sl = 0, length = storeList.length; sl < length; sl++) {
                    filterStore.push(storeList[sl].container);
                }
                if (filterStore)
                    creep.memory.sourceId = creep.pos.findClosestByRange(filterStore);
                else
                    creep.memory.sourceId = Memory.spawns[creep.memory.spawn].store[Math.floor((Math.random() * Memory.spawns[creep.memory.spawn].store.length))];


            }
        }
        newSource();
        //REMOVE getObjectById
        if (creep.memory.sourceId) {
            var creepSource = Game.getObjectById(creep.memory.sourceId.id);

            if (creepSource) {
                for (let u = 0, length = Memory.spawns[creep.memory.spawn].store.length; u < length; u++) {
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
                    creep.moveTo(creepSource);
                }

            }
        }

    }

};

module.exports = roleGetStore;