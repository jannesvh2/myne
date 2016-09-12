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
var roleCreateJSON = require('role.createjson');

module.exports.loop = function () {
    PathFinder.use(true);
    
    roleCreateJSON.run();

    roleLogging.run(h, b, u, h2, b2, u2, atk, harvesters, builders, upgraders, harvesters2, builders2, upgraders2, attackers, scouts, stores, sources);
    roleSpawn.run(h, b, u, h2, b2, u2, atk, harvesters, builders, upgraders, harvesters2, builders2, upgraders2, attackers, scouts, stores, sources);
    roleTower.run();

    for (var name in Game.creeps) {
        try {
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
                roleUpgrader.run(creep, sources);
            }
            if (creep.memory.role == 'builder') {
                roleBuilder.run(creep, sources);
            }
            if (creep.memory.role == 'builder2') {
                roleBuilder.run(creep, sources);
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