var roleGrafana = {

    /** @param {Creep} creep **/
    run: function () {
        if (!Memory.global.grafanaTicks) {
            Memory.global.grafanaTicks = 0;
            Memory.stats = {};
            Memory.stats.cpu = {};
            Memory.stats.gcl = {};
            Memory.stats.room = {};
        }
        Memory.global.grafanaTicks++;

        if (Memory.global.grafanaTicks > 14) {
            Memory.global.grafanaTicks = 0;

            Memory.stats.cpu = Game.cpu;
            Memory.stats.gcl = Game.gcl;
            Memory.stats.tick = Game.time;

            for (let a = 0; a < Memory.global.roomCount; a++) {
                let creeps = {};
                for (var b in Memory.spawns[a].creeps)
                    creeps[b] = Memory.spawns[a].creeps[b].length;

                Memory.stats.room[Memory.spawns[a].random.mainRoom] = {
                    controllerProgress: Game.rooms[Memory.spawns[a].random.mainRoom].controller.progress,
                    controllerProgressTotal: Game.rooms[Memory.spawns[a].random.mainRoom].controller.progressTotal,
                    creeps: creeps,
                    energyAvailable: Game.rooms[Memory.spawns[a].random.mainRoom].energyAvailable,
                    energyCapacityAvailable: Game.rooms[Memory.spawns[a].random.mainRoom].energyCapacityAvailable,
                    storedEnergy: Memory.spawns[a].random.storeId ? Game.getObjectById(Memory.spawns[a].random.storeId).store.energy : 0,

                }
            }


        }


    }
};

module.exports = roleGrafana;