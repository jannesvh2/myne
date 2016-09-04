var roleGetEnergy = {
    run: function(creep) {
        //var sources = creep.room.find(FIND_SOURCES); 1 room
        var sources = Game.rooms.W14N59.find(FIND_SOURCES);
        try {
            sources = sources.concat(Game.rooms.W14N58.find(FIND_SOURCES));
        } catch (err) { }
        /// end
        for (var a = 0; a < sources.length; a++) {
            if (creep.harvest(sources[creep.memory.source]) == OK) {
                atSource = true;
                break;
            }
            if (sources[creep.memory.source].energy < 100) {
                creep.memory.source++;
                if (creep.memory.source >= energyCount)
                    creep.memory.source = 0;
            }
            if (creep.moveTo(sources[creep.memory.source]) == ERR_NO_PATH) {
                creep.memory.source++;
                if (creep.memory.source >= energyCount)
                    creep.memory.source = 0;
                if (creep.moveTo(sources[creep.memory.source]) == OK) { }
            }
        }
	}
};

module.exports = roleGetEnergy; 