var roleTerminalMover = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //Game.spawns['Spawn00'].createCreep([CARRY, CARRY, MOVE], null, { role: 'terminal', spawn: 0 });

        let terminal = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.terminal);
        if (!terminal && !creep.memory.boost)
            return;
        if (creep.memory.role == 'terminal') {
            //add boost compounds to lab
            if (creep.memory.work) {
                let moveTo50 = Game.getObjectById(creep.memory.work.moveTo50);
                if (creep.memory.work.isLab) {
                    if (moveTo50.mineralAmount >= creep.memory.work.fillTo)
                        delete creep.memory.work;
                }
                else {
                    if (moveTo50.terminal.store[creep.memory.work.moveType] >= creep.memory.work.fillTo)
                        delete creep.memory.work;

                }
            }

            //check to add boost compounds to lab
            if (!creep.memory.work) {
                if (terminal.store['XUH2O']) {
                    let lab = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.defLab);
                    if (lab && lab.mineralType == 'XUH2O' && lab.mineralAmount < 1000) {
                        creep.memory.work = {};
                        creep.memory.work.moveType == 'XUH2O';
                        creep.memory.work.moveTo50 = lab;
                        creep.memory.work.moveFrom = terminal;
                        creep.memory.work.fillTo = 3000;
                        creep.memor.worky.isLab = true;
                    }
                }


                //reaction code
                if (!creep.memory.work) {

                    var total = _.sum(creep.carry);
                    if (creep.memory.full) {
                        if (creep.carry['energy'] > 0) {
                            if (creep.transfer(terminal, 'energy') == ERR_NOT_IN_RANGE)
                                creep.moveTo50(terminal);
                            return;
                        }

                        if (Object.keys(creep.carry).length > 1 && !creep.carry[creep.memory.moveType]) {
                            for (var carry in creep.carry) {
                                if (creep.transfer(terminal, carry) == ERR_NOT_IN_RANGE)
                                    creep.moveTo50(terminal);
                                return;
                            }
                        }
                    }
                    if (creep.memory.full && total == 0) {
                        creep.memory.full = false;
                        delete creep.memory.moveTo50R;
                    }
                    else if (!creep.memory.full && total == creep.carryCapacity) {
                        creep.memory.full = true;
                    }
                    //empty creep if full
                    if (creep.memory.full) {
                        if (creep.memory.moveTo50R) {
                            let moveTo50R = Game.getObjectById(creep.memory.moveTo50R);
                            if (!moveTo50R)
                                return;
                            let moveBack = creep.transfer(moveTo50R, creep.memory.moveType);
                            if (moveBack == ERR_NOT_IN_RANGE)
                                creep.moveTo50(moveTo50R);
                            if (moveBack == -8)
                                if (creep.transfer(terminal, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                                    creep.moveTo50(terminal);
                        }
                        else {
                            if (creep.transfer(terminal, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                                creep.moveTo50(terminal);
                        }
                        return;
                    }
                    //requests
                    if (Memory.spawns[creep.memory.spawn].requests) {
                        for (let s2 = 0, lengthS2 = Memory.spawns[creep.memory.spawn].requests.length; s2 < lengthS2; s2++) {

                            let checkLab = Game.getObjectById(Memory.spawns[creep.memory.spawn].requests[s2].l);
                            //empty lab if it has wrong mineral
                            if (checkLab && checkLab.mineralType && checkLab.mineralType != Memory.spawns[creep.memory.spawn].requests[s2].m) {
                                creep.memory.moveType = checkLab.mineralType;

                                let checkLabW = creep.withdraw(checkLab, creep.memory.moveType);
                                if (checkLabW == ERR_NOT_IN_RANGE)
                                    creep.moveTo50(checkLab);
                                if (checkLabW == OK) {
                                    creep.memory.full = true;
                                }
                                return;

                            }

                            //add mineral if space
                            if (checkLab && (!checkLab.mineralType || checkLab.mineralAmount < 2500)) {
                                creep.memory.moveType = Memory.spawns[creep.memory.spawn].requests[s2].m;
                                creep.memory.moveTo50R = Memory.spawns[creep.memory.spawn].requests[s2].l;
                                if (terminal.store[creep.memory.moveType]) {

                                    let terminalW = creep.withdraw(terminal, creep.memory.moveType);
                                    if (terminalW == ERR_NOT_IN_RANGE)
                                        creep.moveTo50(terminal);
                                    if (terminalW == OK) {
                                        creep.memory.full = true;
                                    }

                                    return;
                                }
                                else {
                                    if (Memory.spawns[creep.memory.spawn].requests[s2].r && _.sum(terminal.store) < 295000) {
                                        Game.rooms[Memory.spawns[creep.memory.spawn].requests[s2].r].terminal.send(Memory.spawns[creep.memory.spawn].requests[s2].m, 1000, Memory.spawns[creep.memory.spawn].random.mainRoom, null);
                                        if (Memory.spawns[creep.memory.spawn].requests[s2].r2)
                                            Game.rooms[Memory.spawns[creep.memory.spawn].requests[s2].r2].terminal.send(Memory.spawns[creep.memory.spawn].requests[s2].m, 1000, Memory.spawns[creep.memory.spawn].random.mainRoom, null);

                                    }
                                }
                            }
                        }
                    }

                    //reactions
                    if (Memory.spawns[creep.memory.spawn].reactions)
                        for (let s = 0, lengthS = Memory.spawns[creep.memory.spawn].reactions.length; s < lengthS; s++) {
                            //check if final is at mark
                            if (terminal.store[Memory.spawns[creep.memory.spawn].reactions[s][0].m] >= Memory.spawns[creep.memory.spawn].random.runReactionL[Memory.spawns[creep.memory.spawn].reactions[s][0].m]) {
                                //empty labs
                                for (let s2 = 0, lengthS2 = Memory.spawns[creep.memory.spawn].reactions[s].length; s2 < lengthS2; s2++) {
                                    let checkLab = Game.getObjectById(Memory.spawns[creep.memory.spawn].reactions[s][s2].l);
                                    if (checkLab && checkLab.mineralType) {
                                        creep.memory.moveType = checkLab.mineralType;
                                        let emptyLab = creep.withdraw(checkLab, creep.memory.moveType);
                                        if (emptyLab == ERR_NOT_IN_RANGE)
                                            creep.moveTo50(checkLab);
                                        if (emptyLab == OK) {
                                            creep.memory.full = true;
                                        }
                                        return;
                                    }
                                }
                            }
                            else {
                                let labFinal = Game.getObjectById(Memory.spawns[creep.memory.spawn].reactions[s][0].l)
                                if (labFinal && labFinal.mineralType && (labFinal.mineralAmount > 100 || labFinal.mineralType != Memory.spawns[creep.memory.spawn].reactions[s][0].m)) {
                                    creep.memory.moveType = labFinal.mineralType;
                                    creep.memory.moveTo50R = terminal.id;

                                    let labFinalW = creep.withdraw(labFinal, creep.memory.moveType);
                                    if (labFinalW == ERR_NOT_IN_RANGE)
                                        creep.moveTo50(labFinal);
                                    if (labFinalW == OK) {
                                        creep.memory.full = true;
                                    }
                                    return;

                                }
                                for (let s2 = 1, lengthS2 = Memory.spawns[creep.memory.spawn].reactions[s].length; s2 < lengthS2; s2++) {
                                    let checkLab = Game.getObjectById(Memory.spawns[creep.memory.spawn].reactions[s][s2].l);

                                    //empty lab if it has wrong mineral
                                    if (checkLab && checkLab.mineralType && checkLab.mineralType != Memory.spawns[creep.memory.spawn].reactions[s][s2].m) {
                                        creep.memory.moveType = checkLab.mineralType;

                                        let checkLabW = creep.withdraw(checkLab, creep.memory.moveType);
                                        if (checkLabW == ERR_NOT_IN_RANGE)
                                            creep.moveTo50(checkLab);
                                        if (checkLabW == OK) {
                                            creep.memory.full = true;
                                        }
                                        return;

                                    }

                                    //add mineral if space
                                    if (checkLab && (!checkLab.mineralType || checkLab.mineralAmount < 100)) {
                                        creep.memory.moveType = Memory.spawns[creep.memory.spawn].reactions[s][s2].m;
                                        creep.memory.moveTo50R = Memory.spawns[creep.memory.spawn].reactions[s][s2].l;
                                        if (terminal.store[creep.memory.moveType]) {

                                            let terminalW = creep.withdraw(terminal, creep.memory.moveType);
                                            if (terminalW == ERR_NOT_IN_RANGE)
                                                creep.moveTo50(terminal);
                                            if (terminalW == OK) {
                                                creep.memory.full = true;
                                            }

                                            return;
                                        }
                                        else {
                                            if (Memory.spawns[creep.memory.spawn].reactions[s][s2].r && _.sum(terminal.store) < 295000) {
                                                Game.rooms[Memory.spawns[creep.memory.spawn].reactions[s][s2].r].terminal.send(Memory.spawns[creep.memory.spawn].reactions[s][s2].m, 1000, Memory.spawns[creep.memory.spawn].random.mainRoom, null);

                                            }
                                        }
                                    }


                                }
                            }
                        }

                    //fill nukes
                    let nuker = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.nuker);
                    if (nuker) {
                        if (nuker.ghodium < nuker.ghodiumCapacity) {
                            creep.memory.moveType = 'G';
                            creep.memory.moveTo50R = nuker.id;
                            if (creep.memory.full) {
                                if (creep.transfer(nuker, 'G') == ERR_NOT_IN_RANGE)
                                    creep.moveTo50(nuker);

                            }
                            else {
                                if (terminal.store['G']) {
                                    let fillNukeG = creep.withdraw(terminal, 'G');
                                    if (fillNukeG == ERR_NOT_IN_RANGE)
                                        creep.moveTo50(terminal);
                                    else if (fillNukeG == OK)
                                        creep.memory.full = true;
                                }
                                else {
                                    if (_.sum(terminal.store) < 295000) {
                                        Game.rooms['W3S55'].terminal.send('G', 1000, Memory.spawns[creep.memory.spawn].random.mainRoom, null);

                                    }
                                }
                            }
                        }
                    }
                    creep.moveTo50(terminal);
                    return;
                }
            }
            if (creep.memory.full) {

                if (creep.transfer(moveTo50, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                    creep.moveTo50(moveTo50);
            }
            else {
                console.log(JSON.stringify(creep.memory.work));
                if (creep.withdraw(creep.memory.work.moveFrom, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                    creep.moveTo50(creep.memory.work.moveFrom);
            }
        }
        else {
            //boost low rooms with extra energy
            let store = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.storeId);
            if (!store)
                return;
            if (creep.memory.full && creep.carry.energy == 0) {
                creep.memory.full = false;
            }
            else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
                creep.memory.full = true;
            }
            // boosing rooms
            if (creep.memory.role == 'toTerminal') {
                if (creep.memory.boost) {

                    if (creep.memory.full) {
                        if (creep.transfer(Game.getObjectById(creep.memory.to), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo50(Game.getObjectById(creep.memory.to));
                        }
                    }
                    else {
                        if (creep.withdraw(Game.getObjectById(creep.memory.from), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo50(Game.getObjectById(creep.memory.from));
                        }

                    }
                    return;
                }
                if (creep.memory.full) {
                    if (creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo50(terminal);
                    }
                }
                else {
                    if (creep.withdraw(store, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo50(store);
                    }

                }
            }//boosted room
            else if (creep.memory.role == 'toStore') {
                if (creep.memory.full) {
                    if (creep.transfer(store, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo50(store);
                    }
                }
                else {
                    if (creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo50(terminal);
                    }

                    if (terminal.store.energy < 55000)
                        creep.memory.role = 'user';

                }

            }
        }
    }
};

module.exports = roleTerminalMover;