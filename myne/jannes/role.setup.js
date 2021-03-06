var roleSetup = {

    /** @param {Creep} creep **/
    run: function (a) {

        if (a == 0) {
            for (let b = 0; b < Memory.global.roomCount; b++) {

                //reset for changes
                Memory.spawns[b].random.rooms = [];
                Memory.spawns[b].spots = [];
                Memory.spawns[b].links.producers = [];
                Memory.spawns[b].random.upgradeSpots = [];
            }
            //spawn 0
            //spawn numbers
            Memory.spawns[0].summon.spawns = 3;
            Memory.spawns[0].summon.h = 0;
            Memory.spawns[0].summon.b = 0;
            Memory.spawns[0].summon.u = 0;
            Memory.spawns[0].summon.h2 = 8;
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
                Memory.spawns[0].random.rooms.push({ name: 'W3S59', spawn: 1 });
                Memory.spawns[0].random.rooms.push({ name: 'W5S59', spawn: 1 });
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
            Memory.spawns[0].random.nuker = '5834f6c016bc32e01a5f3996';
            Memory.spawns[0].random.observer = '587a8c7f2b2558ba47e227bc';
            Memory.spawns[0].random.powerSpawn = '5834a78c5c5373f236e488c6';

            Memory.spawns[0].random.runReaction = true;
            Memory.spawns[0].random.runReactionL = { XGH2O: 20000 };
            Memory.spawns[0].reactions = [];

            Memory.spawns[0].reactions.push(new Array());
            Memory.spawns[0].reactions[0].push({ m: 'XGH2O', l: '58354e1c1123cc6e786f0d23' });
            Memory.spawns[0].reactions[0].push({ m: 'GH2O', l: '582116148047a58e4fd7da1c', r: 'W9S52' });
            Memory.spawns[0].reactions[0].push({ m: 'X', l: '5816c43eca67a9782d7b5e60' });

            Memory.spawns[0].reactions.push(new Array());
            Memory.spawns[0].reactions[1].push({ m: 'XGH2O', l: '583524cdcbde542872c82c87' });
            Memory.spawns[0].reactions[1].push({ m: 'GH2O', l: '582116148047a58e4fd7da1c', r: 'W9S52' });
            Memory.spawns[0].reactions[1].push({ m: 'X', l: '5816c43eca67a9782d7b5e60' });

            Memory.spawns[0].reactions.push(new Array());
            Memory.spawns[0].reactions[2].push({ m: 'XGH2O', l: '582176845c23a55857c694e8' });
            Memory.spawns[0].reactions[2].push({ m: 'GH2O', l: '582116148047a58e4fd7da1c', r: 'W9S52' });
            Memory.spawns[0].reactions[2].push({ m: 'X', l: '5816c43eca67a9782d7b5e60' });

            Memory.spawns[0].reactions.push(new Array());
            Memory.spawns[0].reactions[3].push({ m: 'XGH2O', l: '583514f822476adc13ebc425' });
            Memory.spawns[0].reactions[3].push({ m: 'GH2O', l: '582116148047a58e4fd7da1c', r: 'W9S52' });
            Memory.spawns[0].reactions[3].push({ m: 'X', l: '5816c43eca67a9782d7b5e60' });

            Memory.spawns[0].requests = [];

            Memory.spawns[0].requests.push({ m: 'XLHO2', l: '5820e8f4467b718b553fbdf5' });
            Memory.spawns[0].requests.push({ m: 'XZHO2', l: '58171d9d104bf0400291ef6b' });
            Memory.spawns[0].requests.push({ m: 'XGHO2', l: '5816ece205177e013c41ddce' });

            //spawn 1
            //spawn numbers
            Memory.spawns[1].summon.spawns = 3;
            Memory.spawns[1].summon.h = 0;
            Memory.spawns[1].summon.b = 0;
            Memory.spawns[1].summon.u = 0;
            Memory.spawns[1].summon.h2 = 3;
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
            Memory.spawns[1].links.producers.push({ id: '5815a0cbe8610d796bab068c', source: true });
            Memory.spawns[1].links.producers.push({ id: '58192e2de9f1f76e74e3292e', source: true });
            Memory.spawns[1].links.producers.push({ id: '58225fbefc1d48883441a8cc', source: true });
            //extractor
            Memory.spawns[1].random.extractor = '579fab87b1f02a3b0cff02fb';
            Memory.spawns[1].random.terminal = '581a76d942f613dc4a3544a6';
            Memory.spawns[1].random.defLab = '583fcfbcde79c02161b39fe3';
            Memory.spawns[1].random.nuker = '583ebb7ad1cb37fc52ac9987';
            Memory.spawns[1].random.observer = '587a8a4c9fe1f1342bfc6f6c';
            Memory.spawns[1].random.powerSpawn = '583efc859574aaf7218c72af';
            Memory.spawns[1].random.runReaction = true;

            Memory.spawns[1].requests = [];

            Memory.spawns[1].requests.push({ m: 'XUH2O', l: '5819e455c80e052076e314c0' });
            Memory.spawns[1].requests.push({ m: 'XZHO2', l: '5822c32a4186e8930ac80648' });
            Memory.spawns[1].requests.push({ m: 'XGHO2', l: '58231e97f60d44b54edcbaea' });
            Memory.spawns[1].requests.push({ m: 'XZH2O', l: '58239f7eef4e6daf161fd0d5' });

            //spawn 2
            //spawn numbers
            Memory.spawns[2].summon.spawns = 3;
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
            Memory.spawns[2].links.producers.push({ id: '5839b4d604d6c956765b4ec4', source: true });
            //extractor
            Memory.spawns[2].random.extractor = '579fab87b1f02a3b0cff02f4';
            Memory.spawns[2].random.terminal = '581d19ac83ddc28b14a43a4e';
            Memory.spawns[2].random.defLab = '58389bd48ff1bfa430ad5d91';
            Memory.spawns[2].random.nuker = '583812703c39d0fc0b2fdae7';
            Memory.spawns[2].random.observer = '587a8926bcde4b0c8397851c';
            Memory.spawns[2].random.powerSpawn = '58383ba9a98e1a1b4a0ec01c';

            Memory.spawns[2].random.runReaction = true;
            Memory.spawns[2].random.runReactionL = { GH2O: 1000 };
            Memory.spawns[2].reactions = [];

            Memory.spawns[2].reactions.push(new Array());
            Memory.spawns[2].reactions[0].push({ m: 'GH2O', l: '581dbaa2fc44c2f349e4da7f' });
            Memory.spawns[2].reactions[0].push({ m: 'GH', l: '582531c2fe32029f0cc69337', r: 'W4S57' });
            Memory.spawns[2].reactions[0].push({ m: 'OH', l: '582595f19db792a23fd894cf', r: 'W6S53' });

            Memory.spawns[2].reactions.push(new Array());
            Memory.spawns[2].reactions[1].push({ m: 'GH2O', l: '581e058c3169df7714b5824f' });
            Memory.spawns[2].reactions[1].push({ m: 'GH', l: '582531c2fe32029f0cc69337', r: 'W4S57' });
            Memory.spawns[2].reactions[1].push({ m: 'OH', l: '582595f19db792a23fd894cf', r: 'W6S53' });

            Memory.spawns[2].reactions.push(new Array());
            Memory.spawns[2].reactions[2].push({ m: 'GH2O', l: '5824cfe51f2cd6a35c0fc40e' });
            Memory.spawns[2].reactions[2].push({ m: 'GH', l: '582531c2fe32029f0cc69337', r: 'W4S57' });
            Memory.spawns[2].reactions[2].push({ m: 'OH', l: '582595f19db792a23fd894cf', r: 'W6S53' });

            Memory.spawns[2].reactions.push(new Array());
            Memory.spawns[2].reactions[3].push({ m: 'GH2O', l: '58386f8f40fe26a7282c873e' });
            Memory.spawns[2].reactions[3].push({ m: 'GH', l: '582531c2fe32029f0cc69337', r: 'W4S57' });
            Memory.spawns[2].reactions[3].push({ m: 'OH', l: '582595f19db792a23fd894cf', r: 'W6S53' });

            //spawn 3
            //spawn numbers
            Memory.spawns[3].summon.spawns = 3;
            Memory.spawns[3].summon.h = 0;
            Memory.spawns[3].summon.b = 0;
            Memory.spawns[3].summon.u = 0;
            Memory.spawns[3].summon.h2 = 6;
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
            Memory.spawns[3].random.rooms.push({ name: 'W7S53', spawn: 0 });
            if (!Memory.spawns[3].random.hostiles) {
                Memory.spawns[3].random.rooms.push({ name: 'W8S53', spawn: 2 });
                Memory.spawns[3].random.rooms.push({ name: 'W7S54', spawn: 1 });
                Memory.spawns[3].random.rooms.push({ name: 'W8S54', spawn: 3 });
            }
            //keeper
            if (!Memory.spawns[3].random.hostiles) {
                Memory.spawns[3].spots.push({ sourceRoom: 'W8S53' });
                //Memory.spawns[3].spots.push({ sourceRoom: 'W7S54' });
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
            Memory.spawns[3].links.producers.push({ id: '5843442c0cc0a779391ec5a4', source: true });
            Memory.spawns[3].links.producers.push({ id: '58569f3fa56219f35d2a00e7', source: false });
            //extractor
            Memory.spawns[3].random.extractor = '579fab88b1f02a3b0cff0319';
            Memory.spawns[3].random.terminal = '581f779e324e9a5e7a755e2f';
            Memory.spawns[3].random.observer = '587a890fff5b97f5478f2556';
            Memory.spawns[3].random.powerSpawn = '58435b50dde533fb586a724d';
            Memory.spawns[3].random.defLab = '5843a44e01cf306f1432e89b';
            Memory.spawns[3].random.runReaction = true;
            Memory.spawns[3].random.runReactionL = { ZK: 1000 };
            Memory.spawns[3].reactions = [];
            Memory.spawns[3].requests = [];

            Memory.spawns[3].requests.push({ m: 'XGH2O', l: '5843da58ad3ff4230eac6547', r: 'W4S59' });

            Memory.spawns[3].reactions.push(new Array());
            Memory.spawns[3].reactions[0].push({ m: 'ZK', l: '581fd1768000c0a607fe45f0' });
            Memory.spawns[3].reactions[0].push({ m: 'Z', l: '581eab551fc92be318115693' });
            Memory.spawns[3].reactions[0].push({ m: 'K', l: '583bd2d5e8644f1d514c6fd8', r: 'W8S56' });

            Memory.spawns[3].reactions.push(new Array());
            Memory.spawns[3].reactions[1].push({ m: 'ZK', l: '583c0a4d3eafca7e174ff6c5' });
            Memory.spawns[3].reactions[1].push({ m: 'Z', l: '581eab551fc92be318115693' });
            Memory.spawns[3].reactions[1].push({ m: 'K', l: '583bd2d5e8644f1d514c6fd8', r: 'W8S56' });


            Memory.spawns[3].reactions.push(new Array());
            Memory.spawns[3].reactions[2].push({ m: 'ZK', l: '58202aa5a65422dd762bd277' });
            Memory.spawns[3].reactions[2].push({ m: 'Z', l: '581eab551fc92be318115693' });
            Memory.spawns[3].reactions[2].push({ m: 'K', l: '583bd2d5e8644f1d514c6fd8', r: 'W8S56' });


            Memory.spawns[3].reactions.push(new Array());
            Memory.spawns[3].reactions[3].push({ m: 'ZK', l: '58440af83e975ead349fa3e9' });
            Memory.spawns[3].reactions[3].push({ m: 'Z', l: '581eab551fc92be318115693' });
            Memory.spawns[3].reactions[3].push({ m: 'K', l: '583bd2d5e8644f1d514c6fd8', r: 'W8S56' });
            Memory.spawns[3].random.nuker = '58436672be44c9882007fcb7';

            Memory.spawns[3].random.boostRoom = true;
            //Memory.spawns[3].random.boostUp = '';
            //Memory.spawns[3].random.boostRoom = 'W7S54';
            Memory.spawns[3].random.boostNumber = 10;

            //spawn 4
            //spawn numbers
            Memory.spawns[4].summon.spawns = 3;
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
            Memory.spawns[4].links.receiver = '5851407969c95b2d5835f213';
            Memory.spawns[4].links.producers.push({ id: '5819a70eed4bc0052bfbc2fe', source: true });
            Memory.spawns[4].links.producers.push({ id: '581d798c3cde9d443e4ec27a', source: true });
            Memory.spawns[4].links.producers.push({ id: '583e00887e023b0b658afe87', source: true });
            //extractor
            Memory.spawns[4].random.extractor = '579fab87b1f02a3b0cff030a';
            Memory.spawns[4].random.terminal = '581e93ab1ba2e0cc73e157bf';
            Memory.spawns[4].random.defLab = '584171ebb61087fc55ecc997';
            Memory.spawns[4].random.nuker = '583dd865f22b983d781d6b75';
            Memory.spawns[4].random.runReaction = true;
            Memory.spawns[4].random.observer = '587a8a741ed5b0cb024c7ca8';
            Memory.spawns[4].random.powerSpawn = '583d9f36851682d20354a237';

            //spawn 5
            //spawn numbers
            Memory.spawns[5].summon.spawns = 3;
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
            Memory.spawns[5].random.defLab = '585072b22058734f7f51879e';
            Memory.spawns[5].random.nuker = '585064c62ee4214b3f41c50b';
            Memory.spawns[5].random.observer = '587a89ad7999c0272f579529';
            Memory.spawns[5].random.powerSpawn = '5850d3eae0bf56d870e0113c';
            Memory.spawns[5].random.runReaction = true;

            //spawn 6
            //spawn numbers
            Memory.spawns[6].summon.spawns = 3;
            Memory.spawns[6].summon.h = 0;
            Memory.spawns[6].summon.b = 0;
            Memory.spawns[6].summon.u = 0;
            Memory.spawns[6].summon.h2 = 13;
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
                Memory.spawns[6].random.rooms.push({ name: 'W5S52', spawn: 2 });
                Memory.spawns[6].random.rooms.push({ name: 'W5S54', spawn: 4, sk: true });
                Memory.spawns[6].random.rooms.push({ name: 'W4S54', spawn: 7, sk: true });
            }
            ////keeper
            if (!Memory.spawns[6].random.hostiles) {
                Memory.spawns[6].spots.push({ sourceRoom: 'W5S52' });
                Memory.spawns[6].spots.push({ sourceRoom: 'W5S54', sk: true, x: 29, y: 14 });
                Memory.spawns[6].spots.push({ sourceRoom: 'W4S54', sk: true, x: 6, y: 24 });
            }
            //StoreId
            Memory.spawns[6].random.storeId = '581f609f0009bd4d5468e86e';
            //UseStore
            Memory.spawns[6].random.useStore = true;
            Memory.spawns[6].random.useLinks = true;
            Memory.spawns[6].links.receiver = '5822e42339f57c9e23f650aa';
            Memory.spawns[6].links.producers.push({ id: '5822e7a89a187519480305d4', source: true });
            Memory.spawns[6].links.producers.push({ id: '5828ded83e309cbe02bd70fd', source: true });
            Memory.spawns[6].links.producers.push({ id: '583adbe811dc8f74034f13d9', source: true });
            Memory.spawns[6].links.producers.push({ id: '5850205397ffb6e1777f6d24', source: true });
            Memory.spawns[6].links.producers.push({ id: '585024d9a8119c7a1feb3565', source: true });
            //extractor
            Memory.spawns[6].random.extractor = '579fab88b1f02a3b0cff0334';
            Memory.spawns[6].random.terminal = '582aa1014b70335918aa1291';
            Memory.spawns[6].random.defLab = '58503bbbe724324d4dffca99';
            Memory.spawns[6].random.nuker = '584f03089fc4e985206ea7a7';
            Memory.spawns[6].random.powerSpawn = '584f403f671a0e065a325830';
            Memory.spawns[6].random.runReaction = true;
            Memory.spawns[6].random.runReactionL = { UL: 1000 };
            Memory.spawns[6].reactions = [];

            Memory.spawns[6].reactions.push(new Array());
            Memory.spawns[6].reactions[0].push({ m: 'UL', l: '584fdb1edc177f446bc25c6c' });
            Memory.spawns[6].reactions[0].push({ m: 'U', l: '583c22360d802d93244a3dc2' });
            Memory.spawns[6].reactions[0].push({ m: 'L', l: '583c5ca97fcae761649afe05', r: 'W3S55' });

            Memory.spawns[6].reactions.push(new Array());
            Memory.spawns[6].reactions[1].push({ m: 'UL', l: '5829482e90cd896460ed38da' });
            Memory.spawns[6].reactions[1].push({ m: 'U', l: '583c22360d802d93244a3dc2' });
            Memory.spawns[6].reactions[1].push({ m: 'L', l: '583c5ca97fcae761649afe05', r: 'W3S55' });

            Memory.spawns[6].reactions.push(new Array());
            Memory.spawns[6].reactions[2].push({ m: 'UL', l: '583ce2190188cbd60339013e' });
            Memory.spawns[6].reactions[2].push({ m: 'U', l: '583c22360d802d93244a3dc2' });
            Memory.spawns[6].reactions[2].push({ m: 'L', l: '583c5ca97fcae761649afe05', r: 'W3S55' });

            Memory.spawns[6].reactions.push(new Array());
            Memory.spawns[6].reactions[3].push({ m: 'UL', l: '58299cac6ff35bc4431fbe8a' });
            Memory.spawns[6].reactions[3].push({ m: 'U', l: '583c22360d802d93244a3dc2' });
            Memory.spawns[6].reactions[3].push({ m: 'L', l: '583c5ca97fcae761649afe05', r: 'W3S55' });

            //spawn 7
            //spawn numbers
            Memory.spawns[7].summon.spawns = 3;
            Memory.spawns[7].summon.h = 0;
            Memory.spawns[7].summon.b = 0;
            Memory.spawns[7].summon.u = 0;
            Memory.spawns[7].summon.h2 = 13;
            Memory.spawns[7].summon.b2 = 1;
            Memory.spawns[7].summon.u2 = 0;
            Memory.spawns[7].summon.users = 1;
            Memory.spawns[7].summon.atkM = 0;
            Memory.spawns[7].summon.atkR = 0;
            Memory.spawns[7].summon.atkH = 0;
            Memory.spawns[7].summon.atkD = 0;
            Memory.spawns[7].random.mainRoom = 'W6S53';

            Memory.spawns[7].random.useUpgradeSpots = true;
            Memory.spawns[7].random.upgradeSpots.push({ x: 25, y: 16 });
            Memory.spawns[7].random.upgradeSpots.push({ x: 24, y: 16 });
            Memory.spawns[7].random.upgradeSpots.push({ x: 23, y: 16 });
            Memory.spawns[7].random.upgradeSpots.push({ x: 26, y: 16 });

            //RoomList
            Memory.spawns[7].random.rooms.push({ name: 'W6S53', spawn: 0 });
            if (!Memory.spawns[7].random.hostiles) {
                Memory.spawns[7].random.rooms.push({ name: 'W6S52', spawn: 2 });
                Memory.spawns[7].random.rooms.push({ name: 'W6S54', spawn: 4, sk: true });
                Memory.spawns[7].random.rooms.push({ name: 'W5S55', spawn: 7, sk: true });
            }
            //keeper
            if (!Memory.spawns[7].random.hostiles) {
                Memory.spawns[7].spots.push({ sourceRoom: 'W6S52' });
                Memory.spawns[7].spots.push({ sourceRoom: 'W6S54', sk: true, x: 21, y: 6 });
                Memory.spawns[7].spots.push({ sourceRoom: 'W5S55', sk: true, x: 17, y: 12, flag: 'FlagRoom' });
            }
            //StoreId
            Memory.spawns[7].random.storeId = '582e4d002044ca0c5085b586';
            //UseStore
            Memory.spawns[7].random.useStore = true;
            Memory.spawns[7].random.useLinks = true;
            Memory.spawns[7].links.receiver = '5830af604927d18b092518d1';
            Memory.spawns[7].links.producers.push({ id: '5830b474aa12e28d5f2be97c', source: true });
            Memory.spawns[7].links.producers.push({ id: '5830b1ae929d91b732cf4ef4', source: true });
            Memory.spawns[7].links.producers.push({ id: '58525b08f3f26639356b0618', source: true });
            Memory.spawns[7].links.producers.push({ id: '585530b43f4cd85b441f6c25', source: true });
            Memory.spawns[7].links.producers.push({ id: '5855358bc30b56472154a3a5', source: true });
            //extractor
            Memory.spawns[7].random.extractor = '579fab88b1f02a3b0cff0328';
            Memory.spawns[7].random.terminal = '5831d5d8202214f5461bdab4';
            Memory.spawns[7].random.defLab = '58562a346794557c68105bcb';
            Memory.spawns[7].random.nuker = '58559aaad2d6ffc36a0ee779';
            Memory.spawns[7].random.powerSpawn = '5855f9847b7b7abc59816f6d';
            Memory.spawns[7].random.runReaction = true;
            Memory.spawns[7].random.runReactionL = { OH: 10000 };
            Memory.spawns[7].reactions = [];

            Memory.spawns[7].reactions.push(new Array());
            Memory.spawns[7].reactions[0].push({ m: 'OH', l: '583d1bc885d06b81324572fb' });
            Memory.spawns[7].reactions[0].push({ m: 'O', l: '583ce4155ecf1e7871c1c0e0', r: 'W9S59' });
            Memory.spawns[7].reactions[0].push({ m: 'H', l: '583cfd1a8494015279f7c0fc', r: 'W9S52' });

            Memory.spawns[7].reactions.push(new Array());
            Memory.spawns[7].reactions[1].push({ m: 'OH', l: '58314d28752fa9b77e2c9a7d' });
            Memory.spawns[7].reactions[1].push({ m: 'O', l: '583ce4155ecf1e7871c1c0e0', r: 'W9S59' });
            Memory.spawns[7].reactions[1].push({ m: 'H', l: '583cfd1a8494015279f7c0fc', r: 'W9S52' });

            Memory.spawns[7].reactions.push(new Array());
            Memory.spawns[7].reactions[2].push({ m: 'OH', l: '5831c551ede9ddf14bf90093' });
            Memory.spawns[7].reactions[2].push({ m: 'O', l: '583ce4155ecf1e7871c1c0e0', r: 'W9S59' });
            Memory.spawns[7].reactions[2].push({ m: 'H', l: '583cfd1a8494015279f7c0fc', r: 'W9S52' });

            Memory.spawns[7].reactions.push(new Array());
            Memory.spawns[7].reactions[3].push({ m: 'OH', l: '58310c3f66dd01de78c79e5b' });
            Memory.spawns[7].reactions[3].push({ m: 'O', l: '583ce4155ecf1e7871c1c0e0', r: 'W9S59' });
            Memory.spawns[7].reactions[3].push({ m: 'H', l: '583cfd1a8494015279f7c0fc', r: 'W9S52' });


            Memory.spawns[7].requests = [];

            Memory.spawns[7].requests.push({ m: 'XUH2O', l: '58560a405b86cff8517fcd86' });
            Memory.spawns[7].requests.push({ m: 'XZHO2', l: '58564554e9f2213046bf41d1' });
            Memory.spawns[7].requests.push({ m: 'XGHO2', l: '5855d53782396c315907b5fb' });
            //spawn 8
            //spawn numbers
            Memory.spawns[8].summon.spawns = 3;
            Memory.spawns[8].summon.h = 0;
            Memory.spawns[8].summon.b = 0;
            Memory.spawns[8].summon.u = 0;
            Memory.spawns[8].summon.h2 = 5;
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
            Memory.spawns[8].random.rooms.push({ name: 'W3S55', spawn: 0 });
            if (!Memory.spawns[8].random.hostiles) {
                //Memory.spawns[8].random.rooms.push({ name: 'W3S56', spawn: 1 });
                //Memory.spawns[8].random.rooms.push({ name: 'W2S55', spawn: 1 });
                Memory.spawns[8].random.rooms.push({ name: 'W4S55', spawn: 5, sk: true });
            }
            ////keeper
            if (!Memory.spawns[8].random.hostiles) {
                //Memory.spawns[8].spots.push({ sourceRoom: 'W3S56' });
                //Memory.spawns[8].spots.push({ sourceRoom: 'W2S55' });
                Memory.spawns[8].spots.push({ sourceRoom: 'W4S55', sk: true, x: 43, y: 44 });
            }
            //StoreId
            Memory.spawns[8].random.storeId = '5836e0ae2831ba423c0923b2';
            //UseStore
            Memory.spawns[8].random.useStore = true;
            Memory.spawns[8].random.useLinks = true;
            Memory.spawns[8].links.receiver = '583e00a077619101784c23c6';
            Memory.spawns[8].links.producers.push({ id: '583e06a27e96aefb346adb5c', source: true });
            Memory.spawns[8].links.producers.push({ id: '583e0725444e850535f866e6', source: true });
            ////Memory.spawns[8].links.producers.push({ id: '57e924dce942a7843ffd2d79', source: true });
            ////extractor
            Memory.spawns[8].random.extractor = '579fab88b1f02a3b0cff0351';
            Memory.spawns[8].random.terminal = '583ed79fa9e44d646c084972';
            Memory.spawns[8].random.nuker = '585b1e015ad0c6b011c0ec86';
            Memory.spawns[8].random.defLab = '585b9f96d1db5c1f24b8f442';
            Memory.spawns[8].random.powerSpawn = '585b5074e511e35d5d2a37a1';
            Memory.spawns[8].random.observer = '58ba9d2cf6447384695fcb5d';

            Memory.spawns[8].random.runReaction = true;
            Memory.spawns[8].random.runReactionL = { G: 3000 };
            Memory.spawns[8].reactions = [];

            Memory.spawns[8].reactions.push(new Array());
            Memory.spawns[8].reactions[0].push({ m: 'G', l: '5844f05505392ca030fb8065' });
            Memory.spawns[8].reactions[0].push({ m: 'ZK', l: '5844c2509a1b04b7595d72fe', r: 'W7S53' });
            Memory.spawns[8].reactions[0].push({ m: 'UL', l: '583efb78aa680a7c04dc800d', r: 'W5S53' });

            Memory.spawns[8].reactions.push(new Array());
            Memory.spawns[8].reactions[1].push({ m: 'G', l: '584495b151d84da21c559918' });
            Memory.spawns[8].reactions[1].push({ m: 'ZK', l: '5844c2509a1b04b7595d72fe', r: 'W7S53' });
            Memory.spawns[8].reactions[1].push({ m: 'UL', l: '583efb78aa680a7c04dc800d', r: 'W5S53' });

            Memory.spawns[8].reactions.push(new Array());
            Memory.spawns[8].reactions[2].push({ m: 'G', l: '583f4c70c93b13f77b3a696c' });
            Memory.spawns[8].reactions[2].push({ m: 'ZK', l: '5844c2509a1b04b7595d72fe', r: 'W7S53' });
            Memory.spawns[8].reactions[2].push({ m: 'UL', l: '583efb78aa680a7c04dc800d', r: 'W5S53' });

            Memory.spawns[8].reactions.push(new Array());
            Memory.spawns[8].reactions[3].push({ m: 'G', l: '583e66fa3b7e2e5c63508382' });
            Memory.spawns[8].reactions[3].push({ m: 'ZK', l: '5844c2509a1b04b7595d72fe', r: 'W7S53' });
            Memory.spawns[8].reactions[3].push({ m: 'UL', l: '583efb78aa680a7c04dc800d', r: 'W5S53' });

            //spawn 9
            //spawn numbers
            Memory.spawns[9].summon.spawns = 3;
            Memory.spawns[9].summon.h = 0;
            Memory.spawns[9].summon.b = 0;
            Memory.spawns[9].summon.u = 0;
            Memory.spawns[9].summon.h2 = 9;
            Memory.spawns[9].summon.b2 = 1;
            Memory.spawns[9].summon.u2 = 0;
            Memory.spawns[9].summon.users = 1;
            Memory.spawns[9].summon.atkM = 0;
            Memory.spawns[9].summon.atkR = 0;
            Memory.spawns[9].summon.atkH = 0;
            Memory.spawns[9].summon.atkD = 0;
            Memory.spawns[9].random.mainRoom = 'W4S57';

            Memory.spawns[9].random.useUpgradeSpots = true;
            Memory.spawns[9].random.upgradeSpots.push({ x: 19, y: 6 });
            Memory.spawns[9].random.upgradeSpots.push({ x: 19, y: 7 });
            Memory.spawns[9].random.upgradeSpots.push({ x: 19, y: 8 });
            Memory.spawns[9].random.upgradeSpots.push({ x: 19, y: 9 });

            ////RoomList
            Memory.spawns[9].random.rooms.push({ name: 'W4S57', spawn: 0 });
            if (!Memory.spawns[9].random.hostiles) {
                Memory.spawns[9].random.rooms.push({ name: 'W4S56', spawn: 4, sk: true });
                Memory.spawns[9].random.rooms.push({ name: 'W5S56', spawn: 5, sk: true });
                //Memory.spawns[9].random.rooms.push({ name: 'W2S55', spawn: 1 });
            }
            ////keeper
            if (!Memory.spawns[9].random.hostiles) {
                Memory.spawns[9].spots.push({ sourceRoom: 'W4S56', sk: true, x: 30, y: 48 });
                Memory.spawns[9].spots.push({ sourceRoom: 'W5S56', sk: true, x: 45, y: 48 });
                //Memory.spawns[9].spots.push({ sourceRoom: 'W2S55' });
            }
            //StoreId
            Memory.spawns[9].random.storeId = '584d13c4552196b578b0f8f4';
            //UseStore
            Memory.spawns[9].random.useStore = true;
            Memory.spawns[9].random.useLinks = true;
            Memory.spawns[9].links.receiver = '584d42738b42d50a6fcb7447';
            Memory.spawns[9].links.producers.push({ id: '584c08efbaf67c7774cd9234', source: true });
            Memory.spawns[9].links.producers.push({ id: '584c0b25f9108d3a1dd6f81b', source: true });
            //Memory.spawns[9].links.producers.push({ id: '57e924dce942a7843ffd2d79', source: true });
            //extractor
            Memory.spawns[9].random.extractor = '579fab88b1f02a3b0cff0341';
            Memory.spawns[9].random.terminal = '584cb297dc6a243227cfcc3d';
            Memory.spawns[9].random.nuker = '585b2ecc1d36722b5a33a404';
            Memory.spawns[9].random.defLab = '585ba9148fa31b1d59bc291f';
            Memory.spawns[9].random.powerSpawn = '585afbecdc277ecd3f408f1f';

            Memory.spawns[9].random.upgradeBoost = '';
            Memory.spawns[9].random.runReaction = true;

            //Memory.spawns[9].requests.push({ m: 'XGH2O', l: '584ccf25eeca75d04c9b6cf5', r: 'W4S59', r2: 'W9S52' });

            Memory.spawns[9].random.runReaction = true;
            Memory.spawns[9].random.runReactionL = { GH: 1000 };
            Memory.spawns[9].reactions = [];

            Memory.spawns[9].reactions.push(new Array());
            Memory.spawns[9].reactions[0].push({ m: 'GH', l: '584ccf25eeca75d04c9b6cf5' });
            Memory.spawns[9].reactions[0].push({ m: 'G', l: '584d90f7cd035d7e761c690c', r: 'W3S55' });
            Memory.spawns[9].reactions[0].push({ m: 'H', l: '584cf2ac4fe92ed70930e74c', r: 'W9S52' });

            Memory.spawns[9].reactions.push(new Array());
            Memory.spawns[9].reactions[1].push({ m: 'GH', l: '5854285e2d1317ff3dcdba89' });
            Memory.spawns[9].reactions[1].push({ m: 'G', l: '584d90f7cd035d7e761c690c', r: 'W3S55' });
            Memory.spawns[9].reactions[1].push({ m: 'H', l: '584cf2ac4fe92ed70930e74c', r: 'W9S52' });

            Memory.spawns[9].reactions.push(new Array());
            Memory.spawns[9].reactions[2].push({ m: 'GH', l: '585284c2888d20da115da811' });
            Memory.spawns[9].reactions[2].push({ m: 'G', l: '584d90f7cd035d7e761c690c', r: 'W3S55' });
            Memory.spawns[9].reactions[2].push({ m: 'H', l: '584cf2ac4fe92ed70930e74c', r: 'W9S52' });

            Memory.spawns[9].reactions.push(new Array());
            Memory.spawns[9].reactions[3].push({ m: 'GH', l: '58540709e37ea6341ca24090' });
            Memory.spawns[9].reactions[3].push({ m: 'G', l: '584d90f7cd035d7e761c690c', r: 'W3S55' });
            Memory.spawns[9].reactions[3].push({ m: 'H', l: '584cf2ac4fe92ed70930e74c', r: 'W9S52' });

            Memory.spawns[9].requests = [];

            Memory.spawns[9].requests.push({ m: 'XLHO2', l: '585b69f05ee520677509c5d5' });
            Memory.spawns[9].requests.push({ m: 'XZHO2', l: '585b4cd43546336847cc5259' });
            Memory.spawns[9].requests.push({ m: 'XGHO2', l: '585b893378963fb976605b53' });
            //spawn 10
            //spawn numbers
            Memory.spawns[10].summon.spawns = 0;
            Memory.spawns[10].summon.h = 0;
            Memory.spawns[10].summon.b = 0;
            Memory.spawns[10].summon.u = 0;
            Memory.spawns[10].summon.h2 = 0;
            Memory.spawns[10].summon.b2 = 0;
            Memory.spawns[10].summon.u2 = 0;
            Memory.spawns[10].summon.users = 0;
            Memory.spawns[10].summon.atkM = 0;
            Memory.spawns[10].summon.atkR = 0;
            Memory.spawns[10].summon.atkH = 0;
            Memory.spawns[10].summon.atkD = 0;
            Memory.spawns[10].random.mainRoom = 'W7S54';

            Memory.spawns[10].random.useUpgradeSpots = true;
            Memory.spawns[10].random.upgradeSpots.push({ x: 9, y: 16 });
            Memory.spawns[10].random.upgradeSpots.push({ x: 9, y: 17 });
            Memory.spawns[10].random.upgradeSpots.push({ x: 7, y: 15 });
            Memory.spawns[10].random.upgradeSpots.push({ x: 7, y: 16 });
            Memory.spawns[10].random.upgradeSpots.push({ x: 7, y: 17 });
            Memory.spawns[10].random.upgradeSpots.push({ x: 8, y: 15 });


            ////RoomList
            //Memory.spawns[10].random.rooms.push({ name: 'W7S54', spawn: 0 });
            //if (!Memory.spawns[10].random.hostiles) {
            //    //Memory.spawns[10].random.rooms.push({ name: 'W4S56', spawn: 4, sk: true });
            //    //  Memory.spawns[10].random.rooms.push({ name: 'W3S56', spawn: 1 });
            //    //Memory.spawns[10].random.rooms.push({ name: 'W2S55', spawn: 1 });
            //}
            //////keeper
            //if (!Memory.spawns[10].random.hostiles) {
            //    Memory.spawns[10].spots.push({ sourceRoom: 'W4S56', sk: true, x: 30, y: 48 });
            //    //  Memory.spawns[10].spots.push({ sourceRoom: 'W3S56' });
            //    //Memory.spawns[10].spots.push({ sourceRoom: 'W2S55' });
            //}
            //StoreId
            Memory.spawns[10].random.storeId = '5854d3ae769a2fbb7b91883f';
            //UseStore
            Memory.spawns[10].random.useStore = true;
            Memory.spawns[10].random.terminal = '5855a5f69eca72fd095f2296';
            //Memory.spawns[10].random.useLinks = true;
            //Memory.spawns[10].links.receiver = '584d42738b42d50a6fcb7447';
            //Memory.spawns[10].links.producers.push({ id: '584c08efbaf67c7774cd9234', source: true });
            //Memory.spawns[10].links.producers.push({ id: '584c0b25f9108d3a1dd6f81b', source: true });
            //Memory.spawns[10].links.producers.push({ id: '57e924dce942a7843ffd2d79', source: true });
            //extractor
            //Memory.spawns[10].random.extractor = '579fab88b1f02a3b0cff0341';
            //Memory.spawns[10].random.terminal = '584cb297dc6a243227cfcc3d';
            //Memory.spawns[10].random.defLab = '';
            Memory.spawns[10].random.upgradeBoost = '5843da58ad3ff4230eac6547';
            Memory.spawns[10].random.twr = '585483458fe084364e73b478';

            //spawn 11
            //spawn numbers
            Memory.spawns[11].summon.spawns = 3;
            Memory.spawns[11].summon.h = 0;
            Memory.spawns[11].summon.b = 0;
            Memory.spawns[11].summon.u = 0;
            Memory.spawns[11].summon.h2 = 10;
            Memory.spawns[11].summon.b2 = 1;
            Memory.spawns[11].summon.u2 = 0;
            Memory.spawns[11].summon.users = 1;
            Memory.spawns[11].summon.atkM = 0;
            Memory.spawns[11].summon.atkR = 0;
            Memory.spawns[11].summon.atkH = 0;
            Memory.spawns[11].summon.atkD = 0;
            Memory.spawns[11].random.mainRoom = 'W6S57';

            //Memory.spawns[11].random.useUpgradeSpots = true;
            //Memory.spawns[11].random.upgradeSpots.push({ x: 19, y: 6 });
            //Memory.spawns[11].random.upgradeSpots.push({ x: 19, y: 7 });
            //Memory.spawns[11].random.upgradeSpots.push({ x: 19, y: 8 });
            //Memory.spawns[11].random.upgradeSpots.push({ x: 19, y: 9 });

            ////RoomList
            Memory.spawns[11].random.rooms.push({ name: 'W6S57', spawn: 0 });
            if (!Memory.spawns[11].random.hostiles) {
                Memory.spawns[11].random.rooms.push({ name: 'W6S56', spawn: 4, sk: true });
                Memory.spawns[11].random.rooms.push({ name: 'W6S55', spawn: 7, sk: true });
            //    Memory.spawns[11].random.rooms.push({ name: 'W5S56', spawn: 6, sk: true });
            //    //Memory.spawns[11].random.rooms.push({ name: 'W2S55', spawn: 1 });
            }
            //keeper
            if (!Memory.spawns[11].random.hostiles) {
                Memory.spawns[11].spots.push({ sourceRoom: 'W6S56', sk: true, x: 36, y: 44 });
                Memory.spawns[11].spots.push({ sourceRoom: 'W6S55', sk: true, x: 36, y: 45 });
            //    Memory.spawns[11].spots.push({ sourceRoom: 'W5S56', sk: true, x: 45, y: 48 });
            //    //Memory.spawns[11].spots.push({ sourceRoom: 'W2S55' });
            }
            //StoreId
            Memory.spawns[11].random.storeId = '58681ea3791fa5ec6067d912';
            //UseStore
            Memory.spawns[11].random.useStore = true;
            Memory.spawns[11].random.useLinks = true;
            Memory.spawns[11].links.receiver = '5867d3660c8472706bc0d813';
            Memory.spawns[11].links.producers.push({ id: '586785fc3d7db5165dffce9f', source: true });
            Memory.spawns[11].links.producers.push({ id: '5867b69b4325d1927005fa2a', source: true });
            Memory.spawns[11].links.producers.push({ id: '5887b8a44926a7ee028791ef', source: true });
            Memory.spawns[11].links.producers.push({ id: '588914cdec9d31db50192a5b', source: true });
            Memory.spawns[11].links.producers.push({ id: '58979a116552a9c45e175a01', source: true });
            //extractor
            Memory.spawns[11].random.extractor = '579fab88b1f02a3b0cff0329';
            Memory.spawns[11].random.terminal = '5868f97fa3f3e25a3a98e49a';
            Memory.spawns[11].random.nuker = '5886ba35811551db25daf706';
            Memory.spawns[11].random.powerSpawn = '58870397399ba0e076a23bbb';
            //Memory.spawns[11].random.defLab = '';

            Memory.spawns[11].random.runReaction = true;

            //spawn 12
            //spawn numbers
            Memory.spawns[12].summon.spawns = 3;
            Memory.spawns[12].summon.h = 0;
            Memory.spawns[12].summon.b = 0;
            Memory.spawns[12].summon.u = 0;
            Memory.spawns[12].summon.h2 = 12;
            Memory.spawns[12].summon.b2 = 1;
            Memory.spawns[12].summon.u2 = 0;
            Memory.spawns[12].summon.users = 1;
            Memory.spawns[12].summon.atkM = 0;
            Memory.spawns[12].summon.atkR = 0;
            Memory.spawns[12].summon.atkH = 0;
            Memory.spawns[12].summon.atkD = 0;
            Memory.spawns[12].random.mainRoom = 'W3S65';

            //Memory.spawns[12].random.useUpgradeSpots = true;
            //Memory.spawns[12].random.upgradeSpots.push({ x: 19, y: 6 });
            //Memory.spawns[12].random.upgradeSpots.push({ x: 19, y: 7 });
            //Memory.spawns[12].random.upgradeSpots.push({ x: 19, y: 8 });
            //Memory.spawns[12].random.upgradeSpots.push({ x: 19, y: 9 });

            ////RoomList
            Memory.spawns[12].random.rooms.push({ name: 'W3S65', spawn: 0 });
            if (!Memory.spawns[12].random.hostiles) {
                Memory.spawns[12].random.rooms.push({ name: 'W3S64', spawn: 2 });
                Memory.spawns[12].random.rooms.push({ name: 'W4S65', spawn: 4, sk: true });
                Memory.spawns[12].random.rooms.push({ name: 'W4S66', spawn: 6, sk: true });
            //    //Memory.spawns[12].random.rooms.push({ name: 'W2S55', spawn: 1 });
            }
            //keeper
            if (!Memory.spawns[12].random.hostiles) {
                Memory.spawns[12].spots.push({ sourceRoom: 'W3S64' });
                Memory.spawns[12].spots.push({ sourceRoom: 'W4S65', sk: true, x: 45, y: 41 });
                Memory.spawns[12].spots.push({ sourceRoom: 'W4S66', sk: true, x: 47, y: 3 });
            //    //Memory.spawns[12].spots.push({ sourceRoom: 'W2S55' });
            }
            //StoreId
            Memory.spawns[12].random.storeId = '5877c130968df68d3edf074c';
            //UseStore
            Memory.spawns[12].random.useStore = true;
            Memory.spawns[12].random.useLinks = true;
            Memory.spawns[12].links.receiver = '5879e063b10f981109d838b5';
            Memory.spawns[12].links.producers.push({ id: '5879e0dfd2fa188006a26e43', source: true });
            Memory.spawns[12].links.producers.push({ id: '58818b07dbcaf12f157e6afe', source: true });
            Memory.spawns[12].links.producers.push({ id: '588d01f9e7a448d25ab73297', source: true });
            Memory.spawns[12].links.producers.push({ id: '589fcba2ed368f9b09a5018a', source: true });
            Memory.spawns[12].links.producers.push({ id: '589fc7912e57535b19a69517', source: true });
            //extractor
            Memory.spawns[12].random.extractor = '57efa00f195b160f02c75271';
            Memory.spawns[12].random.terminal = '5881814e1d2b37eb52928e1c';
            Memory.spawns[12].random.nuker = '589f16f9ac9ae5f1593f2c52';
            Memory.spawns[12].random.powerSpawn = '589f63396e21f329598a5bff';
            //Memory.spawns[12].random.defLab = '';
            Memory.spawns[12].random.runReaction = true;

            //spawn 13
            //spawn numbers
            Memory.spawns[13].summon.spawns = 3;
            Memory.spawns[13].summon.h = 0;
            Memory.spawns[13].summon.b = 0;
            Memory.spawns[13].summon.u = 0;
            Memory.spawns[13].summon.h2 = 9;
            Memory.spawns[13].summon.b2 = 1;
            Memory.spawns[13].summon.u2 = 0;
            Memory.spawns[13].summon.users = 1;
            Memory.spawns[13].summon.atkM = 0;
            Memory.spawns[13].summon.atkR = 0;
            Memory.spawns[13].summon.atkH = 0;
            Memory.spawns[13].summon.atkD = 0;
            Memory.spawns[13].random.mainRoom = 'W4S63';

            //Memory.spawns[13].random.useUpgradeSpots = true;
            //Memory.spawns[13].random.upgradeSpots.push({ x: 19, y: 6 });
            //Memory.spawns[13].random.upgradeSpots.push({ x: 19, y: 7 });
            //Memory.spawns[13].random.upgradeSpots.push({ x: 19, y: 8 });
            //Memory.spawns[13].random.upgradeSpots.push({ x: 19, y: 9 });

            ////RoomList
            Memory.spawns[13].random.rooms.push({ name: 'W4S63', spawn: 0 });
            if (!Memory.spawns[13].random.hostiles) {
                Memory.spawns[13].random.rooms.push({ name: 'W4S64', spawn: 4, sk: true });
                Memory.spawns[13].random.rooms.push({ name: 'W5S64', spawn: 5, sk: true });
            }
            //keeper
            if (!Memory.spawns[13].random.hostiles) {
                Memory.spawns[13].spots.push({ sourceRoom: 'W4S64', sk: true, x: 19, y: 4 });
                Memory.spawns[13].spots.push({ sourceRoom: 'W5S64', sk: true, x: 38, y: 19 });
            }
            //StoreId
            Memory.spawns[13].random.storeId = '5895cb9158b0c00cfee56a21';
            //UseStore
            Memory.spawns[13].random.useStore = true;
            Memory.spawns[13].random.useLinks = true;
            Memory.spawns[13].links.receiver = '5896272dea74d78e49c16429';
            Memory.spawns[13].links.producers.push({ id: '589597ab932aff8c32ba4091', source: true });
            Memory.spawns[13].links.producers.push({ id: '5898421cc99eb8021bd79bf7', source: true });
            Memory.spawns[13].links.producers.push({ id: '58984792657aa406041707fe', source: true });
            Memory.spawns[13].links.producers.push({ id: '58ad2ad7409a68795fcbd526', source: true });
            Memory.spawns[13].links.producers.push({ id: '58ad264cc1c44127da56eb9f', source: true });
            Memory.spawns[13].random.nuker = '58ac93648cb05c1f1cf625e1';
            Memory.spawns[13].random.powerSpawn = '58ac53462662fb7f072adaf8';
            //extractor
            Memory.spawns[13].random.extractor = '57efa00f195b160f02c75260';
            Memory.spawns[13].random.terminal = '58979be547e421722ca20f45';
            //Memory.spawns[13].random.defLab = '';
            Memory.spawns[13].random.runReaction = true;


            //spawn 14
            //spawn numbers
            Memory.spawns[14].summon.spawns = 2;
            Memory.spawns[14].summon.h = 0;
            Memory.spawns[14].summon.b = 0;
            Memory.spawns[14].summon.u = 0;
            Memory.spawns[14].summon.h2 = 5;
            Memory.spawns[14].summon.b2 = 1;
            Memory.spawns[14].summon.u2 = 0;
            Memory.spawns[14].summon.users = 1;
            Memory.spawns[14].summon.atkM = 0;
            Memory.spawns[14].summon.atkR = 0;
            Memory.spawns[14].summon.atkH = 0;
            Memory.spawns[14].summon.atkD = 0;
            Memory.spawns[14].random.mainRoom = 'W7S64';

            Memory.spawns[14].random.useUpgradeSpots = true;
            Memory.spawns[14].random.upgradeSpots.push({ x: 9, y: 28 });
            Memory.spawns[14].random.upgradeSpots.push({ x: 8, y: 28 });
            Memory.spawns[14].random.upgradeSpots.push({ x: 7, y: 28 });
            Memory.spawns[14].random.upgradeSpots.push({ x: 6, y: 28 });

            ////RoomList
            Memory.spawns[14].random.rooms.push({ name: 'W7S64', spawn: 0 });
            if (!Memory.spawns[14].random.hostiles) {
                Memory.spawns[14].random.rooms.push({ name: 'W8S64', spawn: 1 });
                Memory.spawns[14].random.rooms.push({ name: 'W6S64', spawn: 4, sk: true });
            }
            //keeper
            if (!Memory.spawns[14].random.hostiles) {
                Memory.spawns[14].spots.push({ sourceRoom: 'W8S64' });
                Memory.spawns[14].spots.push({ sourceRoom: 'W6S64', sk: true, x: 12, y: 23 });
            }
            //StoreId
            Memory.spawns[14].random.storeId = '5895bff74af485bb71594d5b';
            //UseStore
            Memory.spawns[14].random.useStore = true;
            Memory.spawns[14].random.useLinks = true;
            Memory.spawns[14].links.receiver = '5896f0f332fcbc4011fd36db';
            Memory.spawns[14].links.receiverC = '589753458f96db400597b731';
            Memory.spawns[14].links.producers.push({ id: '589ed8f00604f31c2a41d216', source: true });
            Memory.spawns[14].links.producers.push({ id: '58b005ba595900f44b9be06d', source: true });
            //Memory.spawns[14].links.producers.push({ id: '57e924dce942a7843ffd2d79', source: true });
            //extractor
            Memory.spawns[14].random.extractor = '57efa00f195b160f02c7523a';
            Memory.spawns[14].random.terminal = '589f84138c0ecd715df0a840';
            //Memory.spawns[14].random.defLab = '';

            //spawn 15
            //spawn numbers
            Memory.spawns[15].summon.spawns = 1;
            Memory.spawns[15].summon.h = 0;
            Memory.spawns[15].summon.b = 0;
            Memory.spawns[15].summon.u = 0;
            Memory.spawns[15].summon.h2 = 0;
            Memory.spawns[15].summon.b2 = 0;
            Memory.spawns[15].summon.u2 = 0;
            Memory.spawns[15].summon.users = 1;
            Memory.spawns[15].summon.atkM = 0;
            Memory.spawns[15].summon.atkR = 0;
            Memory.spawns[15].summon.atkH = 0;
            Memory.spawns[15].summon.atkD = 0;
            Memory.spawns[15].random.mainRoom = 'W6S67';

            //Memory.spawns[15].random.useUpgradeSpots = true;
            //Memory.spawns[15].random.upgradeSpots.push({ x: 9, y: 28 });
            //Memory.spawns[15].random.upgradeSpots.push({ x: 8, y: 28 });
            //Memory.spawns[15].random.upgradeSpots.push({ x: 7, y: 28 });
            //Memory.spawns[15].random.upgradeSpots.push({ x: 6, y: 28 });

            ////RoomList
            Memory.spawns[15].random.rooms.push({ name: 'W6S67', spawn: 0 });
            //if (!Memory.spawns[15].random.hostiles) {
            //    Memory.spawns[15].random.rooms.push({ name: 'W8S64', spawn: 1 });
            //    //    //Memory.spawns[15].random.rooms.push({ name: 'W2S55', spawn: 1 });
            //}
            //keeper
            //if (!Memory.spawns[15].random.hostiles) {
            //    Memory.spawns[15].spots.push({ sourceRoom: 'W8S64' });
            //    //    //Memory.spawns[15].spots.push({ sourceRoom: 'W2S55' });
            //}
            //StoreId
            //Memory.spawns[15].random.storeId = '5895bff74af485bb71594d5b';
            //UseStore
            Memory.spawns[15].random.useStore = false;
            Memory.spawns[15].random.useLinks = false;
            //Memory.spawns[15].links.receiver = '5896f0f332fcbc4011fd36db';
            //Memory.spawns[15].links.receiverC = '589753458f96db400597b731';
            //Memory.spawns[15].links.producers.push({ id: '589ed8f00604f31c2a41d216', source: true });
            //Memory.spawns[15].links.producers.push({ id: '5867b69b4325d1927005fa2a', source: true });
            //Memory.spawns[15].links.producers.push({ id: '57e924dce942a7843ffd2d79', source: true });
            //extractor
            //Memory.spawns[15].random.extractor = '57efa00f195b160f02c7523a';
            //Memory.spawns[15].random.terminal = '589f84138c0ecd715df0a840';
            //Memory.spawns[15].random.defLab = '';



            if (Game.rooms['W7S54'].controller.level < 6) {
                Memory.spawns[0].random.overflow = 'W7S53';
                Memory.spawns[1].random.overflow = 'W7S53';
                Memory.spawns[2].random.overflow = 'W7S53';
                Memory.spawns[3].random.overflow = 'W7S53';
                Memory.spawns[4].random.overflow = 'W7S53';
                Memory.spawns[5].random.overflow = 'W7S53';
                Memory.spawns[6].random.overflow = 'W7S53';
                Memory.spawns[7].random.overflow = 'W7S53';
                Memory.spawns[8].random.overflow = 'W7S53';
                Memory.spawns[9].random.overflow = 'W7S53';
                Memory.spawns[11].random.overflow = 'W7S53';
                Memory.spawns[12].random.overflow = 'W7S53';
                Memory.spawns[13].random.overflow = 'W7S64';
            }
            else {
                Memory.spawns[0].random.overflow = 'W7S54';
                Memory.spawns[1].random.overflow = 'W7S54';
                Memory.spawns[2].random.overflow = 'W7S54';
                Memory.spawns[3].random.overflow = 'W7S54';
                Memory.spawns[4].random.overflow = 'W7S54';
                Memory.spawns[5].random.overflow = 'W7S54';
                Memory.spawns[6].random.overflow = 'W7S54';
                Memory.spawns[7].random.overflow = 'W7S54';
                Memory.spawns[8].random.overflow = 'W7S54';
                Memory.spawns[9].random.overflow = 'W7S54';
                Memory.spawns[11].random.overflow = 'W7S54';
                Memory.spawns[12].random.overflow = 'W7S54';
                Memory.spawns[13].random.overflow = 'W7S54';

            }

        }

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

        let terminal = Game.getObjectById(Memory.spawns[a].random.terminal);
        if (terminal) {
            var total = _.sum(terminal.store);
            if (total > 100000) {
                var maxTransferEnergyCost = terminal.store.energy;
                for (var resource in terminal.store) {
                    if (resource != 'energy' && terminal.store[resource] > 100000) {
                        var amountToSell = 4000;

                        var orders = Game.market.getAllOrders(order => order.resourceType == resource &&
                            order.type == ORDER_BUY && order.price > 0.09);

                        if (orders.length) {
                            orders = _.sortBy(orders, order => order.price - Game.market.calcTransactionCost(100, Memory.spawns[a].random.mainRoom, order.roomName) * 0.05 / 100);
                            Game.market.deal(orders[orders.length - 1].id, amountToSell, Memory.spawns[a].random.mainRoom);
                            //Game.notify(Game.market.deal(orders[0].id, amountToSell, Memory.spawns[spawn].random.mainRoom));
                            //Game.notify(amountToSell + " " + resource + " " + orders[0].id + " " + Memory.spawns[spawn].random.mainRoom + " " + Memory.spawns[spawn].random.terminal.store.energy);
                        }
                    }
                }
            }
            let store = Game.getObjectById(Memory.spawns[a].random.storeId);
            let powerSpawn = Game.getObjectById(Memory.spawns[a].random.powerSpawn);
            if (store && powerSpawn && store.store['energy'] > 400000 && !terminal.store.power) {
                for (let myRooms2 = 0, length2 = Memory.global.roomCount; myRooms2 < length2; myRooms2++) {
                    let terminal2 = Game.getObjectById(Memory.spawns[myRooms2].random.terminal);
                    if (terminal2 && terminal2.store.power > 2000)
                        terminal2.send(RESOURCE_POWER, 2000, Memory.spawns[a].random.mainRoom, null);
                }
            }
        }
        

    }
};

module.exports = roleSetup;