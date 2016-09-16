var roleGetStore = {
    run: function (creep) {
        //go to closest source
       // if (creep.memory.role != 'builder' && creep.memory.role != 'builder2')
        //    Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
        var energy = creep.pos.findInRange(
            FIND_DROPPED_ENERGY,
            1
        );

        if (energy.length) {
            console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
            creep.pickup(energy[0]);
            if (creep.carry.energy > (creep.carryCapacity * 0.70)) {
                creep.memory.full = true;
                delete creep.memory.sourceId;
            }

        }
        if (!creep.memory.sourceId) {
            if (Memory.spawns[creep.memory.spawn].store.length) {
                creep.memory.sourceId = Memory.spawns[creep.memory.spawn].store[0].id;
                Memory.spawns[creep.memory.spawn].store.splice(0, 1);
            }
        }

        if (creep.memory.sourceId) {
            var creepSource = Game.getObjectById(creep.memory.sourceId);

            if (creepSource) {
                var transferReturn = creepSource.transfer(creep, RESOURCE_ENERGY);
                if (transferReturn == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creepSource);
                }
                if (transferReturn == ERR_NOT_ENOUGH_ENERGY) {
                    creep.moveTo(creepSource);
                }
                if (transferReturn == OK) {
                    creep.memory.full = true;
                    delete creep.memory.sourceId;
                }

            }
        }

    }

};

module.exports = roleGetStore;