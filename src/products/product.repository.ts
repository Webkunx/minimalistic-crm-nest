import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, quantity, price } = createProductDto;
    const product = new Product();

    product.name = name;
    product.quantity = quantity;
    product.price = price;

    await product.save();
    return product;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { name, quantity, price } = updateProductDto;
    const product = await this.findOne({ where: { id } });
    if (!product)
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    product.name = name || product.name;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;

    await product.save();
    return product;
  }
}
