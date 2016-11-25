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
        Memory.global.roomCount = 9;
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
            if (Memory.spawns[a].counters.repairLimit > 50000000)
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
            Memory.spawns[0].summon.spawns = 3;
            Memory.spawns[0].summon.h = 0;
            Memory.spawns[0].summon.b = 0;
            Memory.spawns[0].summon.u = 0;
            Memory.spawns[0].summon.h2 = 10;
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
                Memory.spawns[0].random.rooms.push({ name: 'W6S59', spawn: 3 });
                Memory.spawns[0].random.rooms.push({ name: 'W2S59', spawn: 3 });
            }
            //keeper
            if (!Memory.spawns[0].random.hostiles) {
                Memory.spawns[0].spots.push({ sourceRoom: 'W3S59' });
                Memory.spawns[0].spots.push({ sourceRoom: 'W5S59' });
                Memory.spawns[0].spots.push({ sourceRoom: 'W6S59' });
                Memory.spawns[0].spots.push({ sourceRoom: 'W2S59' });
            }
            //StoreId
            Memory.spawns[0].random.storeId = '580ee259347303ff06fb0a94';
            //UseStore
            Memory.spawns[0].random.useStore = true;
            Memory.spawns[0].random.useLinks = true;
            Memory.spawns[0].links.receiver = '581dbc0d4683ee2165588003';
            Memory.spawns[0].links.producers.push({ id: '58107e321ac8625d740861f6', source: true });
            Memory.spawns[0].links.producers.push({ id: '58151e89508d83ca5b57ba9a', source: true });
            Memory.spawns[0].links.producers.push({ id: '5821f9596aadf1c72c666734', source: true });
            Memory.spawns[0].links.producers.push({ id: '5834c47dc33c00376e5e5f7f', source: true });
            Memory.spawns[0].links.producers.push({ id: '583467c64956e7726de5ad72', source: true });
            //extractor
            Memory.spawns[0].random.extractor = '579fab88b1f02a3b0cff0343';
            Memory.spawns[0].random.terminal = '581790d7ef165c5f66b0de2b';
            Memory.spawns[0].random.defLab = '5834cc21443e2b9d39429d48';

            Memory.spawns[0].random.overflow = 'W5S53';
            //Memory.spawns[0].random.nuker = '5834f6c016bc32e01a5f3996';

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
            Memory.spawns[1].summon.spawns = 2;
            Memory.spawns[1].summon.h = 0;
            Memory.spawns[1].summon.b = 0;
            Memory.spawns[1].summon.u = 0;
            Memory.spawns[1].summon.h2 = 2;
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
                Memory.spawns[1].random.rooms.push({ name: 'W9S58', spawn: 1 });
                Memory.spawns[1].random.rooms.push({ name: 'W8S59', spawn: 1 });
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
            Memory.spawns[1].links.producers.push({ id: '5815a0cbe8610d796bab068c', source: true });
            Memory.spawns[1].links.producers.push({ id: '58192e2de9f1f76e74e3292e', source: true });
            Memory.spawns[1].links.producers.push({ id: '58225fbefc1d48883441a8cc', source: true });
            //extractor
            Memory.spawns[1].random.extractor = '579fab87b1f02a3b0cff02fb';
            Memory.spawns[1].random.terminal = '581a76d942f613dc4a3544a6';
            Memory.spawns[1].random.defLab = '';

            //spawn 2
            //spawn numbers
            Memory.spawns[2].summon.spawns = 2;
            Memory.spawns[2].summon.h = 0;
            Memory.spawns[2].summon.b = 0;
            Memory.spawns[2].summon.u = 0;
            Memory.spawns[2].summon.h2 = 8;
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

            //RoomList
            Memory.spawns[2].random.rooms.push({ name: 'W9S52', spawn: 0 });
            if (!Memory.spawns[2].random.hostiles) {
                Memory.spawns[2].random.rooms.push({ name: 'W9S51', spawn: 2 });
                Memory.spawns[2].random.rooms.push({ name: 'W9S53', spawn: 2 });
                Memory.spawns[2].random.rooms.push({ name: 'W8S52', spawn: 1 });
                Memory.spawns[2].random.rooms.push({ name: 'W7S52', spawn: 3 });
            }
            //keeper
            if (!Memory.spawns[2].random.hostiles) {
                Memory.spawns[2].spots.push({ sourceRoom: 'W9S51' });
                Memory.spawns[2].spots.push({ sourceRoom: 'W9S53' });
                Memory.spawns[2].spots.push({ sourceRoom: 'W8S52' });
                Memory.spawns[2].spots.push({ sourceRoom: 'W7S52' });
            }
            //StoreId
            Memory.spawns[2].random.storeId = '5816a280256d601350f16cf0';
            //UseStore
            Memory.spawns[2].random.useStore = true;
            Memory.spawns[2].random.useLinks = true;
            Memory.spawns[2].links.receiver = '58188d71ef9d4bed36853b9e';
            Memory.spawns[2].links.producers.push({ id: '5818d44598bdae001bc6118d', source: true });
            Memory.spawns[2].links.producers.push({ id: '581c65d61b577cff47ce83ca', source: true });
            Memory.spawns[2].links.producers.push({ id: '58246ddc8b1b147e1b644ca8', source: true });
            //extractor
            Memory.spawns[2].random.extractor = '579fab87b1f02a3b0cff02f4';
            Memory.spawns[2].random.terminal = '581d19ac83ddc28b14a43a4e';
            Memory.spawns[2].random.defLab = '';

            //spawn 3
            //spawn numbers
            Memory.spawns[3].summon.spawns = 2;
            Memory.spawns[3].summon.h = 0;
            Memory.spawns[3].summon.b = 0;
            Memory.spawns[3].summon.u = 0;
            Memory.spawns[3].summon.h2 = 8;
            Memory.spawns[3].summon.b2 = 1;
            Memory.spawns[3].summon.u2 = 0;
            Memory.spawns[3].summon.users = 1;
            Memory.spawns[3].summon.atkM = 0;
            Memory.spawns[3].summon.atkR = 0;
            Memory.spawns[3].summon.atkH = 0;
            Memory.spawns[3].summon.atkD = 0;
            Memory.spawns[3].random.mainRoom = 'W7S53';

            Memory.spawns[3].random.useUpgradeSpots = true;
            Memory.spawns[3].random.upgradeSpots.push({ x: 43, y: 10 });
            Memory.spawns[3].random.upgradeSpots.push({ x: 43, y: 11 });
            Memory.spawns[3].random.upgradeSpots.push({ x: 43, y: 12 });
            Memory.spawns[3].random.upgradeSpots.push({ x: 43, y: 13 });
            //RoomList
            Memory.spawns[3].random.rooms.push({ name: 'W7S53', spawn: 1 });
            if (!Memory.spawns[3].random.hostiles) {
                Memory.spawns[3].random.rooms.push({ name: 'W8S53', spawn: 2 });
                Memory.spawns[3].random.rooms.push({ name: 'W7S54', spawn: 2 });
                Memory.spawns[3].random.rooms.push({ name: 'W8S54', spawn: 3 });
            }
            //keeper
            if (!Memory.spawns[3].random.hostiles) {
                Memory.spawns[3].spots.push({ sourceRoom: 'W8S53' });
                Memory.spawns[3].spots.push({ sourceRoom: 'W7S54' });
                Memory.spawns[3].spots.push({ sourceRoom: 'W8S54' });
            }
            //StoreId
            Memory.spawns[3].random.storeId = '58233795f18b946a6ce6b250';
            //UseStore
            Memory.spawns[3].random.useStore = true;
            Memory.spawns[3].random.useLinks = true;
            Memory.spawns[3].links.receiver = '58231d2de6f585d875530692';
            Memory.spawns[3].links.receiverC = '58238524daeb248c73fa0dd0';
            Memory.spawns[3].links.producers.push({ id: '5818d98cd1c6336f788895a0', source: false });
            Memory.spawns[3].links.producers.push({ id: '5829cd78c9665e9240d56c75', source: false });
            //Memory.spawns[3].links.producers.push({ id: '57e924dce942a7843ffd2d79', source: true });
            //extractor
            Memory.spawns[3].random.extractor = '579fab88b1f02a3b0cff0319';
            Memory.spawns[3].random.terminal = '581f779e324e9a5e7a755e2f';
            Memory.spawns[3].random.defLab = '';

            //spawn 4
            //spawn numbers
            Memory.spawns[4].summon.spawns = 2;
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
            Memory.spawns[4].random.rooms.push({ name: 'W8S56', spawn: 0 });
            if (!Memory.spawns[4].random.hostiles) {
                Memory.spawns[4].random.rooms.push({ name: 'W8S57', spawn: 2 });
                Memory.spawns[4].random.rooms.push({ name: 'W7S56', spawn: 1 });
                Memory.spawns[4].random.rooms.push({ name: 'W9S57', spawn: 3 });
            }
            ////keeper
            if (!Memory.spawns[4].random.hostiles) {
                Memory.spawns[4].spots.push({ sourceRoom: 'W8S57' });
                Memory.spawns[4].spots.push({ sourceRoom: 'W7S56' });
                Memory.spawns[4].spots.push({ sourceRoom: 'W9S57' });
            }
            //StoreId
            Memory.spawns[4].random.storeId = '5819ba83b0033eb058e0d032';
            //UseStore
            Memory.spawns[4].random.useStore = true;
            Memory.spawns[4].random.useLinks = true;
            Memory.spawns[4].links.receiver = '581b9a4cdc867c402c841458';
            Memory.spawns[4].links.producers.push({ id: '5819a70eed4bc0052bfbc2fe', source: true });
            Memory.spawns[4].links.producers.push({ id: '581d798c3cde9d443e4ec27a', source: true });
            //Memory.spawns[4].links.producers.push({ id: '57e924dce942a7843ffd2d79', source: true });
            //extractor
            Memory.spawns[4].random.extractor = '579fab87b1f02a3b0cff030a';
            Memory.spawns[4].random.terminal = '581e93ab1ba2e0cc73e157bf';
            Memory.spawns[4].random.defLab = '';

            //spawn 5
            //spawn numbers
            Memory.spawns[5].summon.spawns = 2;
            Memory.spawns[5].summon.h = 0;
            Memory.spawns[5].summon.b = 0;
            Memory.spawns[5].summon.u = 0;
            Memory.spawns[5].summon.h2 = 2;
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
            Memory.spawns[5].random.rooms.push({ name: 'W6S51', spawn: 0 });
            if (!Memory.spawns[5].random.hostiles) {
                Memory.spawns[5].random.rooms.push({ name: 'W5S51', spawn: 2 });
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
            Memory.spawns[5].links.producers.push({ id: '581ce19484f6ed0671281c7f', source: true });
            Memory.spawns[5].links.producers.push({ id: '5821821d2c332399063f8a1a', source: true });
            //Memory.spawns[5].links.producers.push({ id: '57e924dce942a7843ffd2d79', source: true });
            //extractor
            Memory.spawns[5].random.extractor = '579fab88b1f02a3b0cff0326';
            Memory.spawns[5].random.terminal = '58221a217f0d8a854578f352';
            Memory.spawns[5].random.defLab = '';

            //spawn 6
            //spawn numbers
            Memory.spawns[6].summon.spawns = 1;
            Memory.spawns[6].summon.h = 0;
            Memory.spawns[6].summon.b = 0;
            Memory.spawns[6].summon.u = 0;
            Memory.spawns[6].summon.h2 = 3;
            Memory.spawns[6].summon.b2 = 1;
            Memory.spawns[6].summon.u2 = 0;
            Memory.spawns[6].summon.users = 1;
            Memory.spawns[6].summon.atkM = 0;
            Memory.spawns[6].summon.atkR = 0;
            Memory.spawns[6].summon.atkH = 0;
            Memory.spawns[6].summon.atkD = 0;
            Memory.spawns[6].random.mainRoom = 'W5S53';

            Memory.spawns[6].random.useUpgradeSpots = true;
            Memory.spawns[6].random.upgradeSpots.push({ x: 32, y: 32 });
            Memory.spawns[6].random.upgradeSpots.push({ x: 32, y: 33 });
            Memory.spawns[6].random.upgradeSpots.push({ x: 32, y: 34 });
            Memory.spawns[6].random.upgradeSpots.push({ x: 32, y: 35 });

            ////RoomList
            Memory.spawns[6].random.rooms.push({ name: 'W5S53', spawn: 0 });
            if (!Memory.spawns[6].random.hostiles) {
                Memory.spawns[6].random.rooms.push({ name: 'W5S52', spawn: 3 });
                //    //    Memory.spawns[6].random.rooms.push({ name: 'W7S56', spawn: 3 });
            }
            ////keeper
            if (!Memory.spawns[6].random.hostiles) {
                Memory.spawns[6].spots.push({ sourceRoom: 'W5S52' });
                //    //    Memory.spawns[6].spots.push({ sourceRoom: 'W7S56' });
            }
            //StoreId
            Memory.spawns[6].random.storeId = '581f609f0009bd4d5468e86e';
            //UseStore
            Memory.spawns[6].random.useStore = true;
            Memory.spawns[6].random.useLinks = true;
            Memory.spawns[6].links.receiver = '5822e42339f57c9e23f650aa';
            Memory.spawns[6].links.producers.push({ id: '5822e7a89a187519480305d4', source: true });
            Memory.spawns[6].links.producers.push({ id: '5828ded83e309cbe02bd70fd', source: true });
            //Memory.spawns[6].links.producers.push({ id: '57e924dce942a7843ffd2d79', source: true });
            //extractor
            Memory.spawns[6].random.extractor = '579fab88b1f02a3b0cff0334';
            Memory.spawns[6].random.terminal = '582aa1014b70335918aa1291';
            Memory.spawns[6].random.defLab = '';

            //spawn 7
            //spawn numbers
            Memory.spawns[7].summon.spawns = 1;
            Memory.spawns[7].summon.h = 0;
            Memory.spawns[7].summon.b = 0;
            Memory.spawns[7].summon.u = 0;
            Memory.spawns[7].summon.h2 = 2;
            Memory.spawns[7].summon.b2 = 1;
            Memory.spawns[7].summon.u2 = 0;
            Memory.spawns[7].summon.users = 1;
            Memory.spawns[7].summon.atkM = 0;
            Memory.spawns[7].summon.atkR = 0;
            Memory.spawns[7].summon.atkH = 0;
            Memory.spawns[7].summon.atkD = 0;
            Memory.spawns[7].random.mainRoom = 'W6S53';

            //Memory.spawns[7].random.useUpgradeSpots = true;
            //Memory.spawns[7].random.upgradeSpots.push({ x: 32, y: 32 });
            //Memory.spawns[7].random.upgradeSpots.push({ x: 32, y: 33 });
            //Memory.spawns[7].random.upgradeSpots.push({ x: 32, y: 34 });
            //Memory.spawns[7].random.upgradeSpots.push({ x: 32, y: 35 });

            ////RoomList
            Memory.spawns[7].random.rooms.push({ name: 'W6S53', spawn: 0 });
            if (!Memory.spawns[7].random.hostiles) {
                Memory.spawns[7].random.rooms.push({ name: 'W6S52', spawn: 2 });
                //    Memory.spawns[7].random.rooms.push({ name: 'W7S56', spawn: 3 });
            }
            ////keeper
            if (!Memory.spawns[7].random.hostiles) {
                Memory.spawns[7].spots.push({ sourceRoom: 'W6S52' });
                //    Memory.spawns[7].spots.push({ sourceRoom: 'W7S56' });
            }
            //StoreId
            Memory.spawns[7].random.storeId = '582e4d002044ca0c5085b586';
            //UseStore
            Memory.spawns[7].random.useStore = true;
            Memory.spawns[7].random.useLinks = true;
            Memory.spawns[7].links.receiver = '5830af604927d18b092518d1';
            Memory.spawns[7].links.producers.push({ id: '5830b474aa12e28d5f2be97c', source: true });
            Memory.spawns[7].links.producers.push({ id: '5830b1ae929d91b732cf4ef4', source: true });
            //Memory.spawns[7].links.producers.push({ id: '57e924dce942a7843ffd2d79', source: true });
            //extractor
            Memory.spawns[7].random.extractor = '579fab88b1f02a3b0cff0328';
            Memory.spawns[7].random.terminal = '5831d5d8202214f5461bdab4';
            Memory.spawns[7].random.defLab = '';

            //spawn 8
            //spawn numbers
            Memory.spawns[8].summon.spawns = 1;
            Memory.spawns[8].summon.h = 0;
            Memory.spawns[8].summon.b = 0;
            Memory.spawns[8].summon.u = 0;
            Memory.spawns[8].summon.h2 = 3;
            Memory.spawns[8].summon.b2 = 1;
            Memory.spawns[8].summon.u2 = 0;
            Memory.spawns[8].summon.users = 1;
            Memory.spawns[8].summon.atkM = 0;
            Memory.spawns[8].summon.atkR = 0;
            Memory.spawns[8].summon.atkH = 0;
            Memory.spawns[8].summon.atkD = 0;
            Memory.spawns[8].random.mainRoom = 'W3S55';

            Memory.spawns[8].random.useUpgradeSpots = true;
            Memory.spawns[8].random.upgradeSpots.push({ x: 14, y: 25 });
            Memory.spawns[8].random.upgradeSpots.push({ x: 13, y: 25 });
            Memory.spawns[8].random.upgradeSpots.push({ x: 12, y: 25 });
            Memory.spawns[8].random.upgradeSpots.push({ x: 11, y: 25 });

            ////RoomList
            Memory.spawns[8].random.rooms.push({ name: 'W3S55', spawn: 1 });
            if (!Memory.spawns[8].random.hostiles) {
                Memory.spawns[8].random.rooms.push({ name: 'W3S56', spawn: 1 });
                Memory.spawns[8].random.rooms.push({ name: 'W2S55', spawn: 1 });
            }
            ////keeper
            if (!Memory.spawns[8].random.hostiles) {
                Memory.spawns[8].spots.push({ sourceRoom: 'W3S56' });
                Memory.spawns[8].spots.push({ sourceRoom: 'W2S55' });
            }
            //StoreId
            Memory.spawns[8].random.storeId = '5836e0ae2831ba423c0923b2';
            //UseStore
            Memory.spawns[8].random.useStore = true;
            //Memory.spawns[8].random.useLinks = true;
            //Memory.spawns[8].links.receiver = '5830af604927d18b092518d1';
            //Memory.spawns[8].links.producers.push({ id: '5830b474aa12e28d5f2be97c', source: true });
            //Memory.spawns[8].links.producers.push({ id: '5830b1ae929d91b732cf4ef4', source: true });
            ////Memory.spawns[8].links.producers.push({ id: '57e924dce942a7843ffd2d79', source: true });
            ////extractor
            //Memory.spawns[8].random.extractor = '579fab88b1f02a3b0cff0328';
            //Memory.spawns[8].random.terminal = '5831d5d8202214f5461bdab4';
            //Memory.spawns[8].random.defLab = '';
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        for (let a = 0; a < Memory.global.roomCount; a++) {
            if (Memory.spawns[a].random.hostiles)
                Memory.spawns[a].summon.users = 2;
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
                            Memory.spawns[a].sources.push(roomSources[b].id);
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

                if (Memory.spawns[a].random.overflow) {
                    let sendOverflow = Game.rooms[Memory.spawns[a].random.overflow].terminal;
                    let sendOverflowFrom = Game.rooms[Memory.spawns[a].random.mainRoom].terminal;

                    if (_.sum(sendOverflow.store) < 280000 && sendOverflowFrom.store.energy > 55000) {
                        Game.rooms[Memory.spawns[a].random.mainRoom].terminal.send(RESOURCE_ENERGY, 30000, Memory.spawns[a].random.overflow, null);
                    }
                }
            }
            else {
                for (let r = 0, lengthR = Memory.spawns[a].random.roomContainers.length; r < lengthR; r++) {
                    let roomCont = Game.getObjectById(Memory.spawns[a].random.roomContainers[r]);
                    if (roomCont)
                        Memory.spawns[a].random.roomContainers[r] = roomCont.id;
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

            if (Memory.spawns[a].counters.creeps < 6)
                Game.notify("spawn " + a + " has " + Memory.spawns[a].counters.creeps + " creeps");

            if (Memory.spawns[a].random.useLinks) {
                roleLink.run(a);
            }
        }
    }
};

module.exports = roleCreateJSON;