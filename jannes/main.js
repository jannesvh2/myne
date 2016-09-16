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
var roleDefender = require('role.defender');
var roleExtractor = require('role.extractor');

module.exports.loop = function () {
    //creep.moveTo(Game.flags['flagname'])  work even if there is no creep in room
    PathFinder.use(true);

    roleCreateJSON.run();

    roleLogging.run();
    roleSpawn.run(Memory.spawns[0].summon.h, Memory.spawns[0].summon.b, Memory.spawns[0].summon.u, Memory.spawns[0].summon.h2, Memory.spawns[0].summon.b2, Memory.spawns[0].summon.u2, Memory.spawns[0].summon.atk, Memory.spawns[0].creeps.harvesters, Memory.spawns[0].creeps.builders, Memory.spawns[0].creeps.upgraders, Memory.spawns[0].creeps.harvesters2, Memory.spawns[0].creeps.builders2, Memory.spawns[0].creeps.upgraders2, Memory.spawns[0].creeps.attackers, Memory.spawns[0].creeps.scouts, Memory.spawns[0].creeps.stores, Memory.spawns[0].sources, Memory.spawns[0].creeps.defenders, 0);
    roleSpawn.run(Memory.spawns[1].summon.h, Memory.spawns[1].summon.b, Memory.spawns[1].summon.u, Memory.spawns[1].summon.h2, Memory.spawns[1].summon.b2, Memory.spawns[1].summon.u2, Memory.spawns[1].summon.atk, Memory.spawns[1].creeps.harvesters, Memory.spawns[1].creeps.builders, Memory.spawns[1].creeps.upgraders, Memory.spawns[1].creeps.harvesters2, Memory.spawns[1].creeps.builders2, Memory.spawns[1].creeps.upgraders2, Memory.spawns[1].creeps.attackers, Memory.spawns[1].creeps.scouts, Memory.spawns[1].creeps.stores, Memory.spawns[1].sources, Memory.spawns[1].creeps.defenders, 1);
    roleTower.run();

    for (let name in Game.creeps) {
        try {
            var creep = Game.creeps[name];
            var energy = creep.pos.findInRange(
                FIND_DROPPED_ENERGY,
                1
            );
            let mustDel = false;
            if (energy.length) {
                console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
                creep.pickup(energy[0]);
                if (creep.carry.energy > (creep.carryCapacity * 0.70)) {
                    creep.memory.full = true;
                    mustDel = true;
                }

            }
            if (creep.memory.role == 'harvester') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleHarvester.run(creep, Memory.spawns[creep.memory.spawn].sources);
            }
            if (creep.memory.role == 'harvester2') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleHarvester.run(creep, Memory.spawns[creep.memory.spawn].sources);
            }
            if (creep.memory.role == 'upgrader') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleUpgrader.run(creep, Memory.spawns[creep.memory.spawn].sources);
            }
            if (creep.memory.role == 'upgrader2') {
                roleUpgrader.run(creep, Memory.spawns[creep.memory.spawn].sources);
            }
            if (creep.memory.role == 'builder') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleBuilder.run(creep, Memory.spawns[creep.memory.spawn].sources);
            }
            if (creep.memory.role == 'builder2') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleBuilder.run(creep, Memory.spawns[creep.memory.spawn].sources);
            }
            if (creep.memory.role == 'store') {
                roleStore.run(creep, Memory.spawns[creep.memory.spawn].sources);
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
            if (creep.memory.role == 'defender') {
                roleDefender.run(creep);
            }
            if (creep.memory.role == 'extractor') {
                roleExtractor.run(creep);
            }
            //if (creep.memory.role == 'link') {
            //    roleLink.run(creep);
            //}
            if (creep.pos.x == 0)
                creep.move(RIGHT);
            else if (creep.pos.y == 0)
                creep.move(BOTTOM);
            else if (creep.pos.x == 49)
                creep.move(LEFT);
            else if (creep.pos.y == 49)
                creep.move(TOP);
        }
        catch (err) {
            console.log("creep: " + creep.name + " error: " + err);
        }
    }
    for (let s = 0, length = Memory.spawns[0].sources.length; s < length; s++) {
        Memory.spawns[0].counters.history[Memory.spawns[0].sources[s].id] = Memory.spawns[0].counters.atSources[Memory.spawns[0].sources[s].id];
    }
    for (let s = 0, length = Memory.spawns[1].sources.length; s < length; s++) {
        Memory.spawns[1].counters.history[Memory.spawns[1].sources[s].id] = Memory.spawns[1].counters.atSources[Memory.spawns[1].sources[s].id];
    }
}