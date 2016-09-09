var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSpawn = require('role.spawn');
var roleTower = require('role.tower');
var roleLogging = require('role.logging');
var roleAttackers = require('role.attackers');
var rolePath = require('role.path2');
var roleKeeper = require('role.keeper');

module.exports.loop = function () {
    PathFinder.use(true);
    var h = 5;
    var b = 2;
    var u = 10;
    var atk = 0;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');

    Memory.spots = [];
    Memory.spots.push({ x: '10', y: '45', sourceRoom: 'W59S28' });
    //Memory.spots.push({ x: '6', y: '41', sourceRoom: 'W58S28' });

    var sources = [];
    var roomSources = [];
    Memory.avgAtSource = {};
    Memory.atSources = {};
    //add memory for all sources
    for (var myRooms in Game.rooms) {
        roomSources = Game.rooms[myRooms].find(FIND_SOURCES);
        for (var a = 0, length = roomSources.length; a < length; a++) {
            sources.push(roomSources[a]);

        }
    }
    for (var s = 0, length = sources.length; s < length; s++) {
        if (!Memory[sources[s].id])
            Memory[sources[s].id] = 0;
            //Memory[sources[s].id] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        Memory.atSources[sources[s].id] = 0;
            Memory.avgAtSource[sources[s].id] = Memory[sources[s].id];
    }
    roleLogging.run(h, b, u, atk, harvesters, builders, upgraders, attackers, scouts);
    roleSpawn.run(h, b, u, atk, harvesters, builders, upgraders, attackers, scouts);
    roleTower.run();

    for (var name in Game.creeps) {
        try{
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep, sources);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep, sources);
            }
            if (creep.memory.role == 'builder') {
                roleBuilder.run(creep, sources);
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
        }
        catch (err) {
            console.log("creep: " + creep.name + " error: " + err);
        }
    }
    for (var s = 0, length = sources.length; s < length; s++) {
        Memory[sources[s].id] = Memory.atSources[sources[s].id];
    }
}