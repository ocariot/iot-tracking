import { PhysicalActivity } from '../../src/application/domain/model/physical.activity'
import { ActivityLevelType, PhysicalActivityLevel } from '../../src/application/domain/model/physical.activity.level'
import { PhysicalActivityHeartRate } from '../../src/application/domain/model/physical.activity.heart.rate'

export class PhysicalActivityMock extends PhysicalActivity {

    constructor(type?: ActivityTypeMock) {
        super()
        this.generatePhysicalActivity(type)
    }

    private generatePhysicalActivity(type?: ActivityTypeMock): void {
        if (!type) type = this.chooseType()

        super.id = this.generateObjectId()
        super.start_time = new Date(1560826800000 + Math.floor((Math.random() * 1000)))
        super.end_time = new Date(new Date(super.start_time)
            .setMilliseconds(Math.floor(Math.random() * 35 + 10) * 60000)) // 10-45min in milliseconds
        super.duration = super.end_time.getTime() - super.start_time.getTime()
        super.child_id = '5a62be07de34500146d9c544'
        super.name = type
        super.calories = Math.floor((Math.random() * 20000 + 500)) // 500-20100
        if (type === ActivityTypeMock.WALK || type === ActivityTypeMock.RUN) {
            super.steps = Math.floor((Math.random() * 20000 + 100)) // 100-20100
        }
        super.distance = Math.floor((Math.random() * 1000 + 100)) // 100-1100
        super.levels = this.generatePhysicalActivityLevels()
        super.heart_rate = this.generateHeartRate()
    }

    private generatePhysicalActivityLevels(): Array<PhysicalActivityLevel> {
        const levels: Array<PhysicalActivityLevel> = []
        levels.push(new PhysicalActivityLevel(ActivityLevelType.SEDENTARY, Math.floor((Math.random() * 10) * 60000)))
        levels.push(new PhysicalActivityLevel(ActivityLevelType.LIGHTLY, Math.floor((Math.random() * 10) * 60000)))
        levels.push(new PhysicalActivityLevel(ActivityLevelType.FAIRLY, Math.floor((Math.random() * 10) * 60000)))
        levels.push(new PhysicalActivityLevel(ActivityLevelType.VERY, Math.floor((Math.random() * 10) * 60000)))
        return levels
    }

    private generateHeartRate(): PhysicalActivityHeartRate {
        const activityHeartRateJSON: any = {
            average: Math.floor((Math.random() * 120 + 70)), // 70-189,
            out_of_range_zone: {
                min: 30,
                max: 91,
                duration: 0
            },
            fat_burn_zone: {
                min: 91,
                max: 127,
                duration: 10
            },
            cardio_zone: {
                min: 127,
                max: 154,
                duration: 0
            },
            peak_zone: {
                min: 154,
                max: 220,
                duration: 0
            },
        }
        return new PhysicalActivityHeartRate().fromJSON(activityHeartRateJSON)
    }

    private generateObjectId(): string {
        const chars = 'abcdef0123456789'
        let randS = ''
        for (let i = 0; i < 24; i++) {
            randS += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return randS
    }

    private chooseType(): ActivityTypeMock {
        switch (Math.floor((Math.random() * 4))) { // 0-3
            case 0:
                return ActivityTypeMock.WALK
            case 1:
                return ActivityTypeMock.RUN
            case 2:
                return ActivityTypeMock.BIKE
            default:
                return ActivityTypeMock.SWIM
        }
    }
}

export enum ActivityTypeMock {
    WALK = 'walk',
    RUN = 'run',
    BIKE = 'bike',
    SWIM = 'swim'
}
