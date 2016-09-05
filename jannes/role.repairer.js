var roleRepairer = {
    run: function (creep) {
        var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.hits < structure.hitsMax &&
                    structure.hits < 100000)
            }
        });
        if (!closestDamagedStructure) {
            for (var myRooms in Game.rooms) {
                if (!closestDamagedStructure) {
                    closestDamagedStructure = Game.rooms[myRooms].find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.hits < structure.hitsMax &&
                                structure.hits < 100000)
                        }
                    });
                }
            }

            
        }
        if (closestDamagedStructure) {
            if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE)
                creep.moveTo(closestDamagedStructure);
        }
    }
}

module.exports = roleRepairer;