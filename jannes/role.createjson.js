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
        var rooms = 2;
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
                Memory.spawns[a].counters.repairLimit = 10000;
                Memory.spawns[a].counters.avgAtSource = {};
                Memory.spawns[a].counters.atSources = {};
                Memory.spawns[a].repairHp = {};
                Memory.spawns[a].repairHpHistory = {};
            }

            //reset for changes
            Memory.spawns[a].random.rooms = [];
            Memory.spawns[a].spots = [];
            Memory.spawns[a].sources = [];
            Memory.spawns[a].store = [];

            //ticks
            Memory.spawns[a].counters.upgradeTicks++;
            Memory.spawns[a].counters.roomTicks++;

            //repair reset if its to high
            if (Memory.spawns[a].counters.repairLimit > 5000000)
                Memory.spawns[a].counters.repairLimit = 10000;

            //current creeps
            Memory.spawns[a].creeps.harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.spawn == a);
            Memory.spawns[a].creeps.harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2' && creep.memory.spawn == a);
            Memory.spawns[a].creeps.builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.spawn == a);
            Memory.spawns[a].creeps.builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2' && creep.memory.spawn == a);
            Memory.spawns[a].creeps.upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.spawn == a);
            Memory.spawns[a].creeps.upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2' && creep.memory.spawn == a);
            Memory.spawns[a].creeps.stores = _.filter(Game.creeps, (creep) => creep.memory.role == 'store' && creep.memory.spawn == a);
            Memory.spawns[a].creeps.attackersM = _.filter(Game.creeps, (creep) => creep.memory.role == 'attackerM' && creep.memory.spawn == a);
            Memory.spawns[a].creeps.attackersR = _.filter(Game.creeps, (creep) => creep.memory.role == 'attackerR' && creep.memory.spawn == a);
            Memory.spawns[a].creeps.scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout' && creep.memory.spawn == a);
            Memory.spawns[a].creeps.defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender' && creep.memory.spawn == a);
        }


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //spawn 0
        //spawn numbers
        Memory.spawns[0].summon.h2 = 4;
        Memory.spawns[0].summon.b2 = 1;
        Memory.spawns[0].summon.u2 = 1;
        Memory.spawns[0].summon.atkM = 0;
        Memory.spawns[0].summon.atkR = 0;
        Memory.spawns[0].random.mainRoom = 'W59S29';
        //RoomList
        Memory.spawns[0].random.rooms.push('W59S29');
        Memory.spawns[0].random.rooms.push('W59S28');
        Memory.spawns[0].random.rooms.push('W58S28');
        //keeper
        Memory.spawns[0].spots.push({ sourceRoom: 'W59S28' });
        Memory.spawns[0].spots.push({ sourceRoom: 'W58S28' });
        //StoreId
        Memory.spawns[0].random.storeId = '57d57cd3636e2e351c38d6fe';
        //UseStore
        Memory.spawns[0].random.useStore = true;
        //extractor
        Memory.spawns[0].random.extractor = '579fab82b1f02a3b0cfefd9a';
        Memory.spawns[0].random.terminal = Game.rooms[Memory.spawns[0].random.mainRoom].terminal;

        //spawn 1
        //spawn numbers
        Memory.spawns[1].summon.h = 0;
        Memory.spawns[1].summon.b = 0;
        Memory.spawns[1].summon.u = 0;
        Memory.spawns[1].summon.h2 = 5;
        Memory.spawns[1].summon.b2 = 1;
        Memory.spawns[1].summon.u2 = 1;
        Memory.spawns[1].summon.atkM = 0;
        Memory.spawns[1].summon.atkR = 0;
        Memory.spawns[1].random.mainRoom = 'W56S28';
        //RoomList
        Memory.spawns[1].random.rooms.push('W56S28');
        Memory.spawns[1].random.rooms.push('W57S28');
        Memory.spawns[1].random.rooms.push('W57S27');
        //keeper
        Memory.spawns[1].spots.push({ sourceRoom: 'W57S28' });
        Memory.spawns[1].spots.push({ sourceRoom: 'W57S27' });
        //StoreId
        Memory.spawns[1].random.storeId = '57db65810f3c649e5b7c3d2d';
        //UseStore
        Memory.spawns[1].random.useStore = true;
        //extractor
        //Memory.spawns[1].random.extractor = '579fab82b1f02a3b0cfefd9a';
        //Memory.spawns[1].random.terminal = Game.rooms[Memory.spawns[1].random.mainRoom].terminal;

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        for (let a = 0; a < rooms; a++) {
            //non Memory var
            var roomSources = [];
            var roomContainers = [];

            //add memory for all sources and containers
            for (let myRooms = 0, length = Memory.spawns[a].random.rooms.length; myRooms < length; myRooms++) {
                if (Game.rooms[Memory.spawns[a].random.rooms[myRooms]]) {
                    roomSources = Game.rooms[Memory.spawns[a].random.rooms[myRooms]].find(FIND_SOURCES);
                    for (let b = 0, length2 = roomSources.length; b < length2; b++) {
                        Memory.spawns[a].sources.push(roomSources[b]);
                    }
                    roomContainers = roomContainers.concat(Game.rooms[Memory.spawns[a].random.rooms[myRooms]].find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER
                                //&& structure.store.energy > 500
                                );
                        }
                    }))
                }
            }
            //remove containers with a creep on the way
            var creeps = Memory.spawns[a].creeps.harvesters2.concat(Memory.spawns[a].creeps.builders2);
            var counter = 0;
            for (let b = 0, length = roomContainers.length; b < length; b++) {
                Memory.spawns[a].store.push(roomContainers[b]);
                for (let c = 0, length2 = creeps.length; c < length2; c++) {
                    if (creeps[c].memory.sourceId && creeps[c].memory.sourceId == Memory.spawns[a].store[b - counter].id) {
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
            if (!Memory.spawns[a].counters.history)
                Memory.spawns[a].counters.history = {};
            for (let s = 0, length = Memory.spawns[a].sources.length; s < length; s++) {
                if (!Memory.spawns[a].counters.history[Memory.spawns[a].sources[s].id])
                    Memory.spawns[a].counters.history[Memory.spawns[a].sources[s].id] = 0;
                //Memory[sources[s].id] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                Memory.spawns[a].counters.atSources[Memory.spawns[a].sources[s].id] = 0;
                Memory.spawns[a].counters.avgAtSource[Memory.spawns[a].sources[s].id] = Memory.spawns[a].counters.history[Memory.spawns[a].sources[s].id];
            }

            //repair
            for (let his in Memory.spawns[a].repairHpHistory) {
                let repObj = Game.getObjectById(Memory.spawns[a].repairHpHistory[his]).hits;
                if (repObj > Memory.spawns[a].repairHp[his])
                    Memory.spawns[a].repairHp[his] = hits;
            }
            Memory.spawns[a].repairHpHistory = [];
        }
    }
};

module.exports = roleCreateJSON;