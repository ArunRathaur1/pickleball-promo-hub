n_queens(N,Solution):-
    length(Solution,N),
    Solution ins 1...N,
    all_different(Solution),
    safe(Solution),
    label(Solution).
safe([])
safe([Q|Others]):-
    safe(Others),
    no_attack(Q,Others,1).
no_attack(_,[],_)
no_attack(Q,[Q1|Others],D)
    abs(Q-Q1)#\=D
    D1#=D+1
    no_attack(Q1,Others,D1)