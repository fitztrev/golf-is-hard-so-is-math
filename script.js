new Vue({
    el: '#app',

    data: {
        holes: {},

        holeWithFocus: 1,

        numberpad: [
            7, 8, 9,
            4, 5, 6,
            1, 2, 3,
        ],
    },

    mounted: function() {
        // setup 18 holes with null scores to start
        for (let i=1; i<=18; i++) {
            this.$set(this.holes, i, null)
        }

        // accept keyboard input from desktop users
        document.onkeypress = function (e) {
            let pressed = _.toNumber(e.key)
            pressed >= 0 && this.setHoleScore(pressed)
        }.bind(this)
    },

    computed: {
        holesFront: function() {
            return _.pickBy(this.holes, function(score, hole) {
                return hole <= 9
            })
        },

        holesBack: function() {
            return _.pickBy(this.holes, function(score, hole) {
                return hole >= 10
            })
        },

        scoreFront: function() {
            return _.sum(_.values(this.holesFront))
        },

        scoreBack: function() {
            return _.sum(_.values(this.holesBack))
        },

        scoreTotal: function() {
            return this.scoreFront + this.scoreBack
        },
    },

    methods: {
        setHoleScore: function(score) {
            if (this.holeWithFocus > 18) return

            this.holes[this.holeWithFocus++] = score
        },

        clearScores: function() {
            this.holes = _.mapValues(this.holes, function() {
                return null
            })

            this.holeWithFocus = 1
        },
    },
})
