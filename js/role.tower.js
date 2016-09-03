var roleTower = {

    /** @param {Creep} creep **/
    run: function() {

        //tower
        var tower = Game.getObjectById('579fa9450700be0674d2f083');
        if (tower) {
            //tower repair
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            //tower attack
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
};

module.exports = roleTower;