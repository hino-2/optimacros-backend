import { ObjectId } from 'mongodb';
import { carsService } from '..';
import { ICarDocument } from '../../DB/Cars/interfaces';

const THE_CAR = {
  make: 'Toyota',
  model: 'Crown',
  year: 1985,
  price: 5555,
};

let createdCar: ICarDocument;

describe('Cars service', () => {
  beforeAll(async () => {
    await carsService.deleteAll();
  }, 60000);

  test('Create a new car', async () => {
    createdCar = await carsService.create(THE_CAR);

    expect(createdCar).toMatchObject({ ...THE_CAR, _id: expect.anything() });
  });

  test('Get by ID', async () => {
    const car = await carsService.getById(createdCar._id.toString());

    expect(car).toMatchObject({ ...THE_CAR, _id: expect.anything() });
  });

  test('Update a car', async () => {
    const updateCar = await carsService.update(createdCar._id.toString(), {
      year: 2015,
    });

    expect(updateCar).toMatchObject({ ...createdCar, year: 2015 });
  });
});
