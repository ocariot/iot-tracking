import { injectable } from 'inversify'
import { IEntityMapper } from '../../port/entity.mapper.interface'
import { Device } from '../../../application/domain/model/device'
import { DeviceEntity } from '../device.entity'

@injectable()
export class DeviceEntityMapper implements IEntityMapper<Device, DeviceEntity> {
    public transform(item: any): any {
        if (item instanceof Device) return this.modelToModelEntity(item)
        return this.jsonToModel(item)
    }

    public modelEntityToModel(item: DeviceEntity): Device {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: Device): DeviceEntity {
        const result: DeviceEntity = new DeviceEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.name !== undefined) result.name = item.name
        if (item.address !== undefined) result.address = item.address
        if (item.type !== undefined) result.type = item.type
        if (item.modelNumber !== undefined) result.model_number = item.modelNumber
        if (item.manufacturer !== undefined) result.manufacturer = item.manufacturer
        if (item.location !== undefined) result.location = item.location.toJSON()
        if (item.institutionId !== undefined) result.institution_id = item.institutionId
        return result
    }

    public jsonToModel(json: any): Device {
        const result: Device = new Device().fromJSON(json)
        if (!json) return result

        if (json.created_at !== undefined) result.createdAt = json.created_at
        return result
    }
}
