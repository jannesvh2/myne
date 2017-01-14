var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSpawn = require('role.spawn');
var roleTower = require('role.tower');
var roleLogging = require('role.logging');
var roleClaim = require('role.claim');
var rolePower = require('role.power');
var roleKeeper = require('role.keeper');
var roleStore = require('role.store');
var roleCreateJSON = require('role.createjson');
var roleDefender = require('role.defender');
var roleExtractor = require('role.extractor');
var roleMover = require('role.mover');
var roleUser = require('role.user');
var roleTerminalMover = require('role.terminalmover');
var roleLab = require('role.lab');
var rolePrototypes = require('role.prototypes');

module.exports.loop = function () {
    //Memory.global.isNew = true;
    //Game.market.deal('57dc7f507a5cbc6f245035ea', 6298, "W59S29")
    PathFinder.use(true);
    var cpu = Game.cpu.getUsed();
    var notify = "start: " + cpu.toFixed(2);

    rolePrototypes.run();

    roleCreateJSON.run();
    notify += " | JSON: " + (Game.cpu.getUsed() - cpu).toFixed(2);
    try {
        roleLogging.run();
    } catch (err) {
        console.log(err + ' LOGGING')
    }
    var cpu = Game.cpu.getUsed();

    for (let a = 0; a < Memory.global.roomCount; a++)
        roleSpawn.run(Memory.spawns[a].summon.h, Memory.spawns[a].summon.b, Memory.spawns[a].summon.u, Memory.spawns[a].summon.h2, Memory.spawns[a].summon.b2, Memory.spawns[a].summon.u2, Memory.spawns[a].summon.atkM, Memory.spawns[a].summon.atkR, Memory.spawns[a].summon.atkH, Memory.spawns[a].creeps.harvesters, Memory.spawns[a].creeps.builders, Memory.spawns[a].creeps.upgraders, Memory.spawns[a].creeps.harvesters2, Memory.spawns[a].creeps.builders2, Memory.spawns[a].creeps.upgraders2, Memory.spawns[a].creeps.attackersM, Memory.spawns[a].creeps.attackersR, Memory.spawns[a].creeps.attackersH, Memory.spawns[a].creeps.scouts, Memory.spawns[a].creeps.stores, Memory.spawns[a].sources, Memory.spawns[a].creeps.defenders, a);

    notify += " | SPAWN: " + (Game.cpu.getUsed() - cpu).toFixed(2);
    var cpu = Game.cpu.getUsed();

    roleTower.run();
    notify += " | TOWER: " + (Game.cpu.getUsed() - cpu).toFixed(2);
    var cpu = Game.cpu.getUsed();

    //var creepCpu = [];
    var roleAttackers;
    for (let name in Game.creeps) {
        // let cpu2 = Game.cpu.getUsed();
        try {
            var creep = Game.creeps[name];
            if (creep.spawning)
                continue;
            var energy = creep.pos.findInRange(
                FIND_DROPPED_ENERGY,
                1, {
                    filter: function (object) {
                        return object.resourceType == "energy";
                    }
                }
            );
            let mustDel = false;
            if (energy.length) {
                creep.pickup(energy[0]);
                if (creep.carry.energy > (creep.carryCapacity * 0.70)) {
                    creep.memory.full = true;
                    mustDel = true;
                }

            }
            if (creep.memory.role == 'defender') {
                roleDefender.run(creep);
                warType = true;
                continue;
            }
            else if (creep.memory.role == 'attackerD') {
                if (!roleAttackers)
                    roleAttackers = require('role.attackers');
                roleAttackers.run(creep);
                warType = true;
                continue;
            }
            else if (creep.memory.role == 'attackerM') {
                if (!roleAttackers)
                    roleAttackers = require('role.attackers');
                roleAttackers.run(creep);
                warType = true;
                continue;
            }
            else if (creep.memory.role == 'attackerR') {
                if (!roleAttackers)
                    roleAttackers = require('role.attackers');
                roleAttackers.run(creep);
                warType = true;
                continue;
            }
            else if (creep.memory.role == 'claim') {
                roleClaim.run(creep);
                warType = true;
                continue;
            }
            else if (creep.memory.role == 'attackerH') {
                if (!roleAttackers)
                    roleAttackers = require('role.attackers');
                roleAttackers.run(creep);
                continue;
            }
            if (creep.hits < creep.hitsMax && !creep.memory.helper) {
                creep.moveTo50(Game.spawns['Spawn' + parseInt(creep.memory.spawn) + "" + 0]);
                continue;
            }

            if (creep.memory.role == 'harvester') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleHarvester.run(creep);
            }
            else if (creep.memory.role == 'harvester2') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleHarvester.run(creep);
            }
            else if (creep.memory.role == 'upgrader') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleUpgrader.run(creep);
            }
            else if (creep.memory.role == 'upgrader2') {
                roleUpgrader.run(creep);
            }
            else if (creep.memory.role == 'builder') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleBuilder.run(creep);
            }
            else if (creep.memory.role == 'builder2') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleBuilder.run(creep);
            }
            else if (creep.memory.role == 'store') {
                roleStore.run(creep);
            }
            else if (creep.memory.role == 'scout') {
                roleKeeper.run(creep);
            }
            else if (creep.memory.role == 'extractor') {
                roleExtractor.run(creep);
            }
            else if (creep.memory.role == 'mover') {
                roleMover.run(creep);
            }
            else if (creep.memory.role == 'user') {
                roleUser.run(creep);
            }
            else if (creep.memory.role == 'terminal') {
                roleTerminalMover.run(creep);
            }
            else if (creep.memory.role == 'toTerminal') {
                roleTerminalMover.run(creep);
            }
            else if (creep.memory.role == 'toStore') {
                roleTerminalMover.run(creep);
            }
            else if (creep.memory.role == 'powerL' || creep.memory.role == 'powerA' || creep.memory.role == 'powerH' || creep.memory.role == 'powerC') {
                rolePower.run(creep);
            }
            // notify += " | " + creep.memory.role + ": " + (Game.cpu.getUsed() - cpu).toFixed(2);
            //  var cpu = Game.cpu.getUsed();
        }
        catch (err) {
            console.log("creep: " + creep.name + " error: " + err);
        }
        //creepCpu.push({ creep: creep.memory.role, used: (Game.cpu.getUsed() - cpu2).toFixed(2)})
    }
    //creepCpu.sort(function (a, b) {
    //    return b.used - a.used;
    //});
    //let cPint = "";
    //for (let c = 0; c < 5; c++) {
    //    cPint += creepCpu[c].creep + ": " + creepCpu[c].used + " | ";
    //}
    //console.log(cPint);
    try {
        roleLab.run();
    } catch (err) {
        console.log(err + ' LAB');
    }
    notify += " | CREEPS: " + (Game.cpu.getUsed() - cpu).toFixed(2);
    var cpu = Game.cpu.getUsed();
    for (let b = 0, length2 = Memory.spawns.length; b < length2; b++)
        for (let s = 0, length = Memory.spawns[b].sources.length; s < length; s++) {
            Memory.spawns[b].counters.history[Memory.spawns[b].sources[s]] = Memory.spawns[b].counters.atSources[Memory.spawns[b].sources[s].id];
        }
    console.log(notify + " | TOTAL: " + Game.cpu.getUsed().toFixed(2));

    if (!Memory.stats) {
         Memory.stats = {};
         Memory.stats.cpu = {};
         Memory.stats.gcl = {};
         Memory.stats.room = {};
         Memory.stats.sales = [];
     }
     else {

         if (Game.time % 30 == 0) {
             var roleGrafana = require('role.grafana');
             roleGrafana.run();

         }
     }
};