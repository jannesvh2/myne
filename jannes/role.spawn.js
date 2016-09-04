var roleSpawn = {

    /** @param {Creep} creep **/
    run: function (h, b, u, a, harvesters, builders, upgraders, attackers) {
        //clearing memory of non existing creeps
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        var keeper = _.filter(Game.creeps, (creep) => creep.memory.role == 'keeper');
        var didSpawn = false;
        if (typeof keeper == 'undefined') {
            var newName5 = Game.spawns['Spawn1'].createCreep([MOVE], undefined, { role: 'keeper'});
        }
        else
        try {
            if (typeof keeper != 'undefined' && !keeper[0].ticksToLive > 20) {
                var newName5 = Game.spawns['Spawn1'].createCreep([MOVE], undefined, { role: 'keeper'});
            }
        }catch(err){
        }
        //spawn harvesters
        if (didSpawn == false) {
            if (harvesters.length < h) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'harvester', source: 0 });
            }

                //console.log('Upgraders: ' + upgraders.length);
            else if (upgraders.length < u) {
                var newName3 = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'upgrader', source: 0 });
            }
                //console.log('Builders: ' + builders.length);
            else if (builders.length < b) {
                var newName2 = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'builder', source: 0 });
            }
            else if (attackers.length < a) {
                var newName4 = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'attacker'});
            }
        }



    }
};

module.exports = roleSpawn;