var roleSpawn = {

    /** @param {Creep} creep **/
    run: function() {
//clearing memory of non existing creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
//spawn harvesters
//get all harvesters
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log('Harvesters: ' + harvesters.length);
//spawn if less than 2
    if(harvesters.length < 2) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Builders: ' + builders.length);
    if(builders.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Upgraders: ' + upgraders.length);
    if(upgraders.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }

}
};

module.exports = roleSpawn;