var roleSpawn = {

    /** @param {Creep} creep **/
    run: function (h, b, u, h2, b2, u2, atk, harvesters, builders, upgraders, harvesters2, builders2, upgraders2, attackers, scouts, stores, sources, defenders, spawn) {

        var didSpawn = false;
        //Game.rooms.W59S29.energyCapacityAvailable
        //spawn harvesters
        if (Memory.spawns[spawn].random.defenders.length) {
            if (didSpawn == false) {
                for (let def = 0, length = Memory.spawns[spawn].random.defenders.length; def < length; def++) {
                    def = 0;
                    if (Memory.spawns[spawn].random.defenders[def] != Memory.spawns[spawn].random.mainRoom) {
                        let defs = _.filter(defenders, (creep) => creep.memory.sourceRoom == Memory.spawns[spawn].random.defenders[def]);
                        if (!defs.length) {
                            var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK], undefined, { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.defenders[def] });
                            didSpawn = true;
                            break;
                        }

                    }
                    Memory.spawns[spawn].random.defenders.splice(def, 1);
                }
            }
        }
        if (harvesters.length < h) {
            didSpawn = true;
            if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 550)
                var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, CARRY, MOVE], undefined, { role: 'harvester', spawn: spawn });
            else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 800)
                var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, { role: 'harvester', spawn: spawn });
            else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable >= 800)
                var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'harvester', spawn: spawn });
        }
        else if (harvesters2.length < h2) {
            didSpawn = true;
            if (harvesters2.length == 0)
                var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], undefined, { role: 'harvester2', spawn: spawn });
            else {
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1800)
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], undefined, { role: 'harvester2', spawn: spawn });
                else
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], undefined, { role: 'harvester2', spawn: spawn });
            }
        }

        else if (Memory.spawns[spawn].random.useStore) {
            if (didSpawn == false) {
                for (let s = 0, length = sources.length; s < length; s++) {
                    let filterLength = _.filter(stores, (creep) => creep.memory.sourceId.id == sources[s].id);

                    if (!filterLength.length || (filterLength.length == 1 && filterLength[0].ticksToLive < 80)) {

                        if (didSpawn == false) {
                            var newName5 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'store', sourceId: sources[s], spawn: spawn });
                            didSpawn = true;
                            break;
                        }
                    }

                }
            }
        }

        if (Memory.spawns[spawn].spots.length) {
            if (didSpawn == false) {
                for (let scout = 0, length = Memory.spawns[spawn].spots.length; scout < length; scout++) {
                    let ticks = _.filter(scouts, (creep) => creep.memory.sourceRoom == Memory.spawns[spawn].spots[scout].sourceRoom);
                    if (!ticks.length || (ticks.length == 1 && ticks[0].ticksToLive < 120)) {
                        if (Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom] && Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom].controller.reservation && Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom].controller.reservation.ticksToEnd > 3500)
                            var newName5 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([MOVE], undefined, { role: 'scout', sourceRoom: Memory.spawns[spawn].spots[scout].sourceRoom, spawn: spawn });
                        else
                            var newName5 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([MOVE, CLAIM, CLAIM, MOVE], undefined, { role: 'scout', sourceRoom: Memory.spawns[spawn].spots[scout].sourceRoom, spawn: spawn });
                        didSpawn = true;
                        break;

                    }
                }
            }
        }

        if (didSpawn == false) {
            //else if (links.length < Memory.linkSource.length * 2) {
            //    for (let l = 0, length = Memory.linkSource.length; l < length; l++) {
            //        var summonSource = true;
            //        var summonContainer = true;
            //        for (let c = 0, length2 = links.length; c < length2; c++) {
            //            if (links[c].memory.type == 'source' && links[c].ticksToLive > 200 && Memory.linkSource[l].id == links[c].memory.id)
            //                summonSource = false;
            //            if (links[c].memory.type == 'container' && links[c].ticksToLive > 200 && Memory.linkSource[l].sourceRoom == links[c].memory.sourceRoom)
            //                summonContainer = false;

            //        }
            //        if(summonSource)
            //            var newName6 = Game.spawns['Spawn' + spawn+1].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, { role: 'link', type: 'source', sourceRoom: Memory.linkSource[l].sourceRoom, id: Memory.linkSource[l].id });
            //        if (summonContainer)
            //            var newName7 = Game.spawns['Spawn' + spawn+1].createCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, { role: 'link', type: 'container', sourceRoom: Memory.linkSource[l].sourceRoom });
            //    }
            //}

            if (builders.length < b) {

                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 550)
                    var newName2 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, CARRY, MOVE], undefined, { role: 'builder', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 800)
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, { role: 'builder', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable >= 800)
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'builder', spawn: spawn });
            }
            else if (builders2.length < b2) {
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1800)
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE], undefined, { role: 'builder2', spawn: spawn });
                else
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, WORK, MOVE, WORK, WORK, MOVE], undefined, { role: 'builder2', spawn: spawn });

                if (typeof newName == 'string') {
                    //check order
                    var total = _.sum(Memory.spawns[0].random.terminal.store);
                    if (total > 50000) {
                        var maxTransferEnergyCost = Memory.spawns[0].random.terminal.store.energy;
                        for (var resource in Memory.spawns[0].random.terminal.store) {
                            if (resource != 'energy') {
                                var amountToSell = 50000;

                                var orders = Game.market.getAllOrders(order => order.resourceType == resource &&
                                    order.type == ORDER_BUY && order.price > 0.49 &&
                                    Game.market.calcTransactionCost(amountToSell, Memory.spawns[0].random.mainRoom, order.roomName) < maxTransferEnergyCost);
                                if (orders.length)
                                    Game.notify(orders);
                                //     Game.market.deal(orders[0].id, amountToSell, Memory.spawns[0].random.mainRoom);

                            }
                        }
                    }
                }

            }
                //console.log('Upgraders: ' + upgraders.length);
            else if (upgraders.length < u) {

                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 550)
                    var newName3 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, CARRY, MOVE], undefined, { role: 'upgrader', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 800)
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, { role: 'upgrader', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable >= 800)
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'upgrader', spawn: spawn });
            }
            else if (upgraders2.length < u2 || (Game.getObjectById(Memory.spawns[spawn].random.storeId).store.energy > 25000 && Memory.spawns[spawn].counters.upgradeTicks > 400)) {
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1800)
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'upgrader2', spawn: spawn });
                else
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'upgrader2', spawn: spawn });
                if (typeof newName == 'string')
                    Memory.spawns[spawn].counters.upgradeTicks = 0;
            }
                //console.log('Builders: ' + builders.length);

            else if (Memory.spawns[spawn].random.extractor && Memory.spawns[spawn].random.terminal) {
                if (_.filter(Game.creeps, (creep) => creep.memory.role == 'extractor' && creep.memory.spawn == spawn).length < 3 && Game.getObjectById(Memory.spawns[spawn].random.extractor).mineralAmount > 0)
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'extractor', spawn: spawn });
            }
            else if (attackers.length < atk) {
                //ranged
                var newName4 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK], undefined, { role: 'attacker', spawn: spawn });
                //melee
                //var newName4 = Game.spawns['Spawn' + spawn+1].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], undefined, { role: 'attacker' , spawn: spawn});
            }
        }

    }
};

module.exports = roleSpawn;