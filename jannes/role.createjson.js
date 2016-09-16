var roleCreateJSON = {

    /** @param {Creep} creep **/
    run: function () {

        //clearing memory of non existing creeps
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        if (!Memory.spawns) {
            Memory.spawns = [];
            Memory.spawns.push(new Object());
            Memory.spawns.push(new Object());
        }

        //spawn1

        if (!Memory.spawns[0].summon)
            Memory.spawns[0].summon = {};
        if (!Memory.spawns[0].random)
            Memory.spawns[0].random = {};
        Memory.spawns[0].random.rooms = [];
        if (!Memory.spawns[0].random.defenders)
            Memory.spawns[0].random.defenders = [];
        Memory.spawns[0].spots = [];

        //spawn numbers
        Memory.spawns[0].summon.h2 = 2;
        Memory.spawns[0].summon.b2 = 2;
        Memory.spawns[0].summon.u2 = 1;
        Memory.spawns[0].summon.atk = 0;
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
        Memory.spawns[0].random.extractor = '57db0899bcfa28e331b04f6f';
        Memory.spawns[0].random.terminal = '57dc6e2fe2d7cc5a33ae4da2';

        //current creeps
        if (!Memory.spawns[0].creeps)
            Memory.spawns[0].creeps = {};
        Memory.spawns[0].creeps.harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.spawn == 0);
        Memory.spawns[0].creeps.harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2' && creep.memory.spawn == 0);
        Memory.spawns[0].creeps.builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.spawn == 0);
        Memory.spawns[0].creeps.builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2' && creep.memory.spawn == 0);
        Memory.spawns[0].creeps.upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.spawn == 0);
        Memory.spawns[0].creeps.upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2' && creep.memory.spawn == 0);
        Memory.spawns[0].creeps.stores = _.filter(Game.creeps, (creep) => creep.memory.role == 'store' && creep.memory.spawn == 0);
        Memory.spawns[0].creeps.attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker' && creep.memory.spawn == 0);
        Memory.spawns[0].creeps.scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout' && creep.memory.spawn == 0);
        Memory.spawns[0].creeps.defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender' && creep.memory.spawn == 0);







        if (!Memory.spawns[0].counters)
            Memory.spawns[0].counters = {};
        if (!Memory.spawns[0].counters.upgradeTicks)
            Memory.spawns[0].counters.upgradeTicks = 0;

        if (!Memory.spawns[0].counters.roomTicks)
            Memory.spawns[0].counters.roomTicks = 0;

        Memory.spawns[0].counters.upgradeTicks++;
        Memory.spawns[0].counters.roomTicks++;

        if (!Memory.spawns[0].counters.repairLimit)
            Memory.spawns[0].counters.repairLimit = 100000;
        if (Memory.spawns[0].counters.repairLimit > 300000)
            Memory.spawns[0].counters.repairLimit = 100000;


        //keepers


        //var links = _.filter(Game.creeps, (creep) => creep.memory.role == 'link');
        //Memory.linkSource = [];
        //Memory.linkSource.push({ id: '579fa86e0700be0674d2d990', sourceRoom: 'W58S29' });
        //if (Memory.linkSource.length) {
        //var LinkFrom = Game.getObjectById('');
        //if(LinkFrom.energy != 0)
        //LinkFrom.transferEnergy(Game.getObjectById(''));
        //}

        //Memory.spots.push({ x: '6', y: '41', sourceRoom: 'W58S28' });
        Memory.spawns[0].sources = [];

        Memory.spawns[0].store = [];

        var roomSources = [];
        var roomContainers = [];
        if (!Memory.spawns[0].counters.avgAtSource)
            Memory.spawns[0].counters.avgAtSource = {};
        if (!Memory.spawns[0].counters.atSources)
            Memory.spawns[0].counters.atSources = {};
        //add memory for all sources
        for (let myRooms = 0, length = Memory.spawns[0].random.rooms.length; myRooms < length; myRooms++) {
            if (Game.rooms[Memory.spawns[0].random.rooms[myRooms]]) {
                roomSources = Game.rooms[Memory.spawns[0].random.rooms[myRooms]].find(FIND_SOURCES);
                for (let a = 0, length = roomSources.length; a < length; a++) {
                    Memory.spawns[0].sources.push(roomSources[a]);
                }
                roomContainers = roomContainers.concat(Game.rooms[Memory.spawns[0].random.rooms[myRooms]].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 500);
                    }
                }))
            }
        }
        var creeps = Memory.spawns[0].creeps.harvesters2.concat(Memory.spawns[0].creeps.builders2);

        var counter = 0;
        for (let a = 0, length = roomContainers.length; a < length; a++) {
            Memory.spawns[0].store.push(roomContainers[a]);
            for (let b = 0, length2 = creeps.length; b < length2; b++) {
                if (creeps[b].memory.sourceId && creeps[b].memory.sourceId == Memory.spawns[0].store[a - counter].id) {
                    Memory.spawns[0].store.splice(a - counter, 1);
                    counter++;
                    break;
                }

            }

        }
        Memory.spawns[0].store.sort(function (a, b) {
            return b.store.energy - a.store.energy;
        });


        if (!Memory.spawns[0].counters.history)
            Memory.spawns[0].counters.history = {};
        for (let s = 0, length = Memory.spawns[0].sources.length; s < length; s++) {
            if (!Memory.spawns[0].counters.history[Memory.spawns[0].sources[s].id])
                Memory.spawns[0].counters.history[Memory.spawns[0].sources[s].id] = 0;
            //Memory[sources[s].id] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            Memory.spawns[0].counters.atSources[Memory.spawns[0].sources[s].id] = 0;
            Memory.spawns[0].counters.avgAtSource[Memory.spawns[0].sources[s].id] = Memory.spawns[0].counters.history[Memory.spawns[0].sources[s].id];
        }





        //spawn2

        if (!Memory.spawns[1].summon)
            Memory.spawns[1].summon = {};
        if (!Memory.spawns[1].random)
            Memory.spawns[1].random = {};
        Memory.spawns[1].random.rooms = [];
        if (!Memory.spawns[1].random.defenders)
            Memory.spawns[1].random.defenders = [];
        Memory.spawns[1].spots = [];

        //spawn numbers
        Memory.spawns[1].summon.h = 0;
        Memory.spawns[1].summon.b = 0;
        Memory.spawns[1].summon.u = 0;
        Memory.spawns[1].summon.h2 = 4;
        Memory.spawns[1].summon.b2 = 2;
        Memory.spawns[1].summon.u2 = 1;
        Memory.spawns[1].summon.atk = 0;
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



        //current creeps
        if (!Memory.spawns[1].creeps)
            Memory.spawns[1].creeps = {};
        Memory.spawns[1].creeps.harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.spawn == 1);
        Memory.spawns[1].creeps.harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2' && creep.memory.spawn == 1);
        Memory.spawns[1].creeps.builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.spawn == 1);
        Memory.spawns[1].creeps.builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2' && creep.memory.spawn == 1);
        Memory.spawns[1].creeps.upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.spawn == 1);
        Memory.spawns[1].creeps.upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2' && creep.memory.spawn == 1);
        Memory.spawns[1].creeps.stores = _.filter(Game.creeps, (creep) => creep.memory.role == 'store' && creep.memory.spawn == 1);
        Memory.spawns[1].creeps.attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker' && creep.memory.spawn == 1);
        Memory.spawns[1].creeps.scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout' && creep.memory.spawn == 1);
        Memory.spawns[1].creeps.defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender' && creep.memory.spawn == 1);




        if (!Memory.spawns[1].counters)
            Memory.spawns[1].counters = {};
        if (!Memory.spawns[1].counters.upgradeTicks)
            Memory.spawns[1].counters.upgradeTicks = 0;

        if (!Memory.spawns[1].counters.roomTicks)
            Memory.spawns[1].counters.roomTicks = 0;

        Memory.spawns[1].counters.upgradeTicks++;
        Memory.spawns[1].counters.roomTicks++;

        if (!Memory.spawns[1].counters.repairLimit)
            Memory.spawns[1].counters.repairLimit = 100000;
        if (Memory.spawns[1].counters.repairLimit > 300000)
            Memory.spawns[1].counters.repairLimit = 100000;


        Memory.spawns[1].sources = [];

        Memory.spawns[1].store = [];

        var roomSources = [];
        var roomContainers = [];
        if (!Memory.spawns[1].counters.avgAtSource)
            Memory.spawns[1].counters.avgAtSource = {};
        if (!Memory.spawns[1].counters.atSources)
            Memory.spawns[1].counters.atSources = {};
        //add memory for all sources
        for (let myRooms = 0, length = Memory.spawns[1].random.rooms.length; myRooms < length; myRooms++) {
            if (Game.rooms[Memory.spawns[1].random.rooms[myRooms]]) {
                roomSources = Game.rooms[Memory.spawns[1].random.rooms[myRooms]].find(FIND_SOURCES);
                for (let a = 0, length = roomSources.length; a < length; a++) {
                    Memory.spawns[1].sources.push(roomSources[a]);
                }
                roomContainers = roomContainers.concat(Game.rooms[Memory.spawns[1].random.rooms[myRooms]].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 500);
                    }
                }))
            }
        }

        var creeps = Memory.spawns[1].creeps.harvesters2.concat(Memory.spawns[1].creeps.builders2);
        var counter = 0;
        for (let a = 0, length = roomContainers.length; a < length; a++) {
            Memory.spawns[1].store.push(roomContainers[a]);
            for (let b = 0, length2 = creeps.length; b < length2; b++) {
                if (creeps[b].memory.sourceId && creeps[b].memory.sourceId == Memory.spawns[1].store[a - counter].id) {
                    Memory.spawns[1].store.splice(a - counter, 1);
                    counter++;
                    break;
                }

            }

        }
        Memory.spawns[1].store.sort(function (a, b) {
            return b.store.energy - a.store.energy;
        });

        if (!Memory.spawns[1].counters.history)
            Memory.spawns[1].counters.history = {};
        for (let s = 0, length = Memory.spawns[1].sources.length; s < length; s++) {
            if (!Memory.spawns[1].counters.history[Memory.spawns[1].sources[s].id])
                Memory.spawns[1].counters.history[Memory.spawns[1].sources[s].id] = 0;
            //Memory[sources[s].id] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            Memory.spawns[1].counters.atSources[Memory.spawns[1].sources[s].id] = 0;
            Memory.spawns[1].counters.avgAtSource[Memory.spawns[1].sources[s].id] = Memory.spawns[1].counters.history[Memory.spawns[1].sources[s].id];
        }


    }
};

module.exports = roleCreateJSON;