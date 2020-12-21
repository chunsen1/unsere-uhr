class GestureBuffer {

    constructor() {
        this.values = []
    }

    push(value) {
        this.values.push(value)
    }

    checkGestures() {
        const threshold_low = 0.05
        const threshold_high = 0.15
        let wasHigh = false
        let wasLow = false
        let countToLow = 0
        let countToHigh = 0
        let startedAt = -1

        for (let i = 0; i < this.values.length; i += 1) {
            if (this.values[i] > threshold_high) {
                if (wasLow && !wasHigh) {
                    countToHigh += 1
                    wasLow = false
                }
    
                wasHigh = true
            } 
            
            if (this.values[i] < threshold_low) {
                if (!wasLow && wasHigh) {
                    countToLow += 1
                    wasHigh = false
                }
    
                wasLow = true
            }

            if (countToLow + countToHigh === 2 && startedAt < 0) {
                startedAt = i
            }
        }
    
        if (startedAt >= 0 && startedAt + 25 < this.values.length) {
            const result = {
                low: countToLow,
                high: countToHigh
            }
    
            startedAt = -1
            countToLow = 0
            countToHigh = 0
            wasHigh = false
            wasLow = false
            this.values = []

            return result
        }
    
        if (this.values.length > 1000) {
            startedAt = -1
            countToLow = 0
            countToHigh = 0
            wasHigh = false
            wasLow = false
            this.values = []
        }
    }

    getLenght() {
        return this.values.length
    }
}

module.exports = GestureBuffer
