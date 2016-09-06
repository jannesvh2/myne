var roleSpawn = {

    /** @param {Creep} creep **/
    run: function (h, b, u, a, s, harvesters, builders, upgraders, attackers, scouts) {
        //clearing memory of non existing creeps
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        var keeper = _.filter(Game.creeps, (creep) => creep.memory.role == 'keeper');
        var didSpawn = false;
        for (var scout = 0; scout < Memory.scouts.length; scout++) {
            var mustCreate = true;
            for(var scoutCreep = 0; scoutCreep < scouts.length; scoutCreep++){
                if (scouts[scoutCreep].memory.sourceRoom == Memory.scouts[scout].sourceRoom) {
                    if (scouts[scoutCreep].ticksToLive > 200)
                        mustCreate = false;
                }
                if (mustCreate) {
                    var newName5 = Game.spawns['Spawn1'].createCreep([MOVE], undefined, { role: 'scout', sourceRoom: Memory.scouts[scout].sourceRoom });
                    didSpawn = true;
                }
            }
        }
        //spawn harvesters
        if (didSpawn == false) {
            if (harvesters.length < h) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'harvester' });
            }

                //console.log('Upgraders: ' + upgraders.length);
            else if (upgraders.length < u) {
                var newName3 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'upgrader' });
            }
                //console.log('Builders: ' + builders.length);
            else if (builders.length < b) {
                var newName2 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'builder' });
            }
            else if (attackers.length < a) {
                //ranged
                var newName4 = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK], undefined, { role: 'attacker' });
                //melee
                //var newName4 = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], undefined, { role: 'attacker' });
            }
        }



    }
};

module.exports = roleSpawn;