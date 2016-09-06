var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var goTo = function (spot) {
            if (creep.room.name != spot.sourceRoom && spot.sourceRoom != '') {
                var exitDir = Game.map.findExit(creep.room.name, spot.sourceRoom);
                var Exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(Exit);
            }
            else if (creep.pos != targetLocation.pos) {
                creep.moveTo(spot.x, spot.y)
            }
        }

        var sourceRoom = '';
        //If not in the correct room, move towards it
        var sourceRoom = 'W59S28';
        var spots = [];
        spots.push({ x: '10', y: '45', sourceRoom: 'W59S28' }, { x: '12', y: '11', sourceRoom: 'W58S29' })
        spots.forEach(spot => goTo(spot));
       
    
    }
};

module.exports = roleKeeper;