var processSpawning = {
    run: function(builderLimit, hervesterlimit, upgraderLimit, repairerLimit, attackerLimit) {
        
        var spawn = Game.spawns['Spawn1'];

        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        
        //Body Parts
        var harvesterBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        var builderBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        var upgraderBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        var repairerBody = [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        var attackerBody = [WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK];
    
        if (harvesters.length < hervesterlimit && spawn.canCreateCreep(harvesterBody, undefined) == OK) {
            var newName = spawn.createCreep(harvesterBody, undefined, {role: 'harvester', harvesting: true});
            console.log('Spawning new harvester: ' + newName);
        }
        else if (builders.length < builderLimit && spawn.canCreateCreep(builderBody, undefined) == OK) {
            var newName = spawn.createCreep(builderBody, undefined, {role: 'builder', building: false, repairing: false});
            console.log('Spawning new builder: ' + newName);
        }
        else if (upgraders.length < upgraderLimit && spawn.canCreateCreep(upgraderBody, undefined) == OK) {
            var newName = spawn.createCreep(upgraderBody, undefined, {role: 'upgrader', upgrading: false});
            console.log('Spawning new upgrader: ' + newName);
        }
        else if (repairers.length < repairerLimit && spawn.canCreateCreep(repairerBody, undefined) == OK) {
            var newName = spawn.createCreep(repairerBody, undefined, {role: 'repairer', repairing: false});
            console.log('Spawning new repairer: ' + newName);
        }
        else if (attackers.length < attackerLimit && spawn.canCreateCreep(attackerBody, undefined) == OK) {
            var newName = spawn.createCreep(attackerBody, undefined, {role: 'attacker', repairing: false});
            console.log('Spawning new attacker: ' + newName);
        }
	}
};

module.exports = processSpawning;