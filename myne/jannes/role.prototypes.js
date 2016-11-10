var rolePrototypes = {

    /** @param {Creep} creep **/
    run: function () {
        Room.prototype.destroy = function () {
            let destroy = this.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL)
                }
            });
            for (var d of destroy)
                d.destroy();
        };
    }
};

module.exports = rolePrototypes;