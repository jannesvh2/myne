var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSpawn = require('role.spawn');
var roleTower = require('role.tower');
var roleLogging = require('role.logging');
var roleAttackers = require('role.attackers');
//var rolePath = require('role.path2');
//var roleKeeper = require('role.keeper');

module.exports.loop = function () {
    PathFinder.use(true);
    var h = 4;
    var b = 4;
    var u = 8;
    var a = 0;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');

    var sources = [];
    var atSources = [];
    var avgAtSource = [];
    //add memory for all sources
    for (var myRooms in Game.rooms)
        sources = Game.rooms[myRooms].find(FIND_SOURCES);
    for (s in sources) {
        if (!Memory[s.id])
            Memory[s.id] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        atSources[s.id] = 0;
        avgAtSource[s.id] = 0;
        for (var a in Memory[s.id])
            avgAtSource[s.id] = Memory[s.id][a];
        avgAtSource[s.id] = avgAtSource[s.id] / Memory[s.id].length;
    }

    roleLogging.run(h, b, u, a, harvesters, builders, upgraders, attackers);
    roleSpawn.run(h, b, u, a, harvesters, builders, upgraders, attackers);
    roleTower.run();

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            atSources = roleHarvester.run(creep, sources, atSources);
        }
        if (creep.memory.role == 'upgrader') {
            atSources = roleUpgrader.run(creep, sources, atSources);
        }
        if (creep.memory.role == 'builder') {
            atSources = roleBuilder.run(creep, sources, atSources);
        }
        if (creep.memory.role == 'attacker') {
            atSources = roleAttackers.run(creep);
        }
        //if (creep.memory.role == 'path2') {
        //    rolePath.run(creep);
        //}
        //if (creep.memory.role == 'keeper') {
        //    roleKeeper.run(creep);
        //}
    }
    for (s in sources) {
        Memory[s.id].push(atSources[s.id])
        Memory[s.id].splice(0, 1);
    }
}