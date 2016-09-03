var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleAttacker = require('role.attack');
var processSpawning = require('process.spawning');
var processTowers = require('process.towers');

module.exports.loop = function () {
    
    //params: builders, harvesters, upgraders, repairers, attackers
    processSpawning.run(1,3,2,2,0);
    
    //run roles
    var repairerCounter = 0;
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep, repairerCounter);
            repairerCounter++;
        }
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
    }
    
    //processTowers.run(Game.getObjectById('57c7c65e4ebebf94771c3a55'));
    
    //run towers
    var towers = Game.rooms['W59S26'].find(FIND_MY_STRUCTURES, { filter: (x) => x.structureType == STRUCTURE_TOWER });
    for(var towerCounter = 0; towerCounter < towers.length; towerCounter++)
    {
        processTowers.run(towers[towerCounter]);
    }
}