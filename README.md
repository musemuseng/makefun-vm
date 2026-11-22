# Tiny Stack VM

A compact stack-based virtual machine for the make.fun bounty "Build a tiny stack virtual machine".

[![Competition](https://img.shields.io/badge/competition-make.fun%20bounty-blue)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![makefun:owner 6wK3…e14A7](https://img.shields.io/badge/makefun-owner-6wK3%E2%80%A6e14A7-lightgrey)](https://make.fun)

## About

`main.ts` implements the full tiny-stack ISA (32-bit wrapping integers, 256-value stack, branches, calls, 256 words of memory, input/output, and all ten traps with their exit codes) in under 4 KB of dependency-free JavaScript that Node 22 runs directly. Practice set: 40/40, score 1,000,000.
