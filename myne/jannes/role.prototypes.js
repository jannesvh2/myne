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

        //Creep.prototype.moveTo50 = function (target) {
        //    let moveReturn = this.moveTo(target, { reusePath: 50, ignoreCreeps: true });
        //    if (this.memory._move) {
        //        let path = Room.deserializePath(this.memory._move.path);
        //        if (path.length) {
        //            let nextPos = this.room.lookForAt(LOOK_CREEPS, path[0].x, path[0].y);
        //            if (nextPos.length) {
        //                let otherCreep = nextPos[0].moveTo(this);
        //                if (otherCreep == ERR_NOT_OWNER) {
        //                    delete this.memory._move;
        //                    this.moveTo(target);
        //                    return;
        //                }

        //                this.moveTo(nextPos[0]);
        //            }
        //        }
        //        if (moveReturn != OK)
        //            delete this.memory._move;
        //    }
        //};
    }
};

module.exports = rolePrototypes;