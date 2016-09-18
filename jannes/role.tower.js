var roleTower = {

    /** @param {Creep} creep **/
    run: function () {

        //tower
        var twrRep = function (tower, a) {
            if (tower.energy > tower.energyCapacity * 2 / 3) {
                //tower repair
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (Memory.spawns[a].repairHp[structure] && (structure.hits < Memory.spawns[a].repairHp[structure]))
                    }
                });
                if (!closestDamagedStructure) {
                    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (Memory.spawns[a].repairHp[structure] && (structure.hits < Memory.spawns[a].repairHp[structure]) && (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_ROAD))
                        }
                    });
                }
                if (closestDamagedStructure)
                    tower.repair(closestDamagedStructure);
            }
        }
        for (let a = 0, length = Memory.spawns.length; a < length; a++) {
            var hostiles = Game.rooms[Memory.spawns[a].random.mainRoom].find(FIND_HOSTILE_CREEPS);
            var towers = Game.rooms[Memory.spawns[a].random.mainRoom].find(
                FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            var targetHeal = Game.rooms[Memory.spawns[a].random.mainRoom].find(FIND_MY_CREEPS, {
                filter: function (object) {
                    return object.hits < object.hitsMax;
                }
            });
            if (hostiles.length > 0) {
                var username = hostiles[0].owner.username;
                if (username != 'Invader')
                    Game.notify(`User ${username} spotted in room ${Memory.spawns[a].random.mainRoom}`);
                towers.forEach(tower => tower.attack(hostiles[0]));
            }
            else if (targetHeal.length) {
                towers.forEach(tower => tower.heal(targetHeal[0]));
            }
            else
                towers.forEach(tower => twrRep(tower, a));
        }

    }
};

module.exports = roleTower;