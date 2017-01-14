var rolePower = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.role == 'powerL') {
            if (!creep.memory.moveNum) {
                creep.memory.moveNum = 0;
                creep.memory.moveTo = 'W0S59';
            }

            if (creep.room.name != creep.memory.moveTo) {
                var exitDir = Game.map.findExit(creep.room.name, creep.memory.moveTo);
                var Exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo50(Exit, { canOn: true, maxRooms: 1 });
            }
            else {
                if (creep.memory.moveNum == 0) {
                    creep.memory.moveNum = 1;
                    creep.memory.moveTo = 'W0S60';
                }
                else if (creep.memory.moveNum == 1) {
                    creep.memory.moveNum = 2;
                    creep.memory.moveTo = 'W10S60';
                }
                else if (creep.memory.moveNum == 2) {
                    creep.memory.moveNum = 3;
                    creep.memory.moveTo = 'W10S50';
                }
                else if (creep.memory.moveNum == 3) {
                    creep.memory.moveNum = 4;
                    creep.memory.moveTo = 'W3S50';
                }
                else if (creep.memory.moveNum == 4) {
                    creep.memory.moveNum = 5;
                    creep.memory.moveTo = 'W10S50';
                }
                else if (creep.memory.moveNum == 5) {
                    creep.memory.moveNum = 6;
                    creep.memory.moveTo = 'W10S60';
                }
                else if (creep.memory.moveNum == 6) {
                    creep.memory.moveNum = 7;
                    creep.memory.moveTo = 'W0S59';
                }
                else if (creep.memory.moveNum == 7) {
                    creep.memory.moveNum = 8;
                    creep.memory.moveTo = 'W0S60';
                }
                else if (creep.memory.moveNum == 8) {
                    creep.memory.moveNum = 0;
                    creep.memory.moveTo = 'W0S59';
                }
            }
            if (creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) {
                var powerFound = Game.rooms[creep.room.name].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_POWER_BANK)
                    }
                });

                if (powerFound.length) {
                    if (!Memory.spawns[Memory.global.power[creep.room.name]].power.hasPower) {
                        Memory.spawns[Memory.global.power[creep.room.name]].power.hasPower = true;
                        Memory.spawns[Memory.global.power[creep.room.name]].power.room = creep.room.name;
                        Memory.spawns[creep.memory.spawn].power.spawn = 0;
                        Memory.spawns[creep.memory.spawn].power.spawned = 0;
                    }
                }
            }
        }
        else {
            if (creep.memory.full) {
                var terminal = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.terminal);
                let trans = creep.transfer(terminal, RESOURCE_POWER)
                if (trans == ERR_NOT_IN_RANGE)
                    creep.moveTo50(terminal);
                if (trans == ERR_NOT_ENOUGH_RESOURCES)
                    creep.suicide();
            }
            if (creep.room.name != creep.memory.room) {
                var exitDir = Game.map.findExit(creep.room.name, creep.memory.room);
                var Exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo50(Exit, { canOn: true, maxRooms: 1 });
                return;
            }
            if (creep.memory.role == 'powerA') {
                if (!creep.memory.target) {
                    creep.memory.target = Game.rooms[creep.room.name].find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_POWER_BANK)
                        }
                    });
                    if (creep.memory.target.length) {
                        creep.memory.target = creep.memory.target[0].id;
                    }
                }
                var pb = Game.getObjectById(creep.memory.target);
                if (!pb) {
                    Memory.spawns[creep.memory.spawn].power.hasPower = false;
                    Memory.spawns[creep.memory.spawn].power.spawn = 0;
                    Memory.spawns[creep.memory.spawn].power.spawned = 0;
                    creep.suicide();
                }
                else {
                    if (pb.hits < 300000)
                        Memory.spawns[creep.memory.spawn].power.spawn = parseInt(pb.power / 1600) + 1;
                    if (creep.attack(pb) != OK) {

                        if (creep.pos.getRangeTo(pb) == 2)
                            creep.moveTo(pb, { maxRooms: 1 });
                        else
                            creep.moveTo50(pb);
                    }
                }
            }
            if (creep.memory.role == 'powerH') {
                var heal = Game.creeps[creep.memory.target];
                if (!heal)
                    creep.suicide();
                else {
                    if (creep.heal(heal) != OK)
                        if (creep.pos.getRangeTo(heal) == 2)
                            creep.moveTo(heal, { maxRooms: 1 });
                        creep.moveTo50(heal, { canOn: true, swapOn: true });
                }
            }

            if (creep.memory.role == 'powerC') {

                var dropped = Game.rooms[creep.room.name].find(
            FIND_DROPPED_ENERGY,
             {
                 filter: function (object) {
                     return object.resourceType == "power";
                 }
             }
        );
                if (!dropped.length)
                    creep.moveTo(Game.creeps['healPower' + [creep.memory.spawn] + '-' + 1 + '|' + 1]);
                else {
                    let pick = creep.pickup(dropped[0]);
                    if (pick != OK)
                        creep.moveTo50(dropped[0]);
                    else {
                        creep.memory.full == true;
                        var terminal = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.terminal);
                        creep.moveTo50(terminal);
                    }
                }
            }

        }
    }
};

module.exports = rolePower;