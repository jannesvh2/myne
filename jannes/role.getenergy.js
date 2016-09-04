var roleGetEnergy = {
    run: function(creep) {
        //var sources = creep.room.find(FIND_SOURCES); 1 room
        
        for (var myRooms in Game.rooms) {
            var sources = Game.rooms[myRooms].find(FIND_SOURCES);
        }
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