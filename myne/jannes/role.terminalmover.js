var roleTerminalMover = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //Game.spawns['Spawn00'].createCreep([CARRY, CARRY, MOVE], null, { role: 'terminal', spawn: 0 });


        let terminal = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.terminal);
        if (!terminal)
            return;
        let moveTo = Game.getObjectById(creep.memory.work.moveTo);
        if (creep.memory.work.isLab) {
            if (moveTo.mineralAmount >= creep.memory.work.fillTo)
                delete creep.memory.work;
        }
        else {
            if (moveTo.terminal.store[creep.memory.work.moveType] >= creep.memory.work.fillTo)
                delete creep.memory.work;

        }
        if (!creep.memory.work) {
            if (terminal.store['XUH2O']) {
                let lab = Game.getObjectById(Memory.spawns[creep.memory.spawn].random.defLab);
                if (lab && lab.mineralType == 'XUH2O' && lab.mineralAmount < 1000) {
                    creep.memory.work = {};
                    creep.memory.work.moveType == 'XUH2O';
                    creep.memory.work.moveTo = lab;
                    creep.memory.work.moveFrom = terminal;
                    creep.memory.work.fillTo = 3000;
                    creep.memor.worky.isLab = true;
                }
            }

            if (!creep.memory.work) {
                //reactions go here
            }
        }

        var total = _.sum(creep.carry);
        if (total.length && (total.length > 1 || !total[0][creep.memory.moveType])) {
            for (var carry in total) {
                if (creep.transfer(terminal, carry) == ERR_NOT_IN_RANGE)
                    creep.moveTo(terminal);
                return;
            }
        }

        if (creep.memory.full && total == 0) {
            creep.memory.full = false;
        }
        else if (!creep.memory.full && total == creep.carryCapacity) {
            creep.memory.full = true;
        }

        if (creep.memory.full) {

            if (creep.transfer(moveTo, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                creep.moveTo(moveTo);
        }
        else {

            if (creep.withdraw(moveFrom, creep.memory.moveType) == ERR_NOT_IN_RANGE)
                creep.moveTo(moveFrom);
        }
    }
};

module.exports = roleTerminalMover;