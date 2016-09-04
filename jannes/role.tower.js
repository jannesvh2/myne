var roleTower = {

    /** @param {Creep} creep **/
    run: function () {

        //tower
        var tower = Game.getObjectById('57cc3ed5c78dae3f28b4dfd0');
        if (tower) {
            //tower attack
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
            else {
                //tower repair
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }
        }
    }
};

module.exports = roleTower;