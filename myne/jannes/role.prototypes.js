var rolePrototypes = {

    /** @param {Creep} creep **/
    run: function () {
        Room.prototype.destroyWalls = function () {
            let destroy = this.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL)
                }
            });
            for (var d of destroy)
                d.destroy();
        };

        Creep.prototype.moveTo50 = function (target, obj) {
            obj = obj || {};

            if (obj.canOn && this.pos.getRangeTo(target) == 0) {
                return OK;
            }
            let isNear = this.pos.isNearTo(target);
            if (this.memory.moved == Game.time || (isNear && !obj.canOn))
                return OK;
            this.memory.moved = Game.time;
            let moveReturn = this.moveTo(target, { reusePath: 101, ignoreCreeps: true, maxRooms: obj.maxRooms == undefined ? 16 : obj.maxRooms, ignoreRoads: obj.ignoreRoads == undefined ? false : obj.ignoreRoads });

            //dont swap if next to target but still move if target move.
            if (isNear && obj.swapOn)
                return moveReturn;

            if (obj.pri || (!this.memory.moveReq || this.memory.moveReq < Game.time - 3) && (this.memory.currentPos == `x:${this.pos.x}y:${this.pos.y}` || this.pos.x == 0 || this.pos.x == 49 || this.pos.y == 0 || this.pos.y == 49)) {
                if (this.memory._move) {
                    let path = Room.deserializePath(this.memory._move.path);
                    if (path.length) {
                        let nextPos = this.room.lookForAt(LOOK_CREEPS, path[0].x, path[0].y);
                        if (nextPos.length && !nextPos[0].memory) {
                            delete this.memory._move;
                            return this.moveTo(target);

                        }

                        if (nextPos.length && (nextPos[0].memory.moved != Game.time || obj.pri)) {
                            nextPos[0].moveTo(this);
                            nextPos[0].memory.moved = Game.time;
                            if (!nextPos[0].memory.moveReq || nextPos[0].memory.moveReq < Game.time - 4)
                                nextPos[0].memory.moveReq = Game.time + 1;
                            return moveReturn;
                        }
                        else
                            this.memory.moved--;
                    }
                    if (moveReturn != OK)
                        delete this.memory._move;
                }
                return moveReturn;
            }

            if (this.fatigue == 0)
                this.memory.currentPos = `x:${this.pos.x}y:${this.pos.y}`;
            return moveReturn;
        };

        var healed = {};
        Creep.prototype.healNear = function (sourceRoomH) {
            let healAmount = this.getActiveBodyparts(HEAL);
            if (!healAmount)
                return;
            let boosted = 1;
            if (this.body[0].boost)
                boosted = 3;

            var inRange = this.pos.findInRange(FIND_MY_CREEPS, 3, {
                filter: function (object) {
                    return object.hits < object.hitsMax;
                }
            });
            if (inRange.length) {
                for (let t in inRange) {
                    if (healed[inRange[t].name]) {
                        inRange[t].hits = healed[inRange[t].name].hits;
                        if (inRange[t].hits >= inRange[t].hitsMax)
                            inRange.splice(t, 1);
                    }
                }
                if (inRange.length) {
                    inRange = _.sortBy(inRange, inR => inR.hits);
                    if (this.pos.isNearTo(inRange[0])) {
                        this.heal(inRange[0]);
                        inRange[0].hits += healAmount * 12 * boosted;
                        healed[inRange[0].name] = inRange[0];
                    }
                    else {
                        this.rangedHeal(inRange[0]);
                        inRange[0].hits += healAmount * 4 * boosted;
                        healed[inRange[0].name] = inRange[0];
                    }
                    return;
                }
            }
            var inRange = this.pos.findInRange(FIND_MY_CREEPS, 1, { filter: i => !healed[i.name] });
            inRange = inRange[Math.floor((Math.random() * inRange.length))];
            healed[inRange.id] = inRange;
            this.heal(inRange);

            if (this.room.name == sourceRoomH) {
                var targetHeal = this.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function (object) {
                        return object.hits < object.hitsMax;
                    }
                });
                if (targetHeal)
                    this.moveTo(targetHeal);
            }

        }
    }
};

module.exports = rolePrototypes;