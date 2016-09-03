var roleSpawn = {

    /** @param {Creep} creep **/
    run: function (h,b,u) {
        //clearing memory of non existing creeps
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        //spawn harvesters
        //console.log('Harvesters: ' + harvesters.length);
        //spawn if less than 2
        if (harvesters.length < h) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, { role: 'harvester', source: 0 });
        }

        //console.log('Builders: ' + builders.length);
        if (builders.length < b) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, { role: 'builder', source: 0 });
        }

        //console.log('Upgraders: ' + upgraders.length);
        if (upgraders.length < u) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, { role: 'upgrader', source: 1 });
        }
    }
};

module.exports = roleSpawn;