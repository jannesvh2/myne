var roleCreateJSON = {

    /** @param {Creep} creep **/
    run: function () {
        Memory.spawns = [];
        Memory.spawns = new Array[2] = {};
        //spawn numbers
        Memory.spawns[0].summon.h2 = 2;
        Memory.spawns[0].summon.b2 = 1;
        Memory.spawns[0].summon.u2 = 1;
        Memory.spawns[0].summon.atk = 0;

        //current creeps
        Memory.spawns[0].creeps.harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.spawn == 1);
        Memory.spawns[0].creeps.harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2' && creep.memory.spawn == 1);
        Memory.spawns[0].creeps.builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.spawn == 1);
        Memory.spawns[0].creeps.builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2' && creep.memory.spawn == 1);
        Memory.spawns[0].creeps.upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.spawn == 1);
        Memory.spawns[0].creeps.upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2' && creep.memory.spawn == 1);
        Memory.spawns[0].creeps.stores = _.filter(Game.creeps, (creep) => creep.memory.role == 'store' && creep.memory.spawn == 1);
        Memory.spawns[0].creeps.attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker' && creep.memory.spawn == 1);
        Memory.spawns[0].creeps.scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout' && creep.memory.spawn == 1);

        if (!Memory.spawns[0].counters.upgradeTicks)
            Memory.spawns[0].counters.upgradeTicks = 0;

        if (!Memory.spawns[0].counters.roomTicks)
            Memory.spawns[0].counters.roomTicks = 0;

        Memory.spawns[0].counters.upgradeTicks++;
        Memory.spawns[0].counters.roomTicks++;
        if (!Memory.spawns[0].counters.repairLimit)
            Memory.spawns[0].counters.repairLimit = 100000;
        

        //keepers
        Memory.spawns[0].spots = [];
        Memory.spawns[0].spots.push({ x: '41', y: '48', sourceRoom: 'W59S28' });

        //var links = _.filter(Game.creeps, (creep) => creep.memory.role == 'link');
        //Memory.linkSource = [];
        //Memory.linkSource.push({ id: '579fa86e0700be0674d2d990', sourceRoom: 'W58S29' });
        //if (Memory.linkSource.length) {
        //var LinkFrom = Game.getObjectById('');
        //if(LinkFrom.energy != 0)
        //LinkFrom.transferEnergy(Game.getObjectById(''));
        //}

        //Memory.spots.push({ x: '6', y: '41', sourceRoom: 'W58S28' });

        Memory.spawns[0].sources.sources = [];
        Memory.spawns[0].store = [];
        var roomSources = [];
        Memory.spawns[0].counters.avgAtSource = {};
        Memory.spawns[0].counters.atSources = {};
        //add memory for all sources
        for (var myRooms in Game.rooms) {
            if (myRooms == 'W58S29' || myRooms == 'W59S28' || myRooms == 'W58S28') {
                roomSources = Game.rooms[myRooms].find(FIND_SOURCES);
                for (var a = 0, length = roomSources.length; a < length; a++) {
                    Memory.spawns[0].sources.sources.push(roomSources[a]);

                }
            }
        }

        roomSources = Game.rooms[W58S29].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        });
        for (var a = 0, length = roomSources.length; a < length; a++) {
            Memory.spawns[0].store.push({ container: roomSources[a], energyUsed: 0 });
        }

        for (var s = 0, length = sources.length; s < length; s++) {
            if (!Memory.spawns[0].sources.history[sources[s].id])
                Memory.spawns[0].sources.history[sources[s].id] = 0;
            //Memory[sources[s].id] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            Memory.spawns[0].sources.atSources[sources[s].id] = 0;
            Memory.spawns[0].sources.avgAtSource[sources[s].id] = Memory[sources[s].id];
        }

    }
};

module.exports = roleCreateJSON;