var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSpawn = require('role.spawn');
var roleTower = require('role.tower');
var roleLogging = require('role.logging');
var rolePath = require('role.path2');

module.exports.loop = function () {
    PathFinder.use(true);
    var h = 2;
    var b = 4;
    var u = 3;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    roleLogging.run(h, b, u, harvesters, builders, upgraders);
    roleSpawn.run(h, b, u, harvesters, builders, upgraders);
    roleTower.run();

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'path2') {
            rolePath.run(creep);
        }
    }
}