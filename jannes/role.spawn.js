var roleSpawn = {

    /** @param {Creep} creep **/
    run: function () {
        //clearing memory of non existing creeps
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        var h = 4;
        var b = 5;
        var u = 4;
        //spawn harvesters
        //get all harvesters
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        //console.log('Harvesters: ' + harvesters.length);
        //spawn if less than 2
        if (harvesters.length < h) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, { role: 'harvester' });
            Game.creeps[newName].memory.source = 0;
        }

        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        //console.log('Builders: ' + builders.length);
        if (builders.length < b) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, { role: 'builder' });
            Game.creeps[newName].memory.source = 0;
        }

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        //console.log('Upgraders: ' + upgraders.length);
        if (upgraders.length < u) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, { role: 'upgrader' });
            Game.creeps[newName].memory.source = 1;
        }
        console.log("h: " + harvesters.length + "/" + h + ", b: " + builders.length + "/" + b + ", u: " + upgraders.length + "/" + u);
    }
};

module.exports = roleSpawn;