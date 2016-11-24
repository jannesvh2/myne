var roleGetStore = {
    run: function (creep) {
        //go to closest source
        // if (creep.memory.role != 'builder' && creep.memory.role != 'builder2')
        //    Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);

        if (!creep.memory.sourceId) {
            for (let a = 0, length = Memory.spawns[creep.memory.spawn].random.roomContainers.length; a < length; a++) {
                if (Memory.spawns[creep.memory.spawn].random.roomContainers[a].store.energy == 2000) {
                    if (creep.memory.room) {
                        if (Memory.spawns[creep.memory.spawn].random.roomContainers[a].pos.roomName == creep.memory.room) {
                            creep.memory.sourceId = Memory.spawns[creep.memory.spawn].random.roomContainers[a].id;
                            break;
                        }
                    }
                    else {
                        creep.memory.sourceId = Memory.spawns[creep.memory.spawn].random.roomContainers[a].id;
                        break;
                    }
                }
            }

            if (!creep.memory.sourceId) {
                Memory.spawns[creep.memory.spawn].store = [];
                //remove containers with a creep on the way
                var creeps = Memory.spawns[creep.memory.spawn].creeps.harvesters2;
                var counter = 0;
                for (let b = 0, length = Memory.spawns[creep.memory.spawn].random.roomContainers.length; b < length; b++) {
                    Memory.spawns[creep.memory.spawn].store.push(Memory.spawns[creep.memory.spawn].random.roomContainers[b]);
                    for (let c = 0, length2 = creeps.length; c < length2; c++) {
                        if (Game.creeps[creeps[c]].memory.sourceId && Game.creeps[creeps[c]].memory.sourceId == Memory.spawns[creep.memory.spawn].store[b - counter].id) {
                            Memory.spawns[creep.memory.spawn].store.splice(b - counter, 1);
                            counter++;
                            break;
                        }

                    }

                }
                Memory.spawns[creep.memory.spawn].store.sort(function (a, b) {
                    return b.store.energy - a.store.energy;
                });

                if (creep.memory.room) {
                    for (let a = 0, length = Memory.spawns[creep.memory.spawn].store.length; a < length; a++) {
                        if (Memory.spawns[creep.memory.spawn].store[a].pos.roomName == creep.memory.room) {

                            creep.memory.sourceId = Memory.spawns[creep.memory.spawn].store[a].id;
                            Memory.spawns[creep.memory.spawn].store.splice(a, 1);
                            break;
                        }
                    }
                }
                else if (Memory.spawns[creep.memory.spawn].store.length) {
                    creep.memory.sourceId = Memory.spawns[creep.memory.spawn].store[0].id;
                    Memory.spawns[creep.memory.spawn].store.splice(0, 1);
                }
            }
        }

        if (creep.memory.sourceId) {
            var creepSource = Game.getObjectById(creep.memory.sourceId);
            if (!creepSource)
                delete creep.memory.sourceId;

            if (creepSource) {
                if (creepSource.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creepSource);
                }

            }

        }

        if (creep.carry.energy > (creep.carryCapacity * 0.70)) {
            creep.memory.full = true;
            delete creep.memory.sourceId;
        }
    }

};

module.exports = roleGetStore;