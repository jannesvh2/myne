var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
        {
            console.log(creep.carry.energy +"<" +creep.carryCapacity + " " +creep.name);
           if(creep.carry.energy < creep.carryCapacity) {
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
                    }
                }
                else {
                        creep.moveTo(creep.room.controller);
                        
                    
                }
            
        }
        if(creep.carry.energy == 0){
         var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
                    }
            
        }
}
};

module.exports = roleUpgrader;var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
        {
           if(creep.carry.energy < creep.carryCapacity) {
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
                    }
                }
                else {
                        creep.moveTo(creep.room.controller);
                        
                    
                }
            
        }
        if(creep.carry.energy == 0){
         var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
                    }
            
        }
}
};

module.exports = roleUpgrader;