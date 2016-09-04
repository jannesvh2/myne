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
    var h = 6;
    var b = 6;
    var u = 6;
    var a = 0;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');

    roleLogging.run(h, b, u, a, harvesters, builders, upgraders, attackers);
    roleSpawn.run(h, b, u, a, harvesters, builders, upgraders, attackers);
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
        if (creep.memory.role == 'attacker') {
            roleAttackers.run(creep);
        }
        //if (creep.memory.role == 'path2') {
        //    rolePath.run(creep);
        //}
        //if (creep.memory.role == 'keeper') {
        //    roleKeeper.run(creep);
        //}
    }
}