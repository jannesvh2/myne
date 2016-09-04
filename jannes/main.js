var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSpawn = require('role.spawn');
var roleTower = require('role.tower');
var roleLogging = require('role.logging');
var rolePath = require('role.path2');
var roleKeeper = require('role.keeper');

module.exports.loop = function () {
    var startCpu = Game.getUsedCpu();
    PathFinder.use(true);
    var h = 6;
    var b = 6;
    var u = 6;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    console.log(Game.getUsedCpu() - startCpu + "var");

    roleLogging.run(h, b, u, harvesters, builders, upgraders);
    console.log(Game.getUsedCpu() - startCpu + "logging");
    roleSpawn.run(h, b, u, harvesters, builders, upgraders);
    console.log(Game.getUsedCpu() - startCpu + "spawn");
    roleTower.run();
    console.log(Game.getUsedCpu() - startCpu + "tower");

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            console.log(Game.getUsedCpu() - startCpu + "harvester");
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            console.log(Game.getUsedCpu() - startCpu + "upgrader");
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            console.log(Game.getUsedCpu() - startCpu + "builder");
        }
        //if (creep.memory.role == 'path2') {
        //    rolePath.run(creep);
        //    console.log(Game.getUsedCpu() - startCpu + "path2");
        //}
        //if (creep.memory.role == 'keeper') {
        //    roleKeeper.run(creep);
        //    console.log(Game.getUsedCpu() - startCpu + "keeper");
        //}
    }
}