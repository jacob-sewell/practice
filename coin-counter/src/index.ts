export function coinCombo( coins: number[], amount: number ): number[] {
	const sorted: number[] = [ ...new Set( coins ) ]
		.filter( ( n: number ): boolean => ( n <= amount ) )
		.sort( ( a: number, b: number ) => b - a );
	const candidates: number[][] = [ [] ];
	console.log( { coins, sorted } );

	do {
		const newCandidates: number[][] = [];

		// iterate candidates, seek solutions
		while ( candidates.length ) {
			const candidate: number[] = candidates.shift() || [];
			const sum = candidate.reduce( ( res: number, num: number ): number => res + num, 0 );

			for ( const coinIndex in sorted ) {
				const coin: number = sorted[ coinIndex ];
				// Did we find the solution?
				if ( sum + coin === amount ) {
					return [ coin, ...candidate ];
				}
				// build new candidates array, and screen out failed candidates
				if ( amount > sum + coin ) {
					newCandidates.push( [ coin, ...candidate ] );
				}
			}
		}
		candidates.push( ...newCandidates );
	} while ( candidates.length );

	// We would have already returned if we had found a solution, so return an empty array.
	return [];
}
