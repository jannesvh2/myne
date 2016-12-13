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

        creep.prototype.moveTo50 = function (target) {
            let moveReturn = this.moveTo(target, { reusePath: 50, ignoreCreeps: true });
            var path = this.room.deserializePath(this._move.path);

            let nextPos = this.room.lookForAt(LOOK_CREEPS, this.path);
            if(nextPos){
                let otherCreep = nextPos.moveTo(this);
                if(otherCreep == ERR_NOT_OWNER){
                    delete this._move;
                    this.moveTo(target);
                    return;
                }
                    
                this.moveTo(nextPos);
            }
            if (moveReturn != OK)
                delete this._move;
        };
    }
};

module.exports = rolePrototypes;