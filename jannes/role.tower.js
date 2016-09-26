var roleTower = {

    /** @param {Creep} creep **/
    run: function () {

        //tower

        for (let a = 0, length = Memory.spawns.length; a < length; a++) {
            var towers = Game.rooms[Memory.spawns[a].random.mainRoom].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            if (towers) {
                var hostiles = Game.rooms[Memory.spawns[a].random.mainRoom].find(FIND_HOSTILE_CREEPS);
                if (hostiles.length > 0) {
                    Memory.spawns[a].counters.towerHostiles = 0;
                    Memory.spawns[a].random.hostiles = true;
                    var username = hostiles[0].owner.username;
                    if (username != 'Invader')
                        Game.notify(`User ${username} spotted in room ${Memory.spawns[a].random.mainRoom}`);
                    var target;
                    for (let b = 0, length2 = hostiles.length; b < length2; b++) {
                        if (Memory.spawns[a].random.towerHostiles[hostiles[b].id]) {
                            if (Memory.spawns[a].random.towerHostiles[hostiles[b].id].hits < Memory.spawns[a].random.towerHostiles[hostiles[b].id].hitsMax) {
                                Memory.spawns[a].random.towerHostiles[hostiles[b].id].delay = 0;
                                target = Game.getObjectById(Memory.spawns[a].random.towerHostiles[hostiles[b].id].id);
                                break;
                            }
                            else {
                                if (!target) {
                                    Memory.spawns[a].random.towerHostiles[hostiles[b].id].delay--;
                                    if (Memory.spawns[a].random.towerHostiles[hostiles[b].id].delay <= 0)
                                        target = Game.getObjectById(Memory.spawns[a].random.towerHostiles[hostiles[b].id].id);
                                }
                            }
                        }
                        else {
                            Memory.spawns[a].random.towerHostiles[hostiles[b].id] = hostiles[b];
                            Memory.spawns[a].random.towerHostiles[hostiles[b].id].delay = 8;
                        }
                    }
                    if (target) {
                        Memory.spawns[a].random.towerHostiles[target.id].delay = 15;
                        towers.forEach(tower => tower.attack(target));
                        continue;
                    }
                }
                Memory.spawns[a].random.hostiles = false;

                Memory.spawns[a].counters.towerHostiles++;
                if (Memory.spawns[a].counters.towerHostiles > 1500)
                    Memory.spawns[a].random.towerHostiles = {};
                var targetHeal = towers[0].pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function (object) {
                        return object.hits < object.hitsMax;
                    }
                });
                if (targetHeal) {
                    towers.forEach(tower => tower.heal(targetHeal));
                    continue;
                }

                var repList = [];
                for (var t in Memory.spawns[a].repairHp) {
                    let rep = Game.getObjectById(t);
                    if (!rep)
                        delete Memory.spawns[a].repairHp[t]
                    else
                        repList.push(rep);

                }

                var closestDamagedStructure = towers[0].pos.findClosestByRange(repList, {
                    filter: (structure) => {
                        return (structure.hits < Memory.spawns[a].repairHp[structure.id] || structure.hits < 1000)
                    }
                });
                if (closestDamagedStructure)
                    towers.forEach(tower => tower.repair(closestDamagedStructure));
            }
        }

    }
};

module.exports = roleTower;