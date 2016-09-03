var roleRepairer = require('role.repairer');

var roleAttack = {
    run: function(creep) {
        var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 22);
        if(targets.length > 0) {
            if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
            creep.say('Attacking!');
        } else {
            roleRepairer.run(creep);
        }
	}
};

module.exports = roleAttack;