var roleTower = {

    /** @param {Creep} creep **/
    run: function () {

        //tower
        var twrRep = function (tower) {
            if (tower.energy > tower.energyCapacity * 2 / 3) {
                //tower repair
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax - 750 &&
                            structure.hits < 130000)
                    }
                });
                if (!closestDamagedStructure) {
                    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.hits < structure.hitsMax - 750 && (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_ROAD) && structure.hits < 130000)
                        }
                    });
                }
                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }
        }
        var hostiles = Game.rooms.W59S29.find(FIND_HOSTILE_CREEPS);
        var towers = Game.rooms.W59S29.find(
            FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
        var targetHeal = Game.rooms.W59S29.find(FIND_MY_CREEPS, {
            filter: function (object) {
                return object.hits < object.hitsMax;
            }
        });
        if (hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room W59S29`);
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
        else if (targetHeal) {
                towers.forEach(tower => tower.heal(targetHeal));
        }
        else
            towers.forEach(tower => twrRep(tower));


    }
};

module.exports = roleTower;