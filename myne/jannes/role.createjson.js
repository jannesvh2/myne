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
        Memory.global.roomCount = 13;
        if (!Memory.spawns)
            Memory.spawns = [];


        //Memory.global.power = [];
        //Memory.global.power.push({ room: 'W0S59', spawn: 0 });
        //Memory.global.power.push({ room: 'W0S60', spawn: 0 });
        //Memory.global.power.push({ room: 'W1S60', spawn: 0 });
        //Memory.global.power.push({ room: 'W2S60', spawn: 0 });
        //Memory.global.power.push({ room: 'W3S60', spawn: 0 });
        //Memory.global.power.push({ room: 'W4S60', spawn: 0 });
        //Memory.global.power.push({ room: 'W5S60', spawn: 0 });
        //Memory.global.power.push({ room: 'W6S60', spawn: 0 });
        //Memory.global.power.push({ room: 'W7S60', spawn: 1 });
        //Memory.global.power.push({ room: 'W8S60', spawn: 1 });
        //Memory.global.power.push({ room: 'W9S60', spawn: 1 });
        //Memory.global.power.push({ room: 'W10S60', spawn: 1 });
        //Memory.global.power.push({ room: 'W10S59', spawn: 1 });
        //Memory.global.power.push({ room: 'W10S58', spawn: 1 });
        //Memory.global.power.push({ room: 'W10S57', spawn: 1 });
        //Memory.global.power.push({ room: 'W10S56', spawn: 1 });
        //Memory.global.power.push({ room: 'W10S55', spawn: 2 });
        //Memory.global.power.push({ room: 'W10S54', spawn: 2 });
        //Memory.global.power.push({ room: 'W10S53', spawn: 2 });
        //Memory.global.power.push({ room: 'W10S52', spawn: 2 });
        //Memory.global.power.push({ room: 'W10S51', spawn: 2 });
        //Memory.global.power.push({ room: 'W10S50', spawn: 2 });
        //Memory.global.power.push({ room: 'W9S50', spawn: 2 });
        //Memory.global.power.push({ room: 'W8S50', spawn: 2 });
        //Memory.global.power.push({ room: 'W7S50', spawn: 2 });
        //Memory.global.power.push({ room: 'W6S50', spawn: 5 });
        //Memory.global.power.push({ room: 'W5S50', spawn: 5 });
        //Memory.global.power.push({ room: 'W4S50', spawn: 5 });
        //Memory.global.power.push({ room: 'W3S50', spawn: 5 });

        var gMod = Game.time % 300;
        if (gMod < 30)
            for (let p = 0, lengthP = Memory.global.power.length; p < lengthP; p++) {
                if (gMod == p) {
                    Game.getObjectById(Memory.spawns[Memory.global.power[p].spawn].random.observer).observeRoom(Memory.global.power[p].room);
                }
                else if (gMod == (p + 1) && !Memory.spawns[Memory.global.power[p].spawn].power.hasPower && Game.rooms[Memory.global.power[p].room]) {
                    var powerFound = Game.rooms[Memory.global.power[p].room].find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_POWER_BANK)
                        }
                    });
                    if (powerFound.length) {
                        if (!Memory.spawns[Memory.global.power[p].spawn].power.hasPower) {
                            Memory.spawns[Memory.global.power[p].spawn].power.hasPower = true;
                            Memory.spawns[Memory.global.power[p].spawn].power.spawnedLast = false;
                            Memory.spawns[Memory.global.power[p].spawn].power.room = Memory.global.power[p].room;
                            Memory.spawns[Memory.global.power[p].spawn].power.spawn = 0;
                            Memory.spawns[Memory.global.power[p].spawn].power.spawned = 0;
                        }
                    }
                }
            }

        for (let a = 0; a < Memory.global.roomCount; a++) {
            if (!Memory.spawns[a]) {
                Memory.spawns.push(new Object());

                Memory.spawns[a].summon = {};
                Memory.spawns[a].random = {};
                Memory.spawns[a].random.defenders = [];
                Memory.spawns[a].creeps = {};
                Memory.spawns[a].power = {};
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
                if (!creep.memory.spawn) {
                    Game.notify(creep);
                    creep.suicide();
                    continue;
                }

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

        //moria code for placing ramparts
        if (Game.time % 9999 == 0) {
            _.map(_.filter(Game.structures, s=>s.structureType == STRUCTURE_TERMINAL), t=>t.room.createConstructionSite(t.pos, STRUCTURE_RAMPART))
            _.map(_.filter(Game.structures, s=>s.structureType == STRUCTURE_SPAWN), t=>t.room.createConstructionSite(t.pos, STRUCTURE_RAMPART))
            _.map(_.filter(Game.structures, s=>s.structureType == STRUCTURE_STORAGE), t=>t.room.createConstructionSite(t.pos, STRUCTURE_RAMPART))
            _.map(_.filter(Game.structures, s=>s.structureType == STRUCTURE_TOWER), t=>t.room.createConstructionSite(t.pos, STRUCTURE_RAMPART))
            _.map(_.filter(Game.structures, s=>s.structureType == STRUCTURE_NUKER), t=>t.room.createConstructionSite(t.pos, STRUCTURE_RAMPART))
        }


    }
};

module.exports = roleCreateJSON;