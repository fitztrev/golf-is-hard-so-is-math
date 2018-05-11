new Vue({
    el: '#app',

    data() {
        return {
            holes: Array.from({ length: 18 }, () => null),

            holeWithFocus: 0,

            numberpad: [
                7, 8, 9,
                4, 5, 6,
                1, 2, 3,
            ],
        }
    },

    mounted() {
        this.registerKeyboardListener()
    },

    computed: {
        holesFront() {
            return this.holes.slice(0, 9)
        },

        holesBack() {
            return this.holes.slice(9)
        },

        scoreFront() {
            return this.holesFront.reduce((total, score) => total + score, 0)
        },

        scoreBack() {
            return this.holesBack.reduce((total, score) => total + score, 0)
        },

        scoreTotal() {
            return this.scoreFront + this.scoreBack
        },
    },

    methods: {
        clearScores() {
            this.holes = Array.from({ length: 18 }, () => null)

            this.holeWithFocus = 0
        },

        setHoleScore(score) {
            if (this.holeWithFocus > 17) return

            this.$set(this.holes, this.holeWithFocus, score)

            this.holeWithFocus++
        },

        registerKeyboardListener() {
            window.addEventListener('keypress', e => {
                let key = e.keyCode
                if (key >= 48 && key <= 57) {
                    this.setHoleScore(key - 48)
                }
            })
        },
    },
})
