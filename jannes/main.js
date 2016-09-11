var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSpawn = require('role.spawn');
var roleTower = require('role.tower');
var roleLogging = require('role.logging');
var roleAttackers = require('role.attackers');
var rolePath = require('role.path2');
var roleKeeper = require('role.keeper');
var roleStore = require('role.store');

module.exports.loop = function () {
    PathFinder.use(true);
    var h = 0;
    var h2 = 2
    var b = 0;
    var b2 = 1;
    var u = 0;
    var u2 = 3;
    var atk = 0;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2');
    var stores = _.filter(Game.creeps, (creep) => creep.memory.role == 'store');

    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
    //var links = _.filter(Game.creeps, (creep) => creep.memory.role == 'link');

    Memory.spots = [];
    Memory.spots.push({ x: '10', y: '45', sourceRoom: 'W59S28' });
    //Memory.linkSource = [];
    //Memory.linkSource.push({ id: '579fa86e0700be0674d2d990', sourceRoom: 'W58S29' });
    //if (Memory.linkSource.length) {
        //var LinkFrom = Game.getObjectById('');
        //if(LinkFrom.energy != 0)
        //LinkFrom.transferEnergy(Game.getObjectById(''));
    //}

    //Memory.spots.push({ x: '6', y: '41', sourceRoom: 'W58S28' });

    var sources = [];
    Memory.store = [];
    var roomSources = [];
    Memory.avgAtSource = {};
    Memory.atSources = {};
    //add memory for all sources
    for (var myRooms in Game.rooms) {
        if (myRooms != 'W58S29') {
            roomSources = Game.rooms[myRooms].find(FIND_SOURCES);
            for (var a = 0, length = roomSources.length; a < length; a++) {
                sources.push(roomSources[a]);

            }
        }
    }
    for (var myRooms in Game.rooms) {
        roomSources = Game.rooms[myRooms].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        });
            for (var a = 0, length = roomSources.length; a < length; a++) {
                Memory.store.push({container : roomSources[a], energyUsed: 0});
        }
    }

    for (var s = 0, length = sources.length; s < length; s++) {
        if (!Memory[sources[s].id])
            Memory[sources[s].id] = 0;
            //Memory[sources[s].id] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        Memory.atSources[sources[s].id] = 0;
            Memory.avgAtSource[sources[s].id] = Memory[sources[s].id];
    }
    roleLogging.run(h, b, u, h2, b2, u2, atk, harvesters, builders, upgraders, harvesters2, builders2, upgraders2, attackers, scouts, stores);
    roleSpawn.run(h, b, u, h2, b2, u2, atk, harvesters, builders, upgraders, harvesters2, builders2, upgraders2, attackers, scouts, stores, sources);
    roleTower.run();

    for (var name in Game.creeps) {
        try{
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep, sources);
            }
            if (creep.memory.role == 'harvester2') {
                roleHarvester.run(creep, sources);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep, sources);
            }
            if (creep.memory.role == 'upgrader2') {
                roleHarvester.run(creep, sources);
            }
            if (creep.memory.role == 'builder') {
                roleBuilder.run(creep, sources);
            }
            if (creep.memory.role == 'builder2') {
                roleHarvester.run(creep, sources);
            }
            if (creep.memory.role == 'store') {
                roleStore.run(creep, sources);
            }

            if (creep.memory.role == 'attacker') {
                roleAttackers.run(creep);
            }
            if (creep.memory.role == 'path2') {
                rolePath.run(creep);
            }
            if (creep.memory.role == 'scout') {
                roleKeeper.run(creep);
            }
            if (creep.memory.role == 'link') {
                roleKeeper.run(creep);
            }
        }
        catch (err) {
            console.log("creep: " + creep.name + " error: " + err);
        }
    }
    for (var s = 0, length = sources.length; s < length; s++) {
        Memory[sources[s].id] = Memory.atSources[sources[s].id];
    }
}