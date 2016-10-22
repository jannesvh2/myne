var roleLink = require('role.link');

var roleCreateJSON = {

    /** @param {Creep} creep **/
    run: function () {

        //clearing memory of non existing creeps
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                //console.log('Clearing non-existing creep memory:', name);
            }
        }

        //init
        var rooms = 1;
        if (!Memory.spawns)
            Memory.spawns = [];

        for (let a = 0; a < rooms; a++) {
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
            }

            //ticks
            Memory.spawns[a].counters.roomCounter++;
            Memory.spawns[a].counters.upgradeTicks++;
            Memory.spawns[a].counters.avgUpgraders++;
            //Memory.spawns[a].counters.roomTicks++;
            if (Memory.spawns[a].random.storeId && Memory.spawns[a].random.storageReserve > 50000)
                Memory.spawns[a].random.storageReserve = 50000;
            if (Memory.spawns[a].random.storeId && Memory.spawns[a].random.storageReserve < 50000)
                Memory.spawns[a].random.storageReserve += 3;

            //repair reset if its to high
            if (Memory.spawns[a].counters.repairLimit > 15000000)
                Memory.spawns[a].counters.repairLimit = 10000;

            //current creeps
            Memory.spawns[a].creeps.harvesters = [];
            Memory.spawns[a].creeps.harvesters2 = [];
            Memory.spawns[a].creeps.builders = [];
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
            Memory.spawns[a].counters.creeps = 0;
        }
        for (let creep in Game.creeps) {
            Memory.spawns[Game.creeps[creep].memory.spawn].counters.creeps++;

            if (Game.creeps[creep].memory.role == 'harvester')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.harvesters.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'harvester2')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.harvesters2.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'builder')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.builders.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'builder2')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.builders2.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'upgrader')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.upgraders.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'upgrader2')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.upgraders2.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'store')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.stores.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'attackerM')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.attackersM.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'attackerR')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.attackersR.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'attackerH')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.attackersH.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'scout')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.scouts.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'defender')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.defenders.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'attackerD')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.attackersD.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'mover')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.movers.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'user')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.users.push(Game.creeps[creep].name);
            else if (Game.creeps[creep].memory.role == 'terminal')
                Memory.spawns[Game.creeps[creep].memory.spawn].creeps.terminals.push(Game.creeps[creep].name);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (Memory.spawns[0].counters.roomCounter > 30) {
            for (let a = 0; a < rooms; a++) {

                //reset for changes
                Memory.spawns[a].random.rooms = [];
                Memory.spawns[a].spots = [];
                Memory.spawns[a].store = [];
                Memory.spawns[a].links.producers = [];
            }
            //spawn 0
            //spawn numbers
            Memory.spawns[0].summon.spawns = 1;
            Memory.spawns[0].summon.h = 3;
            Memory.spawns[0].summon.b = 2;
            Memory.spawns[0].summon.u = 6;
            Memory.spawns[0].summon.h2 = 0;
            Memory.spawns[0].summon.b2 = 0;
            Memory.spawns[0].summon.u2 = 0;
            Memory.spawns[0].summon.users = 1;
            Memory.spawns[0].summon.atkM = 0;
            Memory.spawns[0].summon.atkR = 0;
            Memory.spawns[0].summon.atkH = 0;
            Memory.spawns[0].summon.atkD = 0;
            Memory.spawns[0].random.mainRoom = 'W4S59';
            //RoomList
            Memory.spawns[0].random.rooms.push('W4S59');
            //if (!Memory.spawns[0].random.hostiles) {
            //    Memory.spawns[0].random.rooms.push('W59S28');
            //    Memory.spawns[0].random.rooms.push('W58S28');
            //}
            //keeper
            //if (!Memory.spawns[0].random.hostiles) {
            //    Memory.spawns[0].spots.push({ sourceRoom: 'W59S28' });
            //    Memory.spawns[0].spots.push({ sourceRoom: 'W58S28' });
            //}
            //StoreId
            //Memory.spawns[0].random.storeId = '57d57cd3636e2e351c38d6fe';
            //UseStore
            Memory.spawns[0].random.useStore = false;
            //Memory.spawns[0].random.useLinks = true;
            //Memory.spawns[0].links.receiver = '57e322a114f3efa6216a00cb';
            //Memory.spawns[0].links.producers.push('57de74825294558044ba36a0');
            //Memory.spawns[0].links.producers.push('57de74c1bd52497b42f0c556');
            //Memory.spawns[0].links.producers.push('57e924dce942a7843ffd2d79');
            //extractor
            //Memory.spawns[0].random.extractor = '579fab82b1f02a3b0cfefd9a';
            //Memory.spawns[0].random.terminal = Game.rooms[Memory.spawns[0].random.mainRoom].terminal;
            //reactions
            //Memory.spawns[0].random.runReaction = false;
            //Memory.spawns[0].random.reactions.push({ id: '', mineral: '' });
            //Memory.spawns[0].random.reactions.push({ id: '', mineral: '' });
            //Memory.spawns[0].random.reactions.push({ id: '', mineral: '' });
            //Memory.spawns[0].random.reactions.push({ id: '', mineral: '' });
            //Memory.spawns[0].random.reactions.push({ id: '', mineral: '' });
            //Memory.spawns[0].random.reactions.push({ id: '', mineral: '' });
            //Memory.spawns[0].random.reactions.push({ id: '', mineral: '' });
            //Memory.spawns[0].random.reactions.push({ id: '', mineral: '' });
            //Memory.spawns[0].random.reactions.push({ id: '', mineral: '' });
            //Memory.spawns[0].random.reactions.push({ id: '', mineral: '' });

            ////spawn 1
            ////spawn numbers
            //Memory.spawns[1].summon.spawns = 2;
            //Memory.spawns[1].summon.h = 0;
            //Memory.spawns[1].summon.b = 0;
            //Memory.spawns[1].summon.u = 0;
            //Memory.spawns[1].summon.h2 = 2;
            //Memory.spawns[1].summon.b2 = 1;
            //Memory.spawns[1].summon.u2 = 0;
            //Memory.spawns[1].summon.users = 1;
            //Memory.spawns[1].summon.atkM = 0;
            //Memory.spawns[1].summon.atkR = 0;
            //Memory.spawns[1].summon.atkH = 0;
            //Memory.spawns[1].summon.atkD = 0;
            //Memory.spawns[1].random.mainRoom = 'W56S28';
            ////RoomList
            //Memory.spawns[1].random.rooms.push('W56S28');
            //if (!Memory.spawns[1].random.hostiles) {
            //    Memory.spawns[1].random.rooms.push('W57S28');
            //    Memory.spawns[1].random.rooms.push('W57S27');
            //}
            ////keeper

            //if (!Memory.spawns[1].random.hostiles) {
            //    Memory.spawns[1].spots.push({ sourceRoom: 'W57S28' });
            //    Memory.spawns[1].spots.push({ sourceRoom: 'W57S27' });
            //}
            ////StoreId
            //Memory.spawns[1].random.storeId = '57db65810f3c649e5b7c3d2d';
            ////UseStore
            //Memory.spawns[1].random.useStore = true;
            //Memory.spawns[1].random.useLinks = true;
            //Memory.spawns[1].links.receiver = '57e3245703f840bf21b3f3be';
            //Memory.spawns[1].links.producers.push('57e30c3af21eff60481d0e0e');
            //Memory.spawns[1].links.producers.push('57e30bbd5f4eb75927267bba');
            //Memory.spawns[1].links.producers.push('57efa5bc2186ab5c7433626e');
            ////extractor
            //Memory.spawns[1].random.extractor = '579fab83b1f02a3b0cfefec2';
            //Memory.spawns[1].random.terminal = Game.rooms[Memory.spawns[1].random.mainRoom].terminal;

            ////spawn 2
            ////spawn numbers
            //Memory.spawns[2].summon.spawns = 2;
            //Memory.spawns[2].summon.h = 0;
            //Memory.spawns[2].summon.b = 0;
            //Memory.spawns[2].summon.u = 0;
            //Memory.spawns[2].summon.h2 = 3;
            //Memory.spawns[2].summon.b2 = 1;
            //Memory.spawns[2].summon.u2 = 0;
            //Memory.spawns[2].summon.users = 2;
            //Memory.spawns[2].summon.atkM = 0;
            //Memory.spawns[2].summon.atkR = 0;
            //Memory.spawns[2].summon.atkH = 0;
            //Memory.spawns[2].summon.atkD = 0;
            //Memory.spawns[2].random.mainRoom = 'W54S28';
            ////RoomList
            //Memory.spawns[2].random.rooms.push('W54S28');
            //if (!Memory.spawns[2].random.hostiles) {
            //    //Memory.spawns[2].random.rooms.push('W54S27');
            //    Memory.spawns[2].random.rooms.push('W55S28');
            //    Memory.spawns[2].random.rooms.push('W55S29');
            //}
            ////keeper
            //if (!Memory.spawns[2].random.hostiles) {
            //    //Memory.spawns[2].spots.push({ sourceRoom: 'W54S27' });
            //    Memory.spawns[2].spots.push({ sourceRoom: 'W55S28' });
            //    Memory.spawns[2].spots.push({ sourceRoom: 'W55S29' });
            //}
            ////StoreId
            //Memory.spawns[2].random.storeId = '57e4459d7780877962a33b50';
            ////UseStore
            //Memory.spawns[2].random.useStore = true;
            //Memory.spawns[2].random.useLinks = true;
            //Memory.spawns[2].links.receiver = '57ea5527d8ef7fdc5e44ee89';
            //Memory.spawns[2].links.producers.push('57e965880af20184158222d9');
            //Memory.spawns[2].links.producers.push('57e993bc8a14ba8f0a2c9a7e');
            //Memory.spawns[2].links.producers.push('57f2111065bb960f2067a1f0');
            ////extractor
            //Memory.spawns[2].random.extractor = '579fab83b1f02a3b0cfeff52';
            //Memory.spawns[2].random.terminal = Game.rooms[Memory.spawns[2].random.mainRoom].terminal;

            ////spawn 3
            ////spawn numbers
            //Memory.spawns[3].summon.spawns = 2;
            //Memory.spawns[3].summon.h = 0;
            //Memory.spawns[3].summon.b = 0;
            //Memory.spawns[3].summon.u = 0;
            //Memory.spawns[3].summon.h2 = 1;
            //Memory.spawns[3].summon.b2 = 1;
            //Memory.spawns[3].summon.u2 = 0;
            //Memory.spawns[3].summon.users = 1;
            //Memory.spawns[3].summon.atkM = 0;
            //Memory.spawns[3].summon.atkR = 0;
            //Memory.spawns[3].summon.atkH = 0;
            //Memory.spawns[3].summon.atkD = 0;
            //Memory.spawns[3].random.mainRoom = 'W52S29';
            ////RoomList
            //Memory.spawns[3].random.rooms.push('W52S29');
            //if (!Memory.spawns[3].random.hostiles) {
            //    Memory.spawns[3].random.rooms.push('W51S29');
            //    //Memory.spawns[3].random.rooms.push('W55S28');
            //    //Memory.spawns[3].random.rooms.push('W55S29');
            //}
            ////keeper
            //if (!Memory.spawns[3].random.hostiles) {
            //    Memory.spawns[3].spots.push({ sourceRoom: 'W51S29' });
            //    //Memory.spawns[3].spots.push({ sourceRoom: 'W55S28' });
            //    //Memory.spawns[3].spots.push({ sourceRoom: 'W55S29' });
            //}
            ////StoreId
            //Memory.spawns[3].random.storeId = '57ee3f378766a05b621a6eef';
            ////UseStore
            //Memory.spawns[3].random.useStore = true;
            //Memory.spawns[3].random.useLinks = true;
            //Memory.spawns[3].links.receiver = '57ef75858a3103c00ed026d5';
            //Memory.spawns[3].links.producers.push('57ef7a913ff080a65447f8e6');
            //Memory.spawns[3].links.producers.push('57f34dacf228c057483e1267');
            //Memory.spawns[3].links.producers.push('57fde7481bf98f633171f163');
            ////extractor
            //Memory.spawns[3].random.extractor = '579fab83b1f02a3b0cff0022';
            //Memory.spawns[3].random.terminal = Game.rooms[Memory.spawns[3].random.mainRoom].terminal;

            ////spawn 4
            ////spawn numbers
            //Memory.spawns[4].summon.spawns = 2;
            //Memory.spawns[4].summon.h = 0;
            //Memory.spawns[4].summon.b = 0;
            //Memory.spawns[4].summon.u = 0;
            //Memory.spawns[4].summon.h2 = 1;
            //Memory.spawns[4].summon.b2 = 1;
            //Memory.spawns[4].summon.u2 = 0;
            //Memory.spawns[4].summon.users = 2;
            //Memory.spawns[4].summon.atkM = 0;
            //Memory.spawns[4].summon.atkR = 0;
            //Memory.spawns[4].summon.atkH = 0;
            //Memory.spawns[4].summon.atkD = 0;
            //Memory.spawns[4].random.mainRoom = 'W52S28';
            ////RoomList
            //Memory.spawns[4].random.rooms.push('W52S28');
            //if (!Memory.spawns[4].random.hostiles) {
            //    Memory.spawns[4].random.rooms.push('W53S28');
            //    //Memory.spawns[4].random.rooms.push('W55S28');
            //    //Memory.spawns[4].random.rooms.push('W55S29');
            //}
            ////keeper
            //if (!Memory.spawns[4].random.hostiles) {
            //    Memory.spawns[4].spots.push({ sourceRoom: 'W53S28' });
            //    //Memory.spawns[4].spots.push({ sourceRoom: 'W55S28' });
            //    //Memory.spawns[4].spots.push({ sourceRoom: 'W55S29' });
            //}
            ////StoreId
            //Memory.spawns[4].random.storeId = '57f80ff72ba1961556ed528e';
            ////UseStore
            //Memory.spawns[4].random.useStore = true;
            //Memory.spawns[4].random.useLinks = true;
            //Memory.spawns[4].links.receiver = '57f951a2aebee5d628780ab3';
            //Memory.spawns[4].links.producers.push('57f95a1f2ddfe86c1cb943ec');
            //Memory.spawns[4].links.producers.push('57fd37c191eec5560c03f58d');
            //Memory.spawns[4].links.producers.push('580a46ccd582126d07b3e4b3');
            ////extractor
            //Memory.spawns[4].random.extractor = '579fab83b1f02a3b0cff0021';
            //Memory.spawns[4].random.terminal = Game.rooms[Memory.spawns[4].random.mainRoom].terminal;

            ////spawn 4
            ////spawn numbers
            //Memory.spawns[5].summon.spawns = 1;
            //Memory.spawns[5].summon.h = 0;
            //Memory.spawns[5].summon.b = 0;
            //Memory.spawns[5].summon.u = 0;
            //Memory.spawns[5].summon.h2 = 3;
            //Memory.spawns[5].summon.b2 = 1;
            //Memory.spawns[5].summon.u2 = 0;
            //Memory.spawns[5].summon.users = 1;
            //Memory.spawns[5].summon.atkM = 0;
            //Memory.spawns[5].summon.atkR = 0;
            //Memory.spawns[5].summon.atkH = 0;
            //Memory.spawns[5].summon.atkD = 0;
            //Memory.spawns[5].random.mainRoom = 'W59S26';
            ////RoomList
            //Memory.spawns[5].random.rooms.push('W59S26');
            //if (!Memory.spawns[5].random.hostiles) {
            //    Memory.spawns[5].random.rooms.push('W58S26');
            //    //Memory.spawns[5].random.rooms.push('W55S28');
            //    //Memory.spawns[5].random.rooms.push('W55S29');
            //}
            ////keeper
            //if (!Memory.spawns[5].random.hostiles) {
            //    Memory.spawns[5].spots.push({ sourceRoom: 'W58S26' });
            //    //Memory.spawns[5].spots.push({ sourceRoom: 'W55S28' });
            //    //Memory.spawns[5].spots.push({ sourceRoom: 'W55S29' });
            //}
            ////StoreId
            //Memory.spawns[5].random.storeId = '5804f776b29031841fbdac74';
            ////UseStore
            //Memory.spawns[5].random.useStore = true;
            //Memory.spawns[5].random.useLinks = true;
            //Memory.spawns[5].links.receiver = '5806537fb8670d9b68f12fcc';
            //Memory.spawns[5].links.producers.push('580655e32ad8ade5597aee6e');
            ////Memory.spawns[5].links.producers.push('57fd37c191eec5560c03f58d');
            ////extractor
            ////Memory.spawns[5].random.extractor = '579fab83b1f02a3b0cff0021';
            ////Memory.spawns[5].random.terminal = Game.rooms[Memory.spawns[5].random.mainRoom].terminal;
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        for (let a = 0; a < rooms; a++) {
            if (Memory.spawns[a].random.hostiles)
                Memory.spawns[a].summon.users++;
            //non Memory var
            if (Memory.spawns[a].counters.roomCounter > 30) {
                Memory.spawns[a].counters.roomCounter = 0;
                Memory.spawns[a].sources = [];

                var roomSources = [];
                Memory.spawns[a].random.roomContainers = [];

                //add memory for all sources and containers
                for (let myRooms = 0, length = Memory.spawns[a].random.rooms.length; myRooms < length; myRooms++) {
                    if (Game.rooms[Memory.spawns[a].random.rooms[myRooms]]) {
                        roomSources = Game.rooms[Memory.spawns[a].random.rooms[myRooms]].find(FIND_SOURCES);
                        for (let b = 0, length2 = roomSources.length; b < length2; b++) {
                            Memory.spawns[a].sources.push(roomSources[b]);
                        }
                        Memory.spawns[a].random.roomContainers = Memory.spawns[a].random.roomContainers.concat(Game.rooms[Memory.spawns[a].random.rooms[myRooms]].find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER
                                    //&& structure.store.energy > 500
                                    );
                            }
                        }))
                    }
                }
            }
            if (!Memory.spawns[a].sources.length)
                for (let myRooms = 0, length = Memory.spawns[a].random.rooms.length; myRooms < length; myRooms++) {
                    if (Game.rooms[Memory.spawns[a].random.rooms[myRooms]]) {
                        roomSources = Game.rooms[Memory.spawns[a].random.rooms[myRooms]].find(FIND_SOURCES);
                        for (let b = 0, length2 = roomSources.length; b < length2; b++) {
                            Memory.spawns[a].sources.push(roomSources[b]);
                        }
                        Memory.spawns[a].random.roomContainers = Memory.spawns[a].random.roomContainers.concat(Game.rooms[Memory.spawns[a].random.rooms[myRooms]].find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER
                                    //&& structure.store.energy > 500
                                    );
                            }
                        }))
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

            //remove containers with a creep on the way
            var creeps = Memory.spawns[a].creeps.harvesters2.concat(Memory.spawns[a].creeps.builders2);
            var counter = 0;
            for (let b = 0, length = Memory.spawns[a].random.roomContainers.length; b < length; b++) {
                Memory.spawns[a].store.push(Memory.spawns[a].random.roomContainers[b]);
                for (let c = 0, length2 = creeps.length; c < length2; c++) {
                    if (Game.creeps[creeps[c]].memory.sourceId && Game.creeps[creeps[c]].memory.sourceId == Memory.spawns[a].store[b - counter].id) {
                        Memory.spawns[a].store.splice(b - counter, 1);
                        counter++;
                        break;
                    }

                }

            }
            Memory.spawns[a].store.sort(function (a, b) {
                return b.store.energy - a.store.energy;
            });

            //var for early game
            if (!Memory.spawns[a].random.useStore) {
                if (!Memory.spawns[a].counters.history)
                    Memory.spawns[a].counters.history = {};
                for (let s = 0, length = Memory.spawns[a].sources.length; s < length; s++) {
                    if (!Memory.spawns[a].counters.history[Memory.spawns[a].sources[s].id])
                        Memory.spawns[a].counters.history[Memory.spawns[a].sources[s].id] = 0;
                    //Memory[sources[s].id] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    Memory.spawns[a].counters.atSources[Memory.spawns[a].sources[s].id] = 0;
                    Memory.spawns[a].counters.avgAtSource[Memory.spawns[a].sources[s].id] = Memory.spawns[a].counters.history[Memory.spawns[a].sources[s].id];
                }
            }
            //repair
            for (let his in Memory.spawns[a].repairHpHistory) {
                let repObj = Game.getObjectById(his);
                if (repObj && (repObj.hits > Memory.spawns[a].repairHp[his] || !Memory.spawns[a].repairHp[his]))
                    Memory.spawns[a].repairHp[his] = repObj.hits;
            }
            Memory.spawns[a].repairHpHistory = {};

            if (Memory.spawns[a].counters.creeps < 6)
                Game.notify("spawn " + a + " has " + Memory.spawns[a].counters.creeps + " creeps");

            if (Memory.spawns[a].random.useLinks) {
                roleLink.run(a);
            }
        }
    }
};

module.exports = roleCreateJSON;