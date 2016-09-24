var roleTower = {

    /** @param {Creep} creep **/
    run: function () {

        //tower

        for (let a = 0, length = Memory.spawns.length; a < length; a++) {
            var towers = Game.rooms[Memory.spawns[a].random.mainRoom].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            if(towers){
                var hostiles = Game.rooms[Memory.spawns[a].random.mainRoom].find(FIND_HOSTILE_CREEPS);
                if (hostiles.length > 0) {
                    var username = hostiles[0].owner.username;
                    if (username != 'Invader')
                        Game.notify(`User ${username} spotted in room ${Memory.spawns[a].random.mainRoom}`);
                    towers.forEach(tower => tower.attack(hostiles[0]));
                    continue;
                }

                var targetHeal = towers[0].pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function (object) {
                        return object.hits < object.hitsMax;
                    }
                });
                if (targetHeal) {
                    towers.forEach(tower => tower.heal(targetHeal));
                    continue;
                }

                var closestDamagedStructure = towers[0].pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((Memory.spawns[a].repairHp[structure.id] && structure.hits < Memory.spawns[a].repairHp[structure.id]) || structure.hits < 1000)
                    }
                });
                if(closestDamagedStructure)
                    towers.forEach(tower => tower.repair(closestDamagedStructure));
            }
        }

    }
};

module.exports = roleTower;