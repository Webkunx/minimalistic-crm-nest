import { Repository, EntityRepository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { UpdateCustomerDto } from './dto/update-customer-dto';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const { firstname, lastname, address, age } = createCustomerDto;

    const customer = new Customer();

    customer.firstname = firstname;
    customer.lastname = lastname;
    customer.address = address;
    customer.age = age;
    await customer.save();
    return customer;
  }

  async updateCustomer(
    customer: Customer,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const { firstname, lastname, address, age } = updateCustomerDto;

    customer.firstname = firstname || customer.firstname;
    customer.lastname = lastname || customer.lastname;
    customer.address = address || customer.address;
    customer.age = age || customer.age;
    await customer.save();
    return customer;
  }
}
