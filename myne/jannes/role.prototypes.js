var rolePrototypes = {

    /** @param {Creep} creep **/
    run: function () {
        Object.defineProperty(Room.prototype, 'destroy', {
            get: function () {
                let destroy = this.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL)
                    }
                });
                for (var d of destroy)
                    d.destroy();
            },
            enumerable: false,
            configurable: true
        });
    }
};

module.exports = rolePrototypes;