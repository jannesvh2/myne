var rolePath = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //Game.spawns['Spawn1'].createCreep([MOVE], undefined, { role: 'path2' });
        var targetLocation = Game.getObjectById('57cdb261c41e031e25ccf299');
        creep.memory.targetRoom = 'W59S28';
        if (creep.pos.roomName != creep.memory.targetRoom && creep.memory.targetRoom != '') {
            var exitDir = Game.map.findExit(creep.room.name, creep.memory.targetRoom);
            var Exit = creep.pos.findClosestByRange(exitDir);
            Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
            creep.moveTo(Exit);
        }
            else if (creep.pos != targetLocation.pos) {
                Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
                creep.moveTo(targetLocation)
            }
        }
    }
    };

module.exports = rolePath;