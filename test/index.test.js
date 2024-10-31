import { assert } from 'chai';

import getRanking from '../utils/getRanking.js'

describe('Basic tests', function () {
    it('should be two teams in the 1st position', function () {
        const resultsInput = `Real Madrid 2, Barcelona 3
Atletico de Madrid 0, Barcelona 0
Real Madrid 1, Atletico de Madrid 2`;

        const resultsExpect = `1. Atletico de Madrid, 4 pts
1. Barcelona, 4 pts
3. Real Madrid, 0 pts`

        assert.strictEqual(getRanking(resultsInput), resultsExpect)
    });

    it('should have all the teams in the same position', function () {
        const resultsInput = `Milan 1, Inter de Milan 1
Napoli 2, Juventus 2
Milan 0, Napoli 0
Milan 3, Juventus 3
Inter de Milan 1, Napoli 1
Inter de Milan 0, Juventus 0`

        const resultsExpect = `1. Inter de Milan, 3 pts
1. Juventus, 3 pts
1. Milan, 3 pts
1. Napoli, 3 pts`

        assert.strictEqual(getRanking(resultsInput), resultsExpect)
    });

    it('should be positions 1st, 2nd and 3rd', function () {
        const resultsInput = `Bayern Munich 2, Borussia Dortmund 3
Bayern Munich 0, Bayer Leverkusen 1
Bayer Leverkusen 1, Borussia Dortmund 2`;

        const resultsExpect = `1. Borussia Dortmund, 6 pts
2. Bayer Leverkusen, 3 pts
3. Bayern Munich, 0 pts`

        assert.strictEqual(getRanking(resultsInput), resultsExpect)
    });

    it('should show 1 pt and not 1 pts', function () {
        const resultsInput = `Arsenal 3, Manchester City 1
Liverpool 2, Manchester United 1
Arsenal 1, Liverpool 0
Arsenal 3, Manchester United 0
Manchester City 1, Liverpool 2
Manchester City 0, Manchester United 0`;

        const resultsExpect = `1. Arsenal, 9 pts
2. Liverpool, 6 pts
3. Manchester City, 1 pt
3. Manchester United, 1 pt`

        assert.strictEqual(getRanking(resultsInput), resultsExpect)
    });

    it('should be more than two teams in the same position', function () {
        const resultsInput = `Chivas 3, America 1
Cruz Azul 2, Pumas 1
Chivas 1, Cruz Azul 2
Chivas 3, Pumas 0
America 3, Cruz Azul 2
America 2, Pumas 0
Tecos 2, Chivas 5
Tecos 0, America 1
Cruz Azul 5, Tecos 0
Pumas 3, Tecos 4`;

        const resultsExpect = `1. America, 9 pts
1. Chivas, 9 pts
1. Cruz Azul, 9 pts
4. Tecos, 3 pts
5. Pumas, 0 pts`

        assert.strictEqual(getRanking(resultsInput), resultsExpect)
    });
});
