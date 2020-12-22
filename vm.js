let fs = require('fs');
let argcmd = process.argv;

let readline = require('readline-sync');


let code = fs.readFileSync(argcmd[2]);
code = code.toString();

code = code.split(/\s/);

let mem = code.filter(element => element !== '');

if (argcmd[3] === 'debug')
	for (let i = 0; i < mem.length; i++)
		console.log(i, mem[i]);

let ip = 0;
let flag = true;


while(flag && ip < mem.length) {
	switch (mem[ip]) {
		case ' ' || '':
			break
		case 'input':
			mem[mem[ip + 1]] = parseFloat(readline.question());
			ip += 2;
			break
		case 'set':
			mem[mem[ip + 1]] = parseFloat(mem[ip + 2]);
			ip += 3;
			break
		case 'mov':
			mem[mem[ip + 1]] = mem[mem[ip + 2]];
			ip += 3;
			break
		case 'output':
			console.log(mem[mem[ip + 1]]);
			ip += 2;
			break
		case 'add':
			mem[mem[ip + 3]] = mem[mem[ip + 1]] + mem[mem[ip + 2]];
			ip += 4;
			break
		case 'mlp':
			mem[mem[ip + 3]] = mem[mem[ip + 1]] * mem[mem[ip + 2]];
			ip += 4;
			break
		case 'compare':
			switch (mem[ip + 1]) {
				case '=':
					if (mem[mem[ip + 2]] === mem[mem[ip + 3]])
						ip += 5;
					else
						ip = mem[ip + 4];
					break
				case '!=':
					if (mem[mem[ip + 2]] !== mem[mem[ip + 3]])
						ip += 5;
					else
						ip = mem[ip + 4];
					break
				case '<':
					if (mem[mem[ip + 2]] < mem[mem[ip + 3]])
						ip +=5;
					else
						ip = mem[ip + 4];
					break
				case '>':
					if (mem[mem[ip + 2]] > mem[mem[ip + 3]])
						ip += 5;
					else
						ip = mem[ip + 4];
					break
				case '<=':
					if (mem[mem[ip + 2]] <= mem[mem[ip + 3]])
						ip += 5;
					else
						ip = mem[ip + 4];
					break
				case '>=':
					if (mem[mem[ip + 2]] >= mem[mem[ip + 3]])
						ip += 5;
					else
						ip = mem[ip + 4];
					break
			}
			break
		case 'end':
			ip++;
			break
		case 'jump':
			ip = mem[ip + 1] * 1;
			break
		case 'exit':
			flag = false;
	}
}
