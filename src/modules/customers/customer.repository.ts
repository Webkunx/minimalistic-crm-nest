import { Repository, EntityRepository } from "typeorm";
import { CustomerEntity } from "./customer.entity";
import { CreateCustomerDto } from "./dto/create-customer-dto";
import { UpdateCustomerDto } from "./dto/update-customer-dto";
import { Customer } from "./customer.interface";

@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity> {
  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const { firstname, lastname, address, age } = createCustomerDto;

    const customer = new CustomerEntity();

    customer.firstname = firstname;
    customer.lastname = lastname;
    customer.address = address;
    customer.age = age;
    await this.save(customer);

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
    await this.save(customer);
    return customer;
  }
}
