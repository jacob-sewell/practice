import { coinCombo } from '../src/index';

describe( 'Examples from problem description:', () => {
	it( 'returns [3,7,7] for [2,3,5,7] and 17', () => {
		expect( coinCombo( [ 2, 3, 5, 7 ], 17 ) ).toEqual( [ 3, 7, 7 ] );
	} );

	it( 'returns [3,3,5] for [2,3,5] and 11', () => {
		expect( coinCombo( [ 2, 3, 5 ], 11 ) ).toEqual( [ 3, 3, 5 ] );
	} );
} );

describe( 'Test cases that should not yield a result', () => {
	it( 'returns [] for [27] and 10', () => {
		expect( coinCombo( [ 27 ], 10 ) ).toEqual( [] );
	} );

	it( 'returns [] for [5,7] and 8', () => {
		expect( coinCombo( [ 5, 7 ], 8 ) ).toEqual( [] );
	} );
} );
