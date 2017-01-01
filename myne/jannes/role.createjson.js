var roleLink = require('role.link');

var roleCreateJSON = {

    /** @param {Creep} creep **/
    run: function () {

        //clearing memory of non existing creeps
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                Memory.global.checkCreeps = true;
                delete Memory.creeps[name];
                //console.log('Clearing non-existing creep memory:', name);
            }
        }

        //init
        Memory.global.roomCount = 12;
        if (!Memory.spawns)
            Memory.spawns = [];

        for (let a = 0; a < Memory.global.roomCount; a++) {
            if (!Memory.spawns[a]) {
                Memory.spawns.push(new Object());

                Memory.spawns[a].summon = {};
                Memory.spawns[a].random = {};
                Memory.spawns[a].random.defenders = [];
                Memory.spawns[a].creeps = {};
                Memory.spawns[a].counters = {};
                Memory.spawns[a].counters.upgradeTicks = 0;
                Memory.spawns[a].counters.roomTicks = 0;
                Memory.spawns[a].random.storageReserve = 0;
                Memory.spawns[a].counters.repairLimit = 10000;
                Memory.spawns[a].counters.avgAtSource = {};
                Memory.spawns[a].counters.atSources = {};
                Memory.spawns[a].repairHp = {};
                Memory.spawns[a].repairHpHistory = {};
                Memory.spawns[a].links = {};
                Memory.spawns[a].random.hostiles = false;
                Memory.spawns[a].random.towerHostiles = {};
                Memory.spawns[a].counters.towerHostiles = 1500;
                Memory.spawns[a].random.reactions = [];
                Memory.spawns[a].counters.roomCounter = 0;
                Memory.spawns[a].counters.avgUpgraders = 0;
                Memory.spawns[a].counters.avgUpgradersValue = 0;
                Memory.spawns[a].random.avgUpgraders = [];
                Memory.spawns[a].random.roomContainers = [];
                Memory.spawns[a].sources = [];
                Memory.spawns[a].random.upgradeSpots = [];
            }

            //ticks
            Memory.spawns[a].counters.roomCounter++;
            Memory.spawns[a].counters.upgradeTicks++;
            Memory.spawns[a].counters.avgUpgraders++;
            //Memory.spawns[a].counters.roomTicks++;
            if (Memory.spawns[a].random.storeId && Memory.spawns[a].random.storageReserve < 500000)
                Memory.spawns[a].random.storageReserve += 3;

            //repair reset if its to high
            if (Memory.spawns[a].counters.repairLimit > 100000000)
                Memory.spawns[a].counters.repairLimit = 10000;

            if (Memory.global.checkCreeps) {
                //current creeps
                Memory.spawns[a].creeps.harvesters = [];
                Memory.spawns[a].creeps.harvesters2 = [];
                Memory.spawns[a].creeps.builders = [];
                Memory.spawns[a].creeps.helpers = [];
                Memory.spawns[a].creeps.builders2 = [];
                Memory.spawns[a].creeps.upgraders = [];
                Memory.spawns[a].creeps.upgraders2 = [];
                Memory.spawns[a].creeps.stores = [];
                Memory.spawns[a].creeps.attackersM = [];
                Memory.spawns[a].creeps.attackersR = [];
                Memory.spawns[a].creeps.attackersH = [];
                Memory.spawns[a].creeps.attackersD = [];
                Memory.spawns[a].creeps.scouts = [];
                Memory.spawns[a].creeps.defenders = [];
                Memory.spawns[a].creeps.movers = [];
                Memory.spawns[a].creeps.users = [];
                Memory.spawns[a].creeps.terminals = [];
                Memory.spawns[a].creeps.toTerminals = [];
                Memory.spawns[a].creeps.toStores = [];
                Memory.spawns[a].creeps.claims = [];
                Memory.spawns[a].counters.creeps = 0;
                Memory.spawns[a].store = [];
            }
        }

        if (Memory.global.checkCreeps) {
            Memory.global.checkCreeps = false;
            for (let name in Game.creeps) {
                let creep = Game.creeps[name];
                Memory.spawns[creep.memory.spawn].counters.creeps++;
                if (creep.memory.helper)
                    Memory.spawns[creep.memory.spawn].creeps.helpers.push(creep.name);
                else if (creep.memory.role == 'harvester')
                    Memory.spawns[creep.memory.spawn].creeps.harvesters.push(creep.name);
                else if (creep.memory.role == 'harvester2')
                    Memory.spawns[creep.memory.spawn].creeps.harvesters2.push(creep.name);
                else if (creep.memory.role == 'builder')
                    Memory.spawns[creep.memory.spawn].creeps.builders.push(creep.name);
                else if (creep.memory.role == 'builder2')
                    Memory.spawns[creep.memory.spawn].creeps.builders2.push(creep.name);
                else if (creep.memory.role == 'upgrader')
                    Memory.spawns[creep.memory.spawn].creeps.upgraders.push(creep.name);
                else if (creep.memory.role == 'upgrader2')
                    Memory.spawns[creep.memory.spawn].creeps.upgraders2.push(creep.name);
                else if (creep.memory.role == 'store')
                    Memory.spawns[creep.memory.spawn].creeps.stores.push(creep.name);
                else if (creep.memory.role == 'attackerM')
                    Memory.spawns[creep.memory.spawn].creeps.attackersM.push(creep.name);
                else if (creep.memory.role == 'attackerR')
                    Memory.spawns[creep.memory.spawn].creeps.attackersR.push(creep.name);
                else if (creep.memory.role == 'attackerH')
                    Memory.spawns[creep.memory.spawn].creeps.attackersH.push(creep.name);
                else if (creep.memory.role == 'scout')
                    Memory.spawns[creep.memory.spawn].creeps.scouts.push(creep.name);
                else if (creep.memory.role == 'defender')
                    Memory.spawns[creep.memory.spawn].creeps.defenders.push(creep.name);
                else if (creep.memory.role == 'attackerD')
                    Memory.spawns[creep.memory.spawn].creeps.attackersD.push(creep.name);
                else if (creep.memory.role == 'mover')
                    Memory.spawns[creep.memory.spawn].creeps.movers.push(creep.name);
                else if (creep.memory.role == 'user')
                    Memory.spawns[creep.memory.spawn].creeps.users.push(creep.name);
                else if (creep.memory.role == 'terminal')
                    Memory.spawns[creep.memory.spawn].creeps.terminals.push(creep.name);
                else if (creep.memory.role == 'toTerminal')
                    Memory.spawns[creep.memory.spawn].creeps.toTerminals.push(creep.name);
                else if (creep.memory.role == 'toStore')
                    Memory.spawns[creep.memory.spawn].creeps.toStores.push(creep.name);
                else if (creep.memory.role == 'claim')
                    Memory.spawns[creep.memory.spawn].creeps.claims.push(creep.name);
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var setup;
        for (let a = 0; a < Memory.global.roomCount; a++) {
            if (Memory.spawns[a].random.hostiles)
                Memory.spawns[a].summon.users = 2;
            //non Memory var
            if (Memory.spawns[a].counters.roomCounter > 200) {
                if (!setup)
                    setup = require('role.setup');

                setup.run(a);
            }
            else {
                for (let r = 0, lengthR = Memory.spawns[a].random.roomContainers.length; r < lengthR; r++) {
                    let roomCont = Game.getObjectById(Memory.spawns[a].random.roomContainers[r].id);
                    if (roomCont)
                        Memory.spawns[a].random.roomContainers[r] = roomCont;
                }
            }
            if (!Memory.spawns[a].sources.length)
                for (let myRooms = 0, length = Memory.spawns[a].random.rooms.length; myRooms < length; myRooms++) {
                    if (Game.rooms[Memory.spawns[a].random.rooms[myRooms].name]) {
                        roomSources = Game.rooms[Memory.spawns[a].random.rooms[myRooms].name].find(FIND_SOURCES);
                        for (let b = 0, length2 = roomSources.length; b < length2; b++) {
                            Memory.spawns[a].sources.push(roomSources[b].id);
                        }
                        Memory.spawns[a].random.roomContainers = Memory.spawns[a].random.roomContainers.concat(Game.rooms[Memory.spawns[a].random.rooms[myRooms].name].find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER
                                    //&& structure.store.energy > 500
                                    );
                            }
                        }));
                    }
                }

            if (Memory.spawns[a].counters.avgUpgraders > 1000) {
                Memory.spawns[a].counters.avgUpgraders = 0;
                Memory.spawns[a].random.avgUpgraders.push(Memory.spawns[a].creeps.upgraders2.length);
                if (Memory.spawns[a].random.avgUpgraders.length > 20)
                    Memory.spawns[a].random.avgUpgraders.splice(0, 1);

                var sum = 0;
                var count = 0;
                for (var i = 0, ii = Memory.spawns[a].random.avgUpgraders.length; i < ii; ++i) {
                    sum += Memory.spawns[a].random.avgUpgraders[i];
                    ++count;
                }
                Memory.spawns[a].counters.avgUpgradersValue = (sum / count).toFixed(2);
            }

            //var for early game
            if (!Memory.spawns[a].random.useStore) {
                if (!Memory.spawns[a].counters.history)
                    Memory.spawns[a].counters.history = {};
                for (let s = 0, length = Memory.spawns[a].sources.length; s < length; s++) {
                    if (!Memory.spawns[a].counters.history[Memory.spawns[a].sources[s]])
                        Memory.spawns[a].counters.history[Memory.spawns[a].sources[s]] = 0;
                    //Memory[sources[s].id] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    Memory.spawns[a].counters.atSources[Memory.spawns[a].sources[s]] = 0;
                    Memory.spawns[a].counters.avgAtSource[Memory.spawns[a].sources[s]] = Memory.spawns[a].counters.history[Memory.spawns[a].sources[s]];
                }
            }
            //repair
            for (let his in Memory.spawns[a].repairHpHistory) {
                let repObj = Game.getObjectById(his);
                if (repObj && (repObj.hits > Memory.spawns[a].repairHp[his] || !Memory.spawns[a].repairHp[his]))
                    Memory.spawns[a].repairHp[his] = repObj.hits;
            }
            Memory.spawns[a].repairHpHistory = {};

            //if (Memory.spawns[a].counters.creeps < 3)
            //    Game.notify("spawn " + a + " has " + Memory.spawns[a].counters.creeps + " creeps");

            if (Memory.spawns[a].random.useLinks) {
                roleLink.run(a);
            }
        }
    }
};

module.exports = roleCreateJSON;