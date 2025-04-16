import { faker } from '@faker-js/faker'

import { DeviceItemType } from './type'

const generateDeviceItem = (): DeviceItemType => ({
   id: faker.string.uuid(),
   name: faker.commerce.productName(),
   description: faker.commerce.productDescription(),
   quantity: Math.floor(Math.random() * 10) + 1,
   status: faker.datatype.boolean(),
   note: faker.lorem.sentence(),
   fee: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
   selected: false,
})

export const generateDeviceItems = (limit: number = 1000): DeviceItemType[] => {
   return Array.from({ length: limit }, () => generateDeviceItem())
}
