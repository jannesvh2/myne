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

        Creep.prototype.moveTo50 = function (target, canOn) {
            canOn = canOn || false;
            if (this.memory.moved == Game.time || (this.pos.isNearTo(target) && !canOn))
                return OK;
            this.memory.moved = Game.time;
            let moveReturn = this.moveTo(target, { reusePath: 50, ignoreCreeps: true });

            if (this.memory.currentPos == `x:${this.pos.x}y:${this.pos.y}`) {
                if (this.memory._move) {
                    let path = Room.deserializePath(this.memory._move.path);
                    if (path.length) {
                        let nextPos = this.room.lookForAt(LOOK_CREEPS, path[0].x, path[0].y);
                        if (nextPos.length && !nextPos[0].memory) {
                            delete this.memory._move;
                            return this.moveTo(target);

                        }
                        if (nextPos.length && nextPos[0].memory.moved != Game.time) {

                            this.moveTo(nextPos[0]);
                            let otherCreep = nextPos[0].moveTo(this);
                            nextPos[0].memory.moved = Game.time;
                            return moveReturn;
                        }
                    }
                    if (moveReturn != OK)
                        delete this.memory._move;
                }
                return moveReturn;
            }

            this.memory.currentPos = `x:${this.pos.x}y:${this.pos.y}`;
        };
    }
};

module.exports = rolePrototypes;