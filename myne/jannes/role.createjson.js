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
        Memory.global.roomCount = 7;
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
            if (Memory.spawns[a].counters.repairLimit > 15000000)
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
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (Memory.global.isNew) {
            Memory.global.isNew = false;
            for (let a = 0; a < Memory.global.roomCount; a++) {

                //reset for changes
                Memory.spawns[a].random.rooms = [];
                Memory.spawns[a].spots = [];
                Memory.spawns[a].links.producers = [];
                Memory.spawns[a].random.upgradeSpots = [];
            }
            //spawn 0
            //spawn numbers
            Memory.spawns[0].summon.spawns = 1;
            Memory.spawns[0].summon.h = 0;
            Memory.spawns[0].summon.b = 0;
            Memory.spawns[0].summon.u = 0;
            Memory.spawns[0].summon.h2 = 4;
            Memory.spawns[0].summon.b2 = 1;
            Memory.spawns[0].summon.u2 = 0;
            Memory.spawns[0].summon.users = 1;
            Memory.spawns[0].summon.atkM = 0;
            Memory.spawns[0].summon.atkR = 0;
            Memory.spawns[0].summon.atkH = 0;
            Memory.spawns[0].summon.atkD = 0;
            Memory.spawns[0].random.mainRoom = 'W4S59';

            Memory.spawns[0].random.useUpgradeSpots = true;
            Memory.spawns[0].random.upgradeSpots.push({ x: 13, y: 28 });
            Memory.spawns[0].random.upgradeSpots.push({ x: 12, y: 28 });
            Memory.spawns[0].random.upgradeSpots.push({ x: 11, y: 28 });
            Memory.spawns[0].random.upgradeSpots.push({ x: 10, y: 28 });
            //RoomList
            Memory.spawns[0].random.rooms.push({ name: 'W4S59', spawn: 0 });
            if (!Memory.spawns[0].random.hostiles) {
                Memory.spawns[0].random.rooms.push({ name: 'W3S59', spawn: 2 });
                Memory.spawns[0].random.rooms.push({ name: 'W5S59', spawn: 2 });
            }
            //keeper
            if (!Memory.spawns[0].random.hostiles) {
                Memory.spawns[0].spots.push({ sourceRoom: 'W3S59' });
                Memory.spawns[0].spots.push({ sourceRoom: 'W5S59' });
            }
            //StoreId
            Memory.spawns[0].random.storeId = '580ee259347303ff06fb0a94';
            //UseStore
            Memory.spawns[0].random.useStore = true;
            Memory.spawns[0].random.useLinks = true;
            Memory.spawns[0].links.receiver = '58107c1849b1120b2abb08ea';
            Memory.spawns[0].links.producers.push('58107e321ac8625d740861f6');
            Memory.spawns[0].links.producers.push('58151e89508d83ca5b57ba9a');
            //Memory.spawns[0].links.producers.push('57e924dce942a7843ffd2d79');
            //extractor
            Memory.spawns[0].random.extractor = '579fab88b1f02a3b0cff0343';
            Memory.spawns[0].random.terminal = '581790d7ef165c5f66b0de2b';
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

            //spawn 1
            //spawn numbers
            Memory.spawns[1].summon.spawns = 1;
            Memory.spawns[1].summon.h = 0;
            Memory.spawns[1].summon.b = 0;
            Memory.spawns[1].summon.u = 0;
            Memory.spawns[1].summon.h2 = 5;
            Memory.spawns[1].summon.b2 = 1;
            Memory.spawns[1].summon.u2 = 0;
            Memory.spawns[1].summon.users = 1;
            Memory.spawns[1].summon.atkM = 0;
            Memory.spawns[1].summon.atkR = 0;
            Memory.spawns[1].summon.atkH = 0;
            Memory.spawns[1].summon.atkD = 0;
            Memory.spawns[1].random.mainRoom = 'W9S59';

            Memory.spawns[1].random.useUpgradeSpots = true;
            Memory.spawns[1].random.upgradeSpots.push({ x: 43, y: 23 });
            Memory.spawns[1].random.upgradeSpots.push({ x: 42, y: 23 });
            Memory.spawns[1].random.upgradeSpots.push({ x: 41, y: 23 });
            Memory.spawns[1].random.upgradeSpots.push({ x: 40, y: 23 });
            //RoomList
            Memory.spawns[1].random.rooms.push({ name: 'W9S59', spawn: 0 });
            if (!Memory.spawns[1].random.hostiles) {
                Memory.spawns[1].random.rooms.push({ name: 'W9S58', spawn: 3 });
                Memory.spawns[1].random.rooms.push({ name: 'W8S59', spawn: 2 });
            }
            //keeper
            if (!Memory.spawns[1].random.hostiles) {
                Memory.spawns[1].spots.push({ sourceRoom: 'W9S58' });
                Memory.spawns[1].spots.push({ sourceRoom: 'W8S59' });
            }
            //StoreId
            Memory.spawns[1].random.storeId = '5813475220b8df6276431276';
            //UseStore
            Memory.spawns[1].random.useStore = true;
            Memory.spawns[1].random.useLinks = true;
            Memory.spawns[1].links.receiver = '5815a1317c06f6d64c8fb4fd';
            Memory.spawns[1].links.producers.push('5815a0cbe8610d796bab068c');
            Memory.spawns[1].links.producers.push('58192e2de9f1f76e74e3292e');
            //Memory.spawns[1].links.producers.push('57e924dce942a7843ffd2d79');
            //extractor
            Memory.spawns[1].random.extractor = '579fab87b1f02a3b0cff02fb';
            Memory.spawns[1].random.terminal = '581a76d942f613dc4a3544a6';

            //spawn 2
            //spawn numbers
            Memory.spawns[2].summon.spawns = 1;
            Memory.spawns[2].summon.h = 0;
            Memory.spawns[2].summon.b = 0;
            Memory.spawns[2].summon.u = 0;
            Memory.spawns[2].summon.h2 = 6;
            Memory.spawns[2].summon.b2 = 1;
            Memory.spawns[2].summon.u2 = 0;
            Memory.spawns[2].summon.users = 1;
            Memory.spawns[2].summon.atkM = 0;
            Memory.spawns[2].summon.atkR = 0;
            Memory.spawns[2].summon.atkH = 0;
            Memory.spawns[2].summon.atkD = 0;
            Memory.spawns[2].random.mainRoom = 'W9S52';

            Memory.spawns[2].random.useUpgradeSpots = true;
            Memory.spawns[2].random.upgradeSpots.push({ x: 33, y: 29 });
            Memory.spawns[2].random.upgradeSpots.push({ x: 32, y: 29 });
            Memory.spawns[2].random.upgradeSpots.push({ x: 31, y: 29 });
            Memory.spawns[2].random.upgradeSpots.push({ x: 30, y: 29 });

            //RoomList
            Memory.spawns[2].random.rooms.push({ name: 'W9S52', spawn: 0 });
            if (!Memory.spawns[2].random.hostiles) {
                Memory.spawns[2].random.rooms.push({ name: 'W9S51', spawn: 3 });
                Memory.spawns[2].random.rooms.push({ name: 'W9S53', spawn: 3 });
            }
            //keeper
            if (!Memory.spawns[2].random.hostiles) {
                Memory.spawns[2].spots.push({ sourceRoom: 'W9S51' });
                Memory.spawns[2].spots.push({ sourceRoom: 'W9S53' });
            }
            //StoreId
            Memory.spawns[2].random.storeId = '5816a280256d601350f16cf0';
            //UseStore
            Memory.spawns[2].random.useStore = true;
            Memory.spawns[2].random.useLinks = true;
            Memory.spawns[2].links.receiver = '58188d71ef9d4bed36853b9e';
            Memory.spawns[2].links.producers.push('5818d44598bdae001bc6118d');
            Memory.spawns[2].links.producers.push('581c65d61b577cff47ce83ca');
            //Memory.spawns[2].links.producers.push('57e924dce942a7843ffd2d79');
            //extractor
            //Memory.spawns[2].random.extractor = '579fab82b1f02a3b0cfefd9a';
            //Memory.spawns[2].random.terminal = Game.rooms[Memory.spawns[2].random.mainRoom].terminal;

            //spawn 3
            //spawn numbers
            Memory.spawns[3].summon.spawns = 1;
            Memory.spawns[3].summon.h = 0;
            Memory.spawns[3].summon.b = 0;
            Memory.spawns[3].summon.u = 0;
            Memory.spawns[3].summon.h2 = 7;
            Memory.spawns[3].summon.b2 = 1;
            Memory.spawns[3].summon.u2 = 0;
            Memory.spawns[3].summon.users = 1;
            Memory.spawns[3].summon.atkM = 0;
            Memory.spawns[3].summon.atkR = 0;
            Memory.spawns[3].summon.atkH = 0;
            Memory.spawns[3].summon.atkD = 0;
            Memory.spawns[3].random.mainRoom = 'W7S53';

            //Memory.spawns[3].random.useUpgradeSpots = true;
            //Memory.spawns[3].random.upgradeSpots.push({ x: 13, y: 28 });
            //Memory.spawns[3].random.upgradeSpots.push({ x: 12, y: 28 });
            //Memory.spawns[3].random.upgradeSpots.push({ x: 11, y: 28 });
            //Memory.spawns[3].random.upgradeSpots.push({ x: 10, y: 28 });
            //RoomList
            Memory.spawns[3].random.rooms.push({ name: 'W7S53', spawn: 1 });
            if (!Memory.spawns[3].random.hostiles) {
                Memory.spawns[3].random.rooms.push({ name: 'W8S53', spawn: 3 });
                Memory.spawns[3].random.rooms.push({ name: 'W7S54', spawn: 3 });
            }
            //keeper
            if (!Memory.spawns[3].random.hostiles) {
                Memory.spawns[3].spots.push({ sourceRoom: 'W8S53' });
                Memory.spawns[3].spots.push({ sourceRoom: 'W7S54' });
            }
            //StoreId
            Memory.spawns[3].random.storeId = '5816b1a9ee81468a1507b67c';
            //UseStore
            Memory.spawns[3].random.useStore = true;
            Memory.spawns[3].random.useLinks = true;
            Memory.spawns[3].links.receiver = '5818d9ebb033e5a20dc5b4fe';
            Memory.spawns[3].links.producers.push('5818d98cd1c6336f788895a0');
            //Memory.spawns[3].links.producers.push('57de74c1bd52497b42f0c556');
            //Memory.spawns[3].links.producers.push('57e924dce942a7843ffd2d79');
            //extractor
            //Memory.spawns[3].random.extractor = '579fab82b1f02a3b0cfefd9a';
            //Memory.spawns[3].random.terminal = Game.rooms[Memory.spawns[3].random.mainRoom].terminal;

            //spawn 4
            //spawn numbers
            Memory.spawns[4].summon.spawns = 1;
            Memory.spawns[4].summon.h = 0;
            Memory.spawns[4].summon.b = 0;
            Memory.spawns[4].summon.u = 0;
            Memory.spawns[4].summon.h2 = 6;
            Memory.spawns[4].summon.b2 = 1;
            Memory.spawns[4].summon.u2 = 0;
            Memory.spawns[4].summon.users = 1;
            Memory.spawns[4].summon.atkM = 0;
            Memory.spawns[4].summon.atkR = 0;
            Memory.spawns[4].summon.atkH = 0;
            Memory.spawns[4].summon.atkD = 0;
            Memory.spawns[4].random.mainRoom = 'W8S56';

            Memory.spawns[4].random.useUpgradeSpots = true;
            Memory.spawns[4].random.upgradeSpots.push({ x: 34, y: 20 });
            Memory.spawns[4].random.upgradeSpots.push({ x: 34, y: 21 });
            Memory.spawns[4].random.upgradeSpots.push({ x: 34, y: 22 });
            Memory.spawns[4].random.upgradeSpots.push({ x: 34, y: 23 });

            ////RoomList
            Memory.spawns[4].random.rooms.push({ name: 'W8S56', spawn: 1 });
            if (!Memory.spawns[4].random.hostiles) {
                Memory.spawns[4].random.rooms.push({ name: 'W8S57', spawn: 3 });
                Memory.spawns[4].random.rooms.push({ name: 'W7S56', spawn: 2 });
            }
            ////keeper
            if (!Memory.spawns[4].random.hostiles) {
                Memory.spawns[4].spots.push({ sourceRoom: 'W8S57' });
                Memory.spawns[4].spots.push({ sourceRoom: 'W7S56' });
            }
            //StoreId
            Memory.spawns[4].random.storeId = '5819ba83b0033eb058e0d032';
            //UseStore
            Memory.spawns[4].random.useStore = true;
            Memory.spawns[4].random.useLinks = true;
            Memory.spawns[4].links.receiver = '581b9a4cdc867c402c841458';
            Memory.spawns[4].links.producers.push('5819a70eed4bc0052bfbc2fe');
            //Memory.spawns[4].links.producers.push('57de74c1bd52497b42f0c556');
            //Memory.spawns[4].links.producers.push('57e924dce942a7843ffd2d79');
            //extractor
            //Memory.spawns[4].random.extractor = '579fab82b1f02a3b0cfefd9a';
            //Memory.spawns[4].random.terminal = Game.rooms[Memory.spawns[4].random.mainRoom].terminal;

            //spawn 5
            //spawn numbers
            Memory.spawns[5].summon.spawns = 1;
            Memory.spawns[5].summon.h = 0;
            Memory.spawns[5].summon.b = 0;
            Memory.spawns[5].summon.u = 0;
            Memory.spawns[5].summon.h2 = 5;
            Memory.spawns[5].summon.b2 = 1;
            Memory.spawns[5].summon.u2 = 0;
            Memory.spawns[5].summon.users = 1;
            Memory.spawns[5].summon.atkM = 0;
            Memory.spawns[5].summon.atkR = 0;
            Memory.spawns[5].summon.atkH = 0;
            Memory.spawns[5].summon.atkD = 0;
            Memory.spawns[5].random.mainRoom = 'W6S51';

            Memory.spawns[5].random.useUpgradeSpots = true;
            Memory.spawns[5].random.upgradeSpots.push({ x: 38, y: 34 });
            Memory.spawns[5].random.upgradeSpots.push({ x: 37, y: 34 });
            Memory.spawns[5].random.upgradeSpots.push({ x: 36, y: 34 });
            Memory.spawns[5].random.upgradeSpots.push({ x: 35, y: 34 });

            ////RoomList
            Memory.spawns[5].random.rooms.push({ name: 'W6S51', spawn: 2 });
            if (!Memory.spawns[5].random.hostiles) {
                Memory.spawns[5].random.rooms.push({ name: 'W5S51', spawn: 3 });
            //    //Memory.spawns[5].random.rooms.push({ name: 'W7S56', spawn: 3 });
            }
            //keeper
            if (!Memory.spawns[5].random.hostiles) {
                Memory.spawns[5].spots.push({ sourceRoom: 'W5S51' });
            //    Memory.spawns[5].spots.push({ sourceRoom: 'W7S56' });
            }
            //StoreId
            Memory.spawns[5].random.storeId = '581b6cf4cc8f911d697145a3';
            //UseStore
            Memory.spawns[5].random.useStore = true;
            Memory.spawns[5].random.useLinks = true;
            Memory.spawns[5].links.receiver = '581cdd6eb18e2ea86a0397dc';
            Memory.spawns[5].links.producers.push('581ce19484f6ed0671281c7f');
            //Memory.spawns[5].links.producers.push('57de74c1bd52497b42f0c556');
            //Memory.spawns[5].links.producers.push('57e924dce942a7843ffd2d79');
            //extractor
            //Memory.spawns[5].random.extractor = '579fab82b1f02a3b0cfefd9a';
            //Memory.spawns[5].random.terminal = Game.rooms[Memory.spawns[5].random.mainRoom].terminal;

            //spawn 6
            //spawn numbers
            Memory.spawns[6].summon.spawns = 1;
            Memory.spawns[6].summon.h = 3;
            Memory.spawns[6].summon.b = 2;
            Memory.spawns[6].summon.u = 8;
            Memory.spawns[6].summon.h2 = 0;
            Memory.spawns[6].summon.b2 = 0;
            Memory.spawns[6].summon.u2 = 0;
            Memory.spawns[6].summon.users = 1;
            Memory.spawns[6].summon.atkM = 0;
            Memory.spawns[6].summon.atkR = 0;
            Memory.spawns[6].summon.atkH = 0;
            Memory.spawns[6].summon.atkD = 0;
            Memory.spawns[6].random.mainRoom = 'W5S53';

            //Memory.spawns[6].random.useUpgradeSpots = true;
            //Memory.spawns[6].random.upgradeSpots.push({ x: 38, y: 34 });
            //Memory.spawns[6].random.upgradeSpots.push({ x: 37, y: 34 });
            //Memory.spawns[6].random.upgradeSpots.push({ x: 36, y: 34 });
            //Memory.spawns[6].random.upgradeSpots.push({ x: 35, y: 34 });

            ////RoomList
            Memory.spawns[6].random.rooms.push({ name: 'W5S53', spawn: 2 });
            //if (!Memory.spawns[6].random.hostiles) {
            //    Memory.spawns[6].random.rooms.push({ name: 'W5S51', spawn: 3 });
            //    //    Memory.spawns[6].random.rooms.push({ name: 'W7S56', spawn: 3 });
            //}
            ////keeper
            //if (!Memory.spawns[6].random.hostiles) {
            //    Memory.spawns[6].spots.push({ sourceRoom: 'W5S51' });
            //    //    Memory.spawns[6].spots.push({ sourceRoom: 'W7S56' });
            //}
            //StoreId
            //Memory.spawns[6].random.storeId = '581b6cf4cc8f911d697145a3';
            //UseStore
            Memory.spawns[6].random.useStore = false;
            //Memory.spawns[6].random.useLinks = true;
            //Memory.spawns[6].links.receiver = '57e322a114f3efa6216a00cb';
            //Memory.spawns[6].links.producers.push('57de74825294558044ba36a0');
            //Memory.spawns[6].links.producers.push('57de74c1bd52497b42f0c556');
            //Memory.spawns[6].links.producers.push('57e924dce942a7843ffd2d79');
            //extractor
            //Memory.spawns[6].random.extractor = '579fab82b1f02a3b0cfefd9a';
            //Memory.spawns[6].random.terminal = Game.rooms[Memory.spawns[6].random.mainRoom].terminal;
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        for (let a = 0; a < Memory.global.roomCount; a++) {
            if (Memory.spawns[a].random.hostiles)
                Memory.spawns[a].summon.users++;
            //non Memory var
            if (Memory.spawns[a].counters.roomCounter > 120) {
                Memory.global.isNew = true;
                Memory.spawns[a].counters.roomCounter = 0;
                Memory.spawns[a].sources = [];

                var roomSources = [];
                Memory.spawns[a].random.roomContainers = [];

                //add memory for all sources and containers
                for (let myRooms = 0, length = Memory.spawns[a].random.rooms.length; myRooms < length; myRooms++) {
                    if (Game.rooms[Memory.spawns[a].random.rooms[myRooms].name]) {
                        roomSources = Game.rooms[Memory.spawns[a].random.rooms[myRooms].name].find(FIND_SOURCES);
                        for (let b = 0, length2 = roomSources.length; b < length2; b++) {
                            Memory.spawns[a].sources.push(roomSources[b]);
                        }
                        Memory.spawns[a].random.roomContainers = Memory.spawns[a].random.roomContainers.concat(Game.rooms[Memory.spawns[a].random.rooms[myRooms].name].find(FIND_STRUCTURES, {
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
                    if (Game.rooms[Memory.spawns[a].random.rooms[myRooms].name]) {
                        roomSources = Game.rooms[Memory.spawns[a].random.rooms[myRooms].name].find(FIND_SOURCES);
                        for (let b = 0, length2 = roomSources.length; b < length2; b++) {
                            Memory.spawns[a].sources.push(roomSources[b]);
                        }
                        Memory.spawns[a].random.roomContainers = Memory.spawns[a].random.roomContainers.concat(Game.rooms[Memory.spawns[a].random.rooms[myRooms].name].find(FIND_STRUCTURES, {
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