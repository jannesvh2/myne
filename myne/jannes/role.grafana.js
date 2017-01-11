var roleGrafana = {
    run: function () {

        Memory.stats.cpu = Game.cpu;
        Memory.stats.cpu.getUsed = Game.cpu.getUsed();
        Memory.stats.gcl = Game.gcl;
        Memory.stats.tick = Game.time;

        for (let a = 0; a < Memory.global.roomCount; a++) {
            let creeps = {};
            for (var b in Memory.spawns[a].creeps)
                creeps[b] = Memory.spawns[a].creeps[b].length;

            Memory.stats.room[a] = {
                controllerProgress: Game.rooms[Memory.spawns[a].random.mainRoom].controller.progress,
                controllerProgressTotal: Game.rooms[Memory.spawns[a].random.mainRoom].controller.progressTotal,
                level: Game.rooms[Memory.spawns[a].random.mainRoom].controller.level,
                creeps: creeps,
                energyAvailable: Game.rooms[Memory.spawns[a].random.mainRoom].energyAvailable,
                energyCapacityAvailable: Game.rooms[Memory.spawns[a].random.mainRoom].energyCapacityAvailable,
                storedEnergy: Memory.spawns[a].random.storeId ? Game.getObjectById(Memory.spawns[a].random.storeId).store.energy : 0,
                repair: Memory.spawns[a].counters.repairLimit

            }
        }


    }
};


module.exports = roleGrafana;