var roleGetEnergy = require('role.getenergy');
var roleRepairer = require('role.repairer');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep, sources) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            delete creep.memory.sourceId;
            if (creep.room.find(FIND_CONSTRUCTION_SITES).length)
                creep.say('building');
            else
                creep.say('repairing');

        }

        if (creep.memory.building) {
            var targets = [];
            targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (!targets.length)
                for (var myRooms in Game.rooms) {
                    targets = Game.rooms[myRooms].find(FIND_CONSTRUCTION_SITES);
                }
            if (targets.length) {

                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                roleRepairer.run(creep);
            }
        }
        else {
            roleGetEnergy.run(creep, sources);
        }
    }
};

module.exports = roleBuilder;