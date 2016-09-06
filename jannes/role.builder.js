var roleGetEnergy = require('role.getenergy');
var roleRepairer = require('role.repairer');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep, sources) {

        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
            delete creep.memory.sourceId;
            if (creep.room.find(FIND_MY_CONSTRUCTION_SITES).length)
                creep.say('building');
            else
                creep.say('repairing');

        }
        var canBuild = false;
        if (creep.memory.full) {
            var targets = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
            if (targets) {
                canBuild = true;
                var test = creep.build(targets);
                if (test == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                } 
            }
            else {
                targets = [];
                for (var myRooms in Game.rooms) {
                    var tmpTargets = Game.rooms[myRooms].find(FIND_MY_CONSTRUCTION_SITES);
                    for (var t in tmpTargets)
                        targets.push(tmpTargets[t]);
                }
                if (targets.length) {
                    canBuild = true;
                    var buildReturn = creep.build(targets[0]);
                    if (buildReturn != OK) {
                        creep.moveTo(targets[0], [50000]);
                    }
                    //if (buildReturn == ERR_INVALID_TARGET) {
                    //    var sourceRoom = targets[0].room.name;
                    //    if (creep.room.name != sourceRoom && sourceRoom != '') {
                    //        var exitDir = Game.map.findExit(creep.room.name, sourceRoom);
                    //        var Exit = creep.pos.findClosestByRange(exitDir);
                    //        Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
                    //        creep.moveTo(Exit);
                    //    }
                    //}
                }
            }
            if (!canBuild) {
                roleRepairer.run(creep);
            }
        }
        else {
            roleGetEnergy.run(creep, sources);
        }
    }
};

module.exports = roleBuilder;