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
var roleMover = require('role.mover');
var roleUser = require('role.user');
var roleTerminalMover = require('role.terminalmover');
var roleLab = require('role.lab');
var roleGrafana = require('role.grafana');

module.exports.loop = function () {
    //Memory.global.isNew = true;
    //Game.market.deal('57dc7f507a5cbc6f245035ea', 6298, "W59S29")
    PathFinder.use(true);
    var cpu = Game.cpu.getUsed();
    var notify = "start: " + cpu.toFixed(2);

    roleCreateJSON.run();
    notify += " | JSON: " + (Game.cpu.getUsed() - cpu).toFixed(2);
    try {
        roleLogging.run();
    } catch (err) {
        console.log(err)
    }
    var cpu = Game.cpu.getUsed();

    for (let a = 0; a < Memory.global.roomCount; a++)
        roleSpawn.run(Memory.spawns[a].summon.h, Memory.spawns[a].summon.b, Memory.spawns[a].summon.u, Memory.spawns[a].summon.h2, Memory.spawns[a].summon.b2, Memory.spawns[a].summon.u2, Memory.spawns[a].summon.atkM, Memory.spawns[a].summon.atkR, Memory.spawns[a].summon.atkH, Memory.spawns[a].creeps.harvesters, Memory.spawns[a].creeps.builders, Memory.spawns[a].creeps.upgraders, Memory.spawns[a].creeps.harvesters2, Memory.spawns[a].creeps.builders2, Memory.spawns[a].creeps.upgraders2, Memory.spawns[a].creeps.attackersM, Memory.spawns[a].creeps.attackersR, Memory.spawns[a].creeps.attackersH, Memory.spawns[a].creeps.scouts, Memory.spawns[a].creeps.stores, Memory.spawns[a].sources, Memory.spawns[a].creeps.defenders, a);
    //roleSpawn.run(Memory.spawns[1].summon.h, Memory.spawns[1].summon.b, Memory.spawns[1].summon.u, Memory.spawns[1].summon.h2, Memory.spawns[1].summon.b2, Memory.spawns[1].summon.u2, Memory.spawns[1].summon.atkM, Memory.spawns[1].summon.atkR, Memory.spawns[1].summon.atkH, Memory.spawns[1].creeps.harvesters, Memory.spawns[1].creeps.builders, Memory.spawns[1].creeps.upgraders, Memory.spawns[1].creeps.harvesters2, Memory.spawns[1].creeps.builders2, Memory.spawns[1].creeps.upgraders2, Memory.spawns[1].creeps.attackersM, Memory.spawns[1].creeps.attackersR, Memory.spawns[1].creeps.attackersH, Memory.spawns[1].creeps.scouts, Memory.spawns[1].creeps.stores, Memory.spawns[1].sources, Memory.spawns[1].creeps.defenders, 1);
    //roleSpawn.run(Memory.spawns[2].summon.h, Memory.spawns[2].summon.b, Memory.spawns[2].summon.u, Memory.spawns[2].summon.h2, Memory.spawns[2].summon.b2, Memory.spawns[2].summon.u2, Memory.spawns[2].summon.atkM, Memory.spawns[2].summon.atkR, Memory.spawns[2].summon.atkH, Memory.spawns[2].creeps.harvesters, Memory.spawns[2].creeps.builders, Memory.spawns[2].creeps.upgraders, Memory.spawns[2].creeps.harvesters2, Memory.spawns[2].creeps.builders2, Memory.spawns[2].creeps.upgraders2, Memory.spawns[2].creeps.attackersM, Memory.spawns[2].creeps.attackersR, Memory.spawns[2].creeps.attackersH, Memory.spawns[2].creeps.scouts, Memory.spawns[2].creeps.stores, Memory.spawns[2].sources, Memory.spawns[2].creeps.defenders, 2);
    //roleSpawn.run(Memory.spawns[3].summon.h, Memory.spawns[3].summon.b, Memory.spawns[3].summon.u, Memory.spawns[3].summon.h2, Memory.spawns[3].summon.b2, Memory.spawns[3].summon.u2, Memory.spawns[3].summon.atkM, Memory.spawns[3].summon.atkR, Memory.spawns[3].summon.atkH, Memory.spawns[3].creeps.harvesters, Memory.spawns[3].creeps.builders, Memory.spawns[3].creeps.upgraders, Memory.spawns[3].creeps.harvesters2, Memory.spawns[3].creeps.builders2, Memory.spawns[3].creeps.upgraders2, Memory.spawns[3].creeps.attackersM, Memory.spawns[3].creeps.attackersR, Memory.spawns[3].creeps.attackersH, Memory.spawns[3].creeps.scouts, Memory.spawns[3].creeps.stores, Memory.spawns[3].sources, Memory.spawns[3].creeps.defenders, 3);
    //roleSpawn.run(Memory.spawns[4].summon.h, Memory.spawns[4].summon.b, Memory.spawns[4].summon.u, Memory.spawns[4].summon.h2, Memory.spawns[4].summon.b2, Memory.spawns[4].summon.u2, Memory.spawns[4].summon.atkM, Memory.spawns[4].summon.atkR, Memory.spawns[4].summon.atkH, Memory.spawns[4].creeps.harvesters, Memory.spawns[4].creeps.builders, Memory.spawns[4].creeps.upgraders, Memory.spawns[4].creeps.harvesters2, Memory.spawns[4].creeps.builders2, Memory.spawns[4].creeps.upgraders2, Memory.spawns[4].creeps.attackersM, Memory.spawns[4].creeps.attackersR, Memory.spawns[4].creeps.attackersH, Memory.spawns[4].creeps.scouts, Memory.spawns[4].creeps.stores, Memory.spawns[4].sources, Memory.spawns[4].creeps.defenders, 4);
    //roleSpawn.run(Memory.spawns[5].summon.h, Memory.spawns[5].summon.b, Memory.spawns[5].summon.u, Memory.spawns[5].summon.h2, Memory.spawns[5].summon.b2, Memory.spawns[5].summon.u2, Memory.spawns[5].summon.atkM, Memory.spawns[5].summon.atkR, Memory.spawns[5].summon.atkH, Memory.spawns[5].creeps.harvesters, Memory.spawns[5].creeps.builders, Memory.spawns[5].creeps.upgraders, Memory.spawns[5].creeps.harvesters2, Memory.spawns[5].creeps.builders2, Memory.spawns[5].creeps.upgraders2, Memory.spawns[5].creeps.attackersM, Memory.spawns[5].creeps.attackersR, Memory.spawns[5].creeps.attackersH, Memory.spawns[5].creeps.scouts, Memory.spawns[5].creeps.stores, Memory.spawns[5].sources, Memory.spawns[5].creeps.defenders, 5);

    notify += " | SPAWN: " + (Game.cpu.getUsed() - cpu).toFixed(2);
    var cpu = Game.cpu.getUsed();

    roleTower.run();
    notify += " | TOWER: " + (Game.cpu.getUsed() - cpu).toFixed(2);
    var cpu = Game.cpu.getUsed();

    //var creepCpu = [];
    for (let name in Game.creeps) {
       // let cpu2 = Game.cpu.getUsed();
        try {
            var creep = Game.creeps[name];
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
                //console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
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
                roleAttackers.run(creep);
                warType = true;
                continue;
            }
            else if (creep.memory.role == 'attackerM') {
                roleAttackers.run(creep);
                warType = true;
                continue;
            }
            else if (creep.memory.role == 'attackerR') {
                roleAttackers.run(creep);
                warType = true;
                continue;
            }
            else if (creep.memory.role == 'path2') {
                rolePath.run(creep);
                warType = true;
                continue;
            }
            else if (creep.memory.role == 'attackerH') {
                roleAttackers.run(creep);
                continue;
            }
            if (creep.hits < creep.hitsMax) {
                creep.moveTo(Memory.spawns[creep.memory.spawn].random.mainRoom);
                continue;
            }

            if (creep.memory.role == 'harvester') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleHarvester.run(creep, Memory.spawns[creep.memory.spawn].sources);
            }
            else if (creep.memory.role == 'harvester2') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleHarvester.run(creep, Memory.spawns[creep.memory.spawn].sources);
            }
            else if (creep.memory.role == 'upgrader') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleUpgrader.run(creep, Memory.spawns[creep.memory.spawn].sources);
            }
            else if (creep.memory.role == 'upgrader2') {
                roleUpgrader.run(creep, Memory.spawns[creep.memory.spawn].sources);
            }
            else if (creep.memory.role == 'builder') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleBuilder.run(creep, Memory.spawns[creep.memory.spawn].sources);
            }
            else if (creep.memory.role == 'builder2') {
                if (mustDel)
                    delete creep.memory.sourceId;
                roleBuilder.run(creep, Memory.spawns[creep.memory.spawn].sources);
            }
            else if (creep.memory.role == 'store') {
                roleStore.run(creep, Memory.spawns[creep.memory.spawn].sources);
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
            //if (creep.memory.role == 'link') {
            //    roleLink.run(creep);
            //}
            //if (creep.pos.x == 0)
            //    creep.move(RIGHT);
            //else if (creep.pos.y == 0)
            //    creep.move(BOTTOM);
            //else if (creep.pos.x == 49)
            //    creep.move(LEFT);
            //else if (creep.pos.y == 49)
            //    creep.move(TOP);

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
        console.log(err);
    }
    notify += " | CREEPS: " + (Game.cpu.getUsed() - cpu).toFixed(2);
    var cpu = Game.cpu.getUsed();
    for (let b = 0, length2 = Memory.spawns.length; b < length2; b++)
        for (let s = 0, length = Memory.spawns[b].sources.length; s < length; s++) {
            Memory.spawns[b].counters.history[Memory.spawns[b].sources[s].id] = Memory.spawns[b].counters.atSources[Memory.spawns[b].sources[s].id];
        }
    console.log(notify + " | TOTAL: " + Game.cpu.getUsed().toFixed(2));

    roleGrafana.run();
}