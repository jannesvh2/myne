var roleTerminalMover = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //Game.spawns['Spawn00'].createCreep([CARRY, CARRY, MOVE], null, { role: 'terminal', spawn: 0 });

        let terminal = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.terminal);
        if (!terminal)
            return;
        if (creep.memory.role == 'terminal') {
            if (creep.memory.work) {
                let moveTo = Game.getObjectById(creep.memory.work.moveTo);
                if (creep.memory.work.isLab) {
                    if (moveTo.mineralAmount >= creep.memory.work.fillTo)
                        delete creep.memory.work;
                }
                else {
                    if (moveTo.terminal.store[creep.memory.work.moveType] >= creep.memory.work.fillTo)
                        delete creep.memory.work;

                }
            }
            if (!creep.memory.work) {
                if (terminal.store['XUH2O']) {
                    let lab = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.defLab);
                    if (lab && lab.mineralType == 'XUH2O' && lab.mineralAmount < 1000) {
                        creep.memory.work = {};
                        creep.memory.work.moveType == 'XUH2O';
                        creep.memory.work.moveTo = lab;
                        creep.memory.work.moveFrom = terminal;
                        creep.memory.work.fillTo = 3000;
                        creep.memor.worky.isLab = true;
                    }
                }

                var total = _.sum(creep.carry);
                if (total.length && (total.length > 1 || !total[0][creep.memory.moveType])) {
                    for (var carry in total) {
                        if (creep.transfer(terminal, carry) == ERR_NOT_IN_RANGE)
                            creep.moveTo(terminal);
                        return;
                    }
                }

                if (creep.memory.full && total == 0) {
                    creep.memory.full = false;
                }
                else if (!creep.memory.full && total == creep.carryCapacity) {
                    creep.memory.full = true;
                }


                //reaction code
                if (!creep.memory.work) {
                    for (let s = 0, lengthS = Memory.spawns[creep.memory.spawn].reactions.length; s < lengthS; s++) {
                        if (terminal.store[Memory.spawns[creep.memory.spawn].reactions[s][0].m] > Memory.spawns[3].random.runReactionL[Memory.spawns[creep.memory.spawn].reactions[s][0].m]) {
                            if (creep.memory.full) {
                                if (creep.transfer(terminal, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                                    creep.moveTo(terminal);
                                return;
                            }
                            for (let s2 = 0, lengthS2 = Memory.spawns[creep.memory.spawn].reactions[s].length; s2 < lengthS2; s2++) {
                                let checkLab = Game.getObjectById(Memory.spawns[creep.memory.spawn].reactions[s][s2].l);
                                if (checkLab && checkLab.mineralType) {
                                    creep.memory.moveType = checkLab.mineralType;
                                    if (creep.withdraw(checkLab, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                                        creep.moveTo(checkLab);
                                    return;
                                }
                            }
                        }
                        else {
                            if (creep.memory.full) {
                                let moveToR = Game.getObjectById(creep.memory.moveToR);
                                if (!moveToR)
                                    return;
                                if (creep.transfer(moveToR, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                                    creep.moveTo(moveToR);
                                return;
                            }

                            let labFinal = Game.getObjectById(Memory.spawns[creep.memory.spawn].reactions[s][0].l)
                            if (labFinal && labFinal.mineralType && labFinal.mineralAmount > 100) {
                                creep.memory.moveType = Memory.spawns[creep.memory.spawn].reactions[s][0].m;
                                creep.memory.moveToR = terminal.id;
                                if (creep.withdraw(labFinal, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                                    creep.moveTo(labFinal);
                                return;

                            }
                            for (let s2 = 1, lengthS2 = Memory.spawns[creep.memory.spawn].reactions[s].length; s2 < lengthS2; s2++) {
                                let checkLab = Game.getObjectById(Memory.spawns[creep.memory.spawn].reactions[s][s2].l);

                                //empty lab if it has wrong mineral
                                if (checkLab && checkLab.mineralType && checkLab.mineralType != Memory.spawns[creep.memory.spawn].reactions[s][s2].m) {
                                    creep.memory.moveType = checkLab.mineralType;
                                    if (creep.withdraw(checkLab, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                                        creep.moveTo(checkLab);
                                    return;

                                }

                                //add mineral if room
                                if (checkLab && (!checkLab.mineralType || checkLab.mineralAmount < 100)) {
                                    creep.memory.moveType = Memory.spawns[creep.memory.spawn].reactions[s][s2].m;
                                    creep.memory.moveToR = Memory.spawns[creep.memory.spawn].reactions[s][s2].l;
                                    if (terminal.store[creep.memory.moveType]) {
                                        if (creep.withdraw(terminal, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                                            creep.moveTo(terminal);
                                        return;
                                    }
                                    else {
                                        if (Memory.spawns[creep.memory.spawn].reactions[s][s2].r && _.sum(terminal.store) < 295000) {
                                            Game.rooms[Memory.spawns[creep.memory.spawn].reactions[s][s2].r].terminal.send(Memory.spawns[creep.memory.spawn].reactions[s][s2].m, 3000, Memory.spawns[creep.memory.spawn].random.mainRoom, null);

                                        }
                                    }
                                }


                            }
                        }
                    }
                    return;
                }
            }

            if (creep.memory.full) {

                if (creep.transfer(moveTo, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                    creep.moveTo(moveTo);
            }
            else {

                if (creep.withdraw(moveFrom, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                    creep.moveTo(moveFrom);
            }
        }
        else {
            let store = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.storeId);
            if (!store)
                return;
            if (creep.memory.full && creep.carry.energy == 0) {
                creep.memory.full = false;
            }
            else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
                creep.memory.full = true;
            }

            if (creep.memory.role == 'toTerminal') {
                if (creep.memory.full) {
                    if (creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal);
                    }
                }
                else {
                    if (creep.withdraw(store, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(store);
                    }

                }
            }
            else if (creep.memory.role == 'toStore') {
                if (creep.memory.full) {
                    if (creep.transfer(store, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(store);
                    }
                }
                else {
                    if (creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal);
                    }

                    if (terminal.store.energy < 55000)
                        creep.memory.role = 'user';

                }

            }
        }
    }
};

module.exports = roleTerminalMover;