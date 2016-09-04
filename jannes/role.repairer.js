var roleRepairer = {
    run: function(creep) {
        var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (!closestDamagedStructure) {
            closestDamagedStructure = Game.rooms.W14N59.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
        }
        if (!closestDamagedStructure) {
            try {
                closestDamagedStructure = Game.rooms.W14N58.find(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
            } catch (err) { }
        }

        if (closestDamagedStructure) {
            creep.repair(closestDamagedStructure);
        }
	}
};

module.exports = roleRepairer;