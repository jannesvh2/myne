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
    var h = 8;
    var b = 4;
    var u = 10;
    var atk = 0;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');

    Memory.spots = [];
    Memory.spots.push({ x: '10', y: '45', sourceRoom: 'W59S28' });
    //Memory.spots.push({ x: '12', y: '11', sourceRoom: 'W58S29' });

    var sources = [];
    var roomSources = [];
    Memory.avgAtSource = {};
    Memory.atSources = {};
    //add memory for all sources
    for (var myRooms in Game.rooms) {
        roomSources = Game.rooms[myRooms].find(FIND_SOURCES);
        for (var a = 0; a < roomSources.length; a++) {
            sources.push(roomSources[a]);

        }
    }
    for (var s = 0; s < sources.length; s++) {
        if (!Memory[sources[s].id])
            Memory[sources[s].id] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        Memory.atSources[sources[s].id] = 0;
        Memory.avgAtSource[sources[s].id] = 0;
        for (var a = 0; a < Memory[sources[s].id].length; a++)
            Memory.avgAtSource[sources[s].id] += Memory[sources[s].id][a];
        Memory.avgAtSource[sources[s].id] = Memory.avgAtSource[sources[s].id] / Memory[sources[s].id].length;
    }
    roleLogging.run(h, b, u, atk, harvesters, builders, upgraders, attackers, scouts);
    roleSpawn.run(h, b, u, atk, harvesters, builders, upgraders, attackers, scouts);
    roleTower.run();

    for (var name in Game.creeps) {
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
    for (var s = 0; s < sources.length; s++) {
        Memory[sources[s].id].push(Memory.atSources[sources[s].id])
        Memory[sources[s].id].splice(0, 1);
    }
}