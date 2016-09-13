var roleLink = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.role == 'source')
            for (let spot = 0, length = Memory.linkSource.length; spot < length; spot++) {
                if (creep.memory.sourceRoom == Memory.spots[spot].sourceRoom) {
                    if (creep.room.name != Memory.spots[spot].sourceRoom && Memory.spots[spot].sourceRoom != '') {
                        var exitDir = Game.map.findExit(creep.room.name, Memory.spots[spot].sourceRoom);
                        var Exit = creep.pos.findClosestByRange(exitDir);
                        creep.moveTo(Exit, { maxOps: 10000 });
                    }
                    else {
                        if (creep.memory.full && creep.carry.energy == 0) {
                            creep.memory.full = false;
                            creep.say('harvesting');
                        }
                        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
                            creep.memory.full = true;
                            delete creep.memory.sourceId;
                            creep.say('storing');
                        }
                        if (creep.memory.full) {
                            var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_LINK) && structure.energy < structure.energyCapacity;
                                }
                            });
                            if (target) {
                                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(target);
                                }
                            }
                        }
                        else {
                            var source = Game.getObjectById(creep.memory.id);
                            if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                                creep.moveTo(csource, { maxOps: 10000 });
                        }

                    }
                    break;
                }
            }
        if (creep.memory.role == 'container')
            if (creep.memory.full && creep.carry.energy == 0) {
                creep.memory.full = false;
                creep.say('harvesting');
            }
            else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
                creep.memory.full = true;
                delete creep.memory.sourceId;
                creep.say('storing');
            }
        if (creep.memory.full) {
            var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) && structure.energy < structure.energyCapacity;
                }
            });
            if (target) {
                if (creep.store(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        else {
            var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK) && structure.energy > 0;
                }
            });
            if (target) {
                if (target.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }

    }
};

module.exports = roleLink;