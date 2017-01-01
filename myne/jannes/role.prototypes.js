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
            if (this.memory.moved == Game.time || (this.pos.isNearTo(target) && !obj.canOn))
                return OK;
            this.memory.moved = Game.time;
            let moveReturn = this.moveTo(target, { reusePath: 101, ignoreCreeps: true, maxRooms: obj.maxRooms == undefined ? 16 : obj.maxRooms });

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
    }
};

module.exports = rolePrototypes;