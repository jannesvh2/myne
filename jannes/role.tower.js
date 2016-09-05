var roleTower = {

    /** @param {Creep} creep **/
    run: function () {

        //tower

        for (var myRooms in Game.rooms) {
            var hostiles = Game.rooms[myRooms].find(FIND_HOSTILE_CREEPS);
            var towers = Game.rooms[myRooms].find(
                FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });

            if (hostiles.length > 0) {
                var username = hostiles[0].owner.username;
                Game.notify(`User ${username} spotted in room ${myRooms}`);
                towers.forEach(tower => tower.attack(hostiles[0]));
            }
            else if (towers.energyAvailable > towers.energyCapacity / 2) {
                //tower repair
                var closestDamagedStructure = towers.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax &&
                            structure.hits < 100000)
                    }
                });
                if (closestDamagedStructure) {
                    towers.repair(closestDamagedStructure);
                }
            }
        }
    }
};

module.exports = roleTower;