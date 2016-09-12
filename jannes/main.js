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

    roleLogging.run();
    roleSpawn.run(Memory.spawns[0].summon.h, Memory.spawns[0].summon.b, Memory.spawns[0].summon.u, Memory.spawns[0].summon.h2, Memory.spawns[0].summon.b2, Memory.spawns[0].summon.u2, Memory.spawns[0].summon.atk, Memory.spawns[0].creeps.harvesters, Memory.spawns[0].creeps.builders, Memory.spawns[0].creeps.upgraders, Memory.spawns[0].creeps.harvesters2, Memory.spawns[0].creeps.builders2, Memory.spawns[0].creeps.upgraders2, Memory.spawns[0].creeps.attackers, Memory.spawns[0].creeps.scouts, Memory.spawns[0].creeps.stores, Memory.spawns[0].sources, 0);
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
            //if (creep.memory.role == 'link') {
            //    roleLink.run(creep);
            //}
        }
        catch (err) {
            console.log("creep: " + creep.name + " error: " + err);
        }
    }
    for (var s = 0, length = Memory.spawns[0].sources.length; s < length; s++) {
        Memory.spawns[0].counters.history[Memory.spawns[0].sources[s].id] = Memory.spawns[0].counters.atSources[Memory.spawns[0].sources[s].id];
    }
}