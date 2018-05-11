new Vue({
    el: '#app',

    //https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
    data() {
        return {
            holes: Array.from({length: 18}, null),
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
            return this.holes.slice(0, 8)
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
            this.holes = Array.from({length: 18}, null)
            this.holeWithFocus = 0
        },

        setHoleScore(score) {
            if (this.holeWithFocus > 17) return

            this.holes[this.holeWithFocus] = score
            this.holeWithFocus++
        },

        registerKeyboardListener() {
            // this seems a little wrong, we should probably scope this to this.$el.addEventListener
            // but given I don't know your template I can't assume that
            window.addEventListener("keypress", (e) => {
                if(e.keyCode >= 48 && e.keyCode <= 57) {
                    this.setHoleScore(pressed);
                }
            })
        }
    },
})
