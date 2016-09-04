var roleSpawn = {

    /** @param {Creep} creep **/
    run: function (h, b, u, harvesters, builders, upgraders) {
        //clearing memory of non existing creeps
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        var keeper = _.filter(Game.creeps, (creep) => creep.memory.role == 'keeper');

        if (typeof keeper == 'undefined') {
            var newName = Game.spawns['Spawn1'].createCreep([MOVE], undefined, { role: 'keeper', source: 0 });
        }
        if (typeof keeper != 'undefined' && !keeper[0].ticksToLive > 20) {
            var newName = Game.spawns['Spawn1'].createCreep([MOVE], undefined, { role: 'keeper', source: 0 });
        }
        //spawn harvesters
        else if (harvesters.length < h) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'harvester', source: 0 });
        }

            //console.log('Upgraders: ' + upgraders.length);
        else if (upgraders.length < u) {
            var newName3 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'upgrader', source: 1 });
        }
            //console.log('Builders: ' + builders.length);
        else if (builders.length < b) {
            var newName2 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'builder', source: 0 });
        }



    }
};

module.exports = roleSpawn;