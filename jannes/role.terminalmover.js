var roleTerminalMover = {

    /** @param {Creep} creep **/
    run: function (creep) {

        var total = _.sum(creep.carry);
        if (creep.memory.full && total == 0) {
            creep.memory.full = false;
        }
        else if (!creep.memory.full && total == creep.carryCapacity) {
            creep.memory.full = true;
        }

        let terminal = Game.getObjectById('57dc6e2fe2d7cc5a33ae4da2');
        if (creep.memory.full) {
            let lab = Game.getObjectById('57ddc0f8c4053ddd7aeb3767');

            if (creep.transfer(lab, "O") == ERR_NOT_IN_RANGE)
                creep.moveTo(lab);
        }
        else {

            if (creep.withdraw(terminal, "O") == ERR_NOT_IN_RANGE)
                creep.moveTo(terminal);
        }
    }
};

module.exports = roleTerminalMover;