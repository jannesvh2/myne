var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSpawn = require('role.spawn');
var roleTower = require('role.tower');
var roleLogging = require('role.logging');

module.exports.loop = function () {
    var h = 5;
    var b = 4;
    var u = 4;
    roleLogging.run(h,b,u);
    roleSpawn.run(h,b,u);
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
            roleBuilder.run(creep, h);
        }
    }
}